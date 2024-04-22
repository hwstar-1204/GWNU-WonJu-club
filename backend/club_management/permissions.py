from rest_framework.permissions import BasePermission
from club_management.models import *

class IsClubPresident(BasePermission):
    def has_permission(self, request, view):
        # 여기서 request.user는 인증된 사용자의 인스턴스입니다.
        # 해당 필드가 없다면, 사용자가 속한 동아리의 회장 정보를 확인하는 로직으로 대체해야 합니다.

        club_name = getattr(view, 'club_name', None)
        student_num = getattr(view, 'student_num', None)

        # 동아리 회원 정보 검색
        try:
            club_member = ClubMemberManagement.objects.get(club_name=club_name, student_num=student_num)
            return club_member.job == '0'  # '0'이 회장을 의미한다고 가정
        except ClubMemberManagement.DoesNotExist:
            return False  # 멤버가 없거나 다른 문제가 있으면 접근 거부