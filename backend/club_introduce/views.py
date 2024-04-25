from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response
from club_introduce.serializer import *
from club_introduce.models import *
from django.views.generic import *


# Create your views here.
class ClubListAPIView(APIView):
    def get(self, request):
        clubs = Club.objects.all()
        clubs_data = ClubSerializer(clubs, many=True).data
        return Response(clubs_data)


class CategoryClubAPIView(APIView):
    def get(self, request, category_id):
        # 분류할 카테고리 데이터가 없으면 오류
        if not category_id:
            return Response({'error': '카테고리가 제공되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        category_clubs = Club.objects.filter(category=category_id)

        # 카테고리에 해당하는 동아리가 없을 때
        if not category_clubs.exists():
            return Response({'error': '카테고리에 해당하는 동아리가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

        clubs_data = ClubSerializer(category_clubs, many=True).data
        return Response(clubs_data)

class ApplyClubAPIView(APIView):
    def post(self, request):
        club_name = request.data.get('club_name')
        student_id = request.data.get('student_id')


        # club = Club.objects.get(club_name=club_name)
        # student = CustomUser.objects.get(student_id=student_id)
        print(club_name)
        print(student_id)
            # apply_user = ClubMember()
            # apply_user.club_name = club
            # apply_user.student_id = student
            # apply_user.save()
        if club_name and student_id:
            return Response({'message': '가입신청이 완료되었습니다.'}, status=status.HTTP_201_CREATED)
        # except Club.DoesNotExist:
        #     return Response({'error': '해당 동아리가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)
        # except CustomUser.DoesNotExist:
        #     return Response({'error': '해당 학생이 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)
        # except Exception as e:
        #     return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
