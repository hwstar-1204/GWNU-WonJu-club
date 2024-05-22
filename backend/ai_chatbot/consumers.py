import json
from channels.generic.websocket import AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer
# from ai_chatbot.config import DatabaseConfig, GlobalParams
# from ai_chatbot.utils.Database import Database
# from utils.BotServer import BotServer
from .utils.Preprocess import Preprocess
from .model.intent.IntentModel import IntentModel
from .model.sim.SimModel import SimModel
from .utils.FindAnswer import FindAnswer
# from ai_chatbot.utils.save_conversation import save_conversation


class YourConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))

class ChatConsumer(AsyncJsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 전처리 객체 생성
        self.p = Preprocess(word2index_dic='ai_chatbot/train_tools/dict/chatbot_dict.bin',
               userdic='ai_chatbot/utils/user_dic.tsv')
        # 의도 파악 모델
        self.intent = IntentModel(model_name='ai_chatbot/model/intent/intent_model.h5', preprocess=self.p)
        # 유사도 분석 모델
        self.sim = SimModel(preprocess=self.p)

    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive_json(self, content, **kwargs):
        try:
            query = content['Query']  # json 파싱

            intent_perdict = self.intent.predict_class(query)
            intent_name = self.intent.labels[intent_perdict]
            print(intent_name)

            # 질문 임베딩
            embedding_data = self.sim.create_pt(query)

            # 답변 검색
            f = FindAnswer()
            if f is not None:
                if intent_name == '인사' or intent_name == '욕설' or intent_name == '기타':
                    answer_text, answer_image, sim_result = await f.search_1(intent_name)

                elif intent_name == '생성':
                    answer_text, answer_image, sim_result = await f.search_2(intent_name, embedding_data)

                # else:
                #     answer_text, answer_image, sim_result = f.search_3(intent_name)

            print("Query:: ", query)
            print("answer_text:", answer_text)
            print("Intent:", intent_name)

            # await self.send_json({
            #         "Query": query,
            #         "Answer": answer_text,
            #         "AnswerImageUrl": answer_image,
            #         "Intent": intent_name
            # })
            await self.send_json({
                    "Answer": answer_text,
            })


        except Exception as e:
            await self.send_json({'error': str(e)})


    # async def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json['message'].strip()
    #
    #     print(message)
