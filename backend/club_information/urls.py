from django.urls import path
from club_information import views


urlpatterns = [
    path('club/<str:club_name>/home/', views.ClubHomeView.as_view(), name='club-home'),
    path('club/<str:club_name>/members/', views.MembersView.as_view(), name='club-members'),
    path('club/<str:club_name>/albums/', views.AlbumView.as_view(), name='club-album'),
    path('club/<str:club_name>/events/', views.EventView.as_view(), name='club-event'),
    path('club/<str:club_name>/albums/create/', views.CreateAlbumView.as_view(), name='create-album'),
    path('club/<str:club_name>/events/create/', views.CreateEventView.as_view(), name='create-event')
]