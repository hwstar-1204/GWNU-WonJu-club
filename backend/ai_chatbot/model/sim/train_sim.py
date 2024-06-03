import pandas as pd
from tqdm import tqdm
tqdm.pandas()

import torch
from sentence_transformers import SentenceTransformer
from ai_chatbot.utils.Preprocess import Preprocess

# 데이터 읽어오기
train_file = "../../train_tools/qna/train_data_최종보완.xlsx"
data = pd.read_excel(train_file)
queries = data['질문(Query)'].tolist() 

p = Preprocess(word2index_dic='../../train_tools/dict/chatbot_dict.bin',
               userdic='../../utils/user_dic.tsv')

# 단어 시퀀스 생성
keywords_list = []
for sentence in queries:
  pos = p.pos(sentence)
  keywords = p.get_keywords(pos, without_tag=True)
  keyword_string = ' '.join(keywords)  
  keywords_list.append(keyword_string)

model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')

vectors = model.encode(keywords_list)
vector_df = pd.DataFrame(vectors)
vector_df.to_excel("./train_data_SBERT.xlsx", index=False)

embedding_data = torch.tensor(vectors.tolist())
torch.save(embedding_data, '../SBERT_embedding_Data_new.pt')