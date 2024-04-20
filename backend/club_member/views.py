from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from club_introduce.serializer import *
from club_introduce.models import *
from django.db.models import Max

# Create your views here.
class ClubJoinAPIView(APIView):
    # 인증된 사용자만 접근 가능하도록 설정
    permission_classes = [IsAuthenticated]

    def post(self, request, club_name, student_num):
        user = request.session.get('student_num')

        try:
            applicant = User.objects.get(pk=user)
        except User.DoesNotExist:
            return Response('사용자를 찾을 수 없습니다.', status=status.HTTP_404_NOT_FOUND)

        # 동아리원인지 확인
        if ClubMember.objects.filter(student_num=applicant, club_name=club_name):
            return Response('동아리에 가입되어 있습니다.', status=status.HTTP_403_FORBIDDEN)

        # 필수정보가 없을 때
        if not club_name or not student_num:
            return Response({'error': '필수 정보가 누락되었습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 동아리 멤버번호 중 가장 높은 번호를 가져와 가입신청 시 부여되는 멤버번호를 구한다.
        max_member_id = ClubMember.objects.filter(club_name=club_name).aggregate(Max('member_id'))['member_id__max']
        new_member_id = (max_member_id or 0) + 1

        default_job = ''  # 직무

        # Club_Member 테이블에 추가될 데이터
        new_member = ClubMember(
            member_id=new_member_id,
            club_name=club_name,
            student_num=student_num,
            job=default_job
        )
        new_member.save()
        return Response({'message': '가입 신청이 완료되었습니다.', 'member_id': new_member.member_id}, status=status.HTTP_201_CREATED)

class ClubMemberAPIView(APIView):
    def get(self, request, club_name):
        # 동아리 이름이 제공되지 않을 때
        if not club_name:
            return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # student_num을 통해 Club_Member 테이블과 User 테이블 JOIN
        club_members = ClubMember.objects.filter(club_name=club_name).select_related('student_num')  # 동아리 회원 정보
        members_data = ClubMemberSerializer(club_members, many=True).data

        return Response(members_data)