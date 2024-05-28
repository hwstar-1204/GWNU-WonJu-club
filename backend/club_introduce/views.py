from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import *
from club_introduce.serializer import *
from club_introduce.models import *
from rest_framework import generics
from django.utils import timezone


# Create your views here.
class ClubListAPIView(APIView):
    permission_classes = [AllowAny]


    def get(self, request):
        clubs = Club.objects.all()
        clubs_data = ClubSerializer(clubs, many=True).data
        return Response(clubs_data)

    def post(self, request):
        serializer = ClubSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryClubAPIView(APIView):
    permission_classes = [AllowAny]

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
    permission_classes = [IsAuthenticated]

    def post(self, request):
        club_name = request.data.get('club_name')

        user = request.user
        student_id = user.student_id

        # Club 인스턴스를 가져옵니다. 이를 위해 club_name이 실제로 Club 모델의 이름이나 ID 등을 기반으로 해야 합니다.
        try:
            club = Club.objects.get(name=club_name)  # 예를 들어 Club 모델에 'name' 필드가 있다고 가정
        except Club.DoesNotExist:
            return Response({'error': 'Club not found.'}, status=status.HTTP_404_NOT_FOUND)

        # 동아리 가입 신청이 이미 되어 있는지 확인
        if ClubMember.objects.filter(club_name=club, student_id=user, joined_date__isnull=True).exists():
            return Response({'message': '가입신청이 되어 있습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 이미 동아리 회원인지 확인
        elif ClubMember.objects.filter(club_name=club, student_id=user, joined_date__isnull=False).exists():
            return Response({'message': '동아리 회원입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 새로운 동아리 가입신청
        apply_user = ClubMember()
        apply_user.club_name = club
        apply_user.student_id = user
        apply_user.joined_date = None  # 처음 가입 신청시 joined_date는 None
        apply_user.save()

        return Response({'message': '가입신청이 완료되었습니다.'}, status=status.HTTP_200_OK)


class CreateClub(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Club.objects.all()
    serializer_class = ClubCreateSerializer

    def create(self, request, *args, **kwargs):
        print("확인: ", request.data)
        user = self.request.user

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # 동아리 만든사람을 동아리 회장으로 만듬
        club_name = Club.objects.get(club_name=serializer.data['club_name'])
        club_member = ClubMember(club_name=club_name, student_id=user, joined_date=timezone.now(), job='회장')
        print('회장: ', club_member)
        club_member.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class MyClubListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MyClubListSerializer
    queryset = Club.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Club.objects.filter(clubmember__student_id=user)

class DropClubView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = ClubMember.objects.all()

    def destroy(self, request, *args, **kwargs):
        job = request.data.get('job')
        member_id = kwargs.get('member_id')

        try:
            instance = ClubMember.objects.get(pk=member_id)
        except ClubMember.DoesNotExist:
            return Response({"error": "Club member not found"}, status=status.HTTP_404_NOT_FOUND)

        # 동아리 회장이 아닌경우와 동아리 회장인데 동아리 회원 수가 1명인 경우 삭제
        if job != '회장' or (job == '회장' and ClubMember.objects.filter(club_name=instance.club_name).count() == 1):
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "동아리 회장은 탈퇴못함"}, status=status.HTTP_400_BAD_REQUEST)

