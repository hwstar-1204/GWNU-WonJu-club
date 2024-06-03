from models.ner.NerModel import NerModel
from utils_list.Preprocess import Preprocess

def tag_to_word(ner_predicts):
  for word, tag in ner_predicts:
    # 변환해야하는 태그가 있는 경우 추가
    print(word, tag)
    if tag == 'B_OG':
      tagged_text = word
      break

    else :
      tagged_text = "NONE"
  return tagged_text

query = "CCC에 대해 소개해줘"

# 전처리 객체 생성
p = Preprocess(word2index_dic='./train_tools/dict/chatbot_dict.bin', userdic='./utils_list/user_dic.tsv')

# 개체명 인식 모델
ner = NerModel(model_name='./models/ner/ner_model_testNER3.h5', proprocess=p)

# 개체명 파악
ner_predicts = ner.predict(query)
print(ner_predicts)
ner_tags = ner.predict_tags(query)

tagged_text = tag_to_word(ner_predicts)

print(tagged_text)