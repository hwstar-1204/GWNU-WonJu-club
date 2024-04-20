from django.urls import path, include


urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('accounts/', include('allauth.urls')),  # 소셜 로그인 필요시

]
