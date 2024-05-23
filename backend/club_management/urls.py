from django.urls import path, re_path
from club_management.views import *
from rest_framework import permissions

urlpatterns = [

    path('clublist/', ClubManageListView.as_view(), name='club-list'),
    # 동아리 홈 정보 조회
    path('club/<str:club_name>/', ClubManagementHomeView.as_view(), name='club-home'),

    # 회원 승인 및 삭제
    path('club/<str:club_name>/member/<int:id>/', MemberApproveAPIView.as_view(), name='member-approve'),

    # 로고 수정 및 삭제
    path('club/<str:club_name>/image/', ImageCorrectionDelete.as_view(), name='logo-correction-delete'),

    # 동아리 소개 수정
    path('club/<str:club_name>/introducation/', IntroducationCorrection.as_view(), name='introduction-correction'),
]