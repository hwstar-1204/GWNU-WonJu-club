import threading
import json

from config.DatabaseConfig import *
from utils_list.Database import Database
from utils_list.BotServer import BotServer
from utils_list.Preprocess import Preprocess
from models.intent.IntentModel import IntentModel
from models.sim.SimModel import SimModel
from utils_list.FindAnswer import FindAnswer
from models.ner.NerModel import NerModel

# 전처리 객체 생성
p = Preprocess(word2index_dic='./train_tools/dict/chatbot_dict.bin',
               userdic='./utils_list/user_dic.tsv')

# 의도 파악 모델
intent = IntentModel(model_name='./models/intent/intent_model.h5', preprocess=p)

# 유사도 분석 모델
sim = SimModel(preprocess=p)

# 개체명 인식 모델
ner = NerModel(model_name='./models/ner/ner_model_testNER3.h5', proprocess=p)

def to_client(conn, addr, params):
  db = params['db']

  try:
      db.connect()  # 디비 연결

      # 데이터 수신
      read = conn.recv(2048)  # 수신 데이터가 있을 때 까지 블로킹
      print('===========================')
      print('Connection from: %s' % str(addr))

      if read is None or not read:
          # 클라이언트 연결이 끊어지거나, 오류가 있는 경우
          print('클라이언트 연결 끊어짐')
          exit(0)


      # json 데이터로 변환
      recv_json_data = json.loads(read.decode())
      print("데이터 수신 : ", recv_json_data)
      query = recv_json_data['Query']

      # 의도 파악
      intent_predict = intent.predict_class(query)
      intent_name = intent.labels[intent_predict]
      print(intent_name)

      # 질문 임베딩
      embedding_data = sim.create_pt(query)

      # 개체명 파악
      ner_predicts = ner.predict(query)
      #print(ner_predicts)
      #ner_tags = ner.predict_tags(query)
      #print(ner_tags)
      # 답변 검색
      f = FindAnswer(db)
      if f != None :
          if intent_name == '인사' or intent_name == '욕설' or intent_name == '기타' :
              answer_text, answer_image = f.search_1(intent_name)

          elif intent_name == '생성': 
              answer_text, answer_image = f.search_2(intent_name, embedding_data)

          else :
              tagged_text = f.tag_to_word(ner_predicts)
              print(tagged_text, type(tagged_text))
              answer_text, answer_image = f.search_3(intent_name, tagged_text)

      #log = f"{query},{intent_name},{answer_text},{sim_result}"

      #with open('./log.txt', 'a',encoding='utf-8') as log_file:
      #    log_file.write(log + '\n')

      send_json_data_str = {
          "Query" : query,
          "Answer": answer_text,
          "AnswerImageUrl" : answer_image,
          "Intent": intent_name,
          "NER": str(ner_predicts)
        }
      message = json.dumps(send_json_data_str)
      conn.send(message.encode())

  except Exception as ex:
      print(ex)

  finally:
      if db is not None: # db 연결 끊기
          db.close()
      conn.close()


if __name__ == '__main__':

    # 질문/답변 학습 디비 연결 객체 생성
    db = Database(
        host=DB_HOST, user=DB_USER, db_name=DB_NAME
    )
    print("DB 접속")
    print()

    port = 5050
    listen = 100

    # 봇 서버 동작
    bot = BotServer(port, listen)
    bot.create_sock()
    print("bot start")

    while True:
        conn, addr = bot.ready_for_client()
        params = {
            "db": db
        }

        client = threading.Thread(target=to_client, args=(
            conn,
            addr,
            params
        ))
        client.start()