from django.urls import path
from club_introduce import views


urlpatterns = [
    # 실제 API 엔드포인트
    path('club_list/', views.ClubListAPIView.as_view(), name='club-list'),
    path('club_list/category_club/<str:category_id>', views.CategoryClubAPIView.as_view(), name='category-club'),
    path('apply_club/', views.ApplyClubAPIView.as_view(), name='joined-club')
]