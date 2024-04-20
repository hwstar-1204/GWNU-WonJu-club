from django.urls import path, re_path
from club_introduce import views
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

    # 실제 API 엔드포인트
    path('club_list/', views.ClubListAPIView.as_view(), name='club-list'),
    path('club_list/category_club/<int:category_id>', views.CategoryClubAPIView.as_view(), name='category-club'),
]