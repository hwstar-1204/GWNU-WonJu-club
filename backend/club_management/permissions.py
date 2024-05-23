from rest_framework import permissions
from rest_framework.authtoken.models import Token
from club_introduce.models import *
from club_account.models import *
class IsPresidentOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow presidents of clubs or staff users to access.
    """
    def is_club_president(self, user, club_name):
        # URL에서 가져온 동아리 이름과 사용자의 student_id를 사용하여 해당 클럽의 회장 여부 확인
        try:
            club_member = ClubMember.objects.get(club_name=club_name, student_id=user.student_id)
            return club_member.job == '회장'
        except ClubMember.DoesNotExist:
            return False
    def has_permission(self, request, view):
        # 동아리 이름을 URL에서 가져와서 권한 확인 함수에 전달
        club_name = view.kwargs.get('club_name')
        token_key = request.headers.get('Authorization')

        if not token_key:
            return False;
        try:
            token = token_key.split(' ')[1]
        except IndexError:
            return False

        try:
            # 토큰이 유효한지 확인하는 부분
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            return False

        user_id = token_obj.user.id
        user = CustomUser.objects.get(id=user_id)

        return user.is_staff == 1 and self.is_club_president(user, club_name)