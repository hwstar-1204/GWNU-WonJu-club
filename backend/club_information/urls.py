from django.urls import path
from club_information import views


urlpatterns = [
    path('club/<str:pk>/home/', views.ClubHomeView.as_view(), name='club-home'),
    path('club/<str:club_name>/albums/', views.AlbumView.as_view(), name='club-album'),
    path('club/<str:club_name>/events/', views.EventView.as_view(), name='club-event')
]