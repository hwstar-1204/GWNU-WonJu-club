from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response
from club_introduce.serializer import *
from club_introduce.models import *


# Create your views here.
class ClubListAPIView(APIView):
    def get(self, request):
        clubs = ClubList.objects.all()
        clubs_data = ClubSerializer(clubs, many=True).data
        return Response(clubs_data)


class CategoryClubAPIView(APIView):
    def get(self, request, category_id):
        # 분류할 카테고리 데이터가 없으면 오류
        if not category_id:
            return Response({'error': '카테고리가 제공되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        category_clubs = ClubList.objects.filter(category=category_id)

        # 카테고리에 해당하는 동아리가 없을 때
        if not category_clubs.exists():
            return Response({'error': '카테고리에 해당하는 동아리가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

        clubs_data = ClubSerializer(category_clubs, many=True).data
        return Response(clubs_data)