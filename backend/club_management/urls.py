from django.urls import path, re_path
from club_management import views
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
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('<str:club_name>/', views.ClubManagementHomeAPIView.as_view(), name='club-management'),
    path('<str:club_name>/approve/', views.ApproveMemberAPIView.as_view(), name='approve-club'),
    path('<str:club_name>/logo/', views.LogoAPIView.as_view(), name='club-logo'),
    path('<str:club_name>/photo/', views.PhotoAPIView.as_view(), name='club-photo'),
    path('<str:club_name>/content/', views.IntroduceContentAPIView.as_view(), name='club-content')
]