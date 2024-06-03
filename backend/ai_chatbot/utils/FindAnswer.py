import torch
from sentence_transformers import util
import numpy as np

from ..models import ChatbotTrainData
from club_introduce.models import Club, ClubDetail
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

    @database_sync_to_async
    def make_query_3(self, intent_name, tagged_text):
        try:
            if intent_name in ['종류', '소개']:
                print("종류거나 소개", tagged_text)
                return Club.objects.get(club_name=tagged_text)
            else:
                return ClubDetail.objects.get(club__club_name=tagged_text)
        except ObjectDoesNotExist:
            print("make_query_3 club 찾을 수 없음")
            return None

        # if intent_name == '종류' or intent_name == '소개':
        #     sql = " SELECT * FROM club_introduce_club WHERE club_name = '{}'".format(tagged_text)
        #
        # else:
        #     sql = " SELECT * FROM club_introduce_clubdetail WHERE club_id = '{}'".format(tagged_text)

        # return sql

    def tag_to_word(self, ner_predicts):
        for word, tag in ner_predicts:
            # 변환해야하는 태그가 있는 경우 추가
            if tag == 'B_OG':
                tagged_text = word
                break
            else:
                tagged_text = "NONE"
        return tagged_text  # 동아리 명


    async def search_1(self, intent_name):
        # 의도명으로 답변 검색
        answer = await self.make_query_1(intent_name)
        if not answer:
            return "답변을 찾을 수 없습니다.", None
        return answer.answer, answer.answer_image

    async def search_2(self, intent_name, embedding_data):
        cos_sim = util.cos_sim(embedding_data, self.sim_data)
        best_sim_idx = int(np.argmax(cos_sim))  # cos_sim의 최대값의 인덱스 반환
        best_sim = cos_sim[0, best_sim_idx].item()  # item()을 사용하여 Python float으로 변환

        print("best_sim_idx: ",best_sim_idx)
        answer = await self.make_query_2(best_sim_idx + 1)

        print(best_sim, "   " ,answer)
        # print("serch_2: ", answer['answer'], answer['answer_image'])

        if not answer:
            return "답변을 찾을 수 없습니다.", None

        if answer.intent == intent_name:
            print('True')
            return answer.answer, answer.answer_image
        else:
            print("False")
            return "죄송해요 무슨 말인지 모르겠어요. 조금 더 공부할게요.", None

    async def search_3(self, intent_name, tagged_text):
        # 개체명으로 백엔드 DB 검색
        club_info = await self.make_query_3(intent_name, tagged_text)

        if club_info is None:  # 질문에 해당 동아리가 없는 경우 chatbot train data에서 찾아야함  
            pass

        print("club_info: ", club_info.club_name)

        if intent_name == "소개":  # Club
            # answer_text = "동아리 {}에 대한 소개입니다: {}".format(club_info['club_name'], club_info['introducation'])
            answer_text = "동아리 {}에 대한 소개입니다: {}".format(club_info.club_name, club_info.introducation)
            print("findanswer intent_name 소개", answer_text)
            answer_image = None
            return answer_text, answer_image

        elif intent_name == "종류":  # Club
            # answer_text = "{} 동아리는 다음과 같습니다.: {}".format(club_info['type'], club_info['club_name'])
            answer_text = "{} 동아리는 다음과 같습니다.: {}".format(club_info.type, club_info.club_name)
            answer_image = None
            return answer_text, answer_image

        elif intent_name == "가입방법":  # Club_detail
            # answer_text = "동아리 {}의 가입 방법은: {}".format(club_info['club_id'], club_info['join'])
            answer_text = "동아리 {}의 가입 방법은: {}".format(club_info.club.club_name, club_info.join)
            answer_image = None
            return answer_text, answer_image

        elif intent_name == "위치":  # Club_detail
            # answer_text = "동아리 {}의 위치는: {}".format(club_info['club_id'], club_info['location'])
            answer_text = "동아리 {}의 위치는: {}".format(club_info.club.club_name, club_info.location)
            answer_image = None
            return answer_text, answer_image

        elif intent_name == "활동":  # Club_detail
            # answer_text = "동아리 {}의 주요 활동은: {}".format(club_info['club_id'], club_info['activity'])
            answer_text = "동아리 {}의 주요 활동은: {}".format(club_info.club.club_name, club_info.activity)
            answer_image = None
            return answer_text, answer_image

        elif intent_name == "회비":  # Club_detail
            # answer_text = "동아리 {}의 회비는: {}".format(club_info['club_id'], club_info['fee'])
            print("동아리 이름과 요금 : ", club_info.club.club_name, club_info.fee)
            answer_text = "동아리 {}의 회비는: {}".format(club_info.club.club_name, club_info.fee)
            answer_image = None
            return answer_text, answer_image

        else:
            answer_text = "무슨 말인지 모르겠어요."
            return answer_text, None
