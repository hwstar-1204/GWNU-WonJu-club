from django.urls import path
from .views import BoardViewSet, PostViewSet, CommentViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'boards', BoardViewSet, basename='board')
router.register(r'posts', PostViewSet, basename='post')
router.register(r'comments', CommentViewSet, basename='comment')

urlpatterns = router.urls
