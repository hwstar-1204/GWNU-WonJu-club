from ai_chatbot.utils.Preprocess import Preprocess
from ai_chatbot.model.ner.NerModel import NerModel


p = Preprocess(word2index_dic='/Users/hwstar/Documents/GitHub/GWNU-WonJu-club/backend/ai_chatbot/train_tools/dict/chatbot_dict.bin',
               userdic='/Users/hwstar/Documents/GitHub/GWNU-WonJu-club/backend/ai_chatbot/utils/user_dic.tsv')


ner = NerModel(model_name='/Users/hwstar/Documents/GitHub/GWNU-WonJu-club/backend/ai_chatbot/model/ner_model_new.h5', proprocess=p)
query = ['학습동아리에 대해 알려줘']

for i in query :
  predicts = ner.predict(i)
  tags = ner.predict_tags(i)

  tagged_text = [word for word, tag in predicts if tag in tags]

  print(f'Query: {query}')
  print('Predicts:', predicts)
  print('Tags:', tags)
  print('Tagged Text:', tagged_text)
  print()