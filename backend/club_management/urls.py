from django.urls import path, re_path
from club_management.views import *
from rest_framework import permissions

urlpatterns = [
    # 동아리 홈 정보 조회
    path('club/<str:club_name>/', ClubManagementHomeView.as_view(), name='club-home'),

    # 회원 승인 및 삭제
    path('club/<str:club_name>/member/<int:id>/', MemberApproveAPIView.as_view(), name='member-approve'),

    # 로고 수정 및 삭제
    path('club/<str:club_name>/logo/', LogoCorrectionDelete.as_view(), name='logo-correction-delete'),

    # 로고 업로드
    path('club/<str:club_name>/logo/upload/', LogoUpload.as_view(), name='logo-upload'),

    # 사진 수정 및 삭제
    path('club/<str:club_name>/photo/', PhotoCorrectionDelete.as_view(), name='photo-correction-delete'),

    # 사진 업로드
    path('club/<str:club_name>/photo/upload/', PhotoUpload.as_view(), name='photo-upload'),

    # 동아리 소개 수정
    path('club/<str:club_name>/introducation/', IntroducationCorrection.as_view(), name='introduction-correction'),
]