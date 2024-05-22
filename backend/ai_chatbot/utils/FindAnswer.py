import torch
from sentence_transformers import util
import numpy as np

from ..models import ChatbotTrainData
from django.core.exceptions import ObjectDoesNotExist
from channels.db import database_sync_to_async
import random


class FindAnswer:

    def __init__(self):
        self.sim_data = torch.load('ai_chatbot/model/sim/SBERT_embedding_Data.pt')

    @database_sync_to_async
    def make_query_1(self, intent_name):
        query = ChatbotTrainData.objects.all()
        if intent_name:
            query = query.filter(intent=intent_name)

        # 동일한 답변이 2개 이상인 경우, 랜덤으로 선택
        query = list(query)
        return random.choice(query) if query else None

    @database_sync_to_async
    def make_query_2(self, query_id):
        try:
            return ChatbotTrainData.objects.get(id=query_id)
        except ObjectDoesNotExist:
            return None

    async def search_1(self, intent_name):
        # 의도명으로 답변 검색
        answer = await self.make_query_1(intent_name)
        if not answer:
            return "답변을 찾을 수 없습니다.", None, 'NO'
        return answer.answer, answer.answer_image, 'NO'



    async def search_2(self, intent_name, embedding_data):
        cos_sim = util.cos_sim(embedding_data, self.sim_data)
        best_sim_idx = int(np.argmax(cos_sim))  # cos_sim의 최대값의 인덱스 반환
        best_sim = cos_sim[0, best_sim_idx].item()  # item()을 사용하여 Python float으로 변환

        answer = await self.make_query_2(best_sim_idx + 1)
        print(best_sim)
        print(answer['answer'], answer['answer_image'])

        if not answer:
            return "답변을 찾을 수 없습니다.", None, "False"

        if answer.intent == intent_name:
            print('True')
            return answer.answer, answer.answer_image, 'True'
        else:
            print("False")
            return "죄송해요 무슨 말인지 모르겠어요. 조금 더 공부할게요.", None, 'False'



     # 답변 검색
        # def search_2(self, intent_name, embedding_data):
        #     # 유사도 분석 데이터
        #     sim_data = torch.load('ai_chatbot/model/sim/SBERT_embedding_Data.pt')
        #
        #     cos_sim = util.cos_sim(embedding_data, sim_data)
        #     best_sim_idx = int(np.argmax(cos_sim)) # cos_sim의 최대값의 인덱스 반환
        #     best_sim = cos_sim[0, best_sim_idx].item()  # item()을 사용하여 Python float으로 변환
        #     sql = self.make_query_2(best_sim_idx+1)
        #     answer = self.db.select_one(sql)
        #     #print(answer, type(answer))
        #     print(best_sim)
        #     print(answer['answer'], answer['answer_image'])
        #
        #     if answer['intent'] == intent_name :
        #         #answer = df['답변(Answer)'][best_sim_idx]
        #         #imageUrl = df['답변 이미지'][best_sim_idx]
        #         print("True")
        #         return (answer['answer'], answer['answer_image'], 'True')
        #         #return (answer, imageUrl)
        #     else:
        #         print("False")
        #         answer_text = "죄송해요 무슨 말인지 모르겠어요. 조금 더 공부 할게요."
        #         answer_image = None
        #
        #         return (answer_text, answer_image, 'False')
