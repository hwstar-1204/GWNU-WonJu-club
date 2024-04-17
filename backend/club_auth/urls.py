from django.urls import path, include, re_path
from django.views.generic import RedirectView, TemplateView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny

schema_view = get_schema_view(
    openapi.Info(
        title='API Docs',
        default_version='v1'
    ),
    permission_classes=[AllowAny],
)

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),

    # path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='api_docs'),

]
