from django.urls import path, re_path
from club_information import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Club API",
        default_version='v1',
        description="API documentation for all club related operations",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # API 문서화 엔드포인트
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('club_home/<str:club_name>/', views.ClubHomeAPIView.as_view(), name='club-home'),
    path('club_home/<str:club_name>/photos', views.ClubPhotoAPIView.as_view(), name='club-photo'),
    path('club_home/<str:club_name>/events', views.ClubEventAPIView.as_view(), name='club-event'),
]