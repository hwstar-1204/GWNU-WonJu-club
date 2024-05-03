from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter


# router = DefaultRouter()
# router.register(r'boards', BoardViewSet, basename='board')
# router.register(r'posts', PostViewSet, basename='post')
# router.register(r'comments', CommentViewSet, basename='comment')

# urlpatterns = router.urls
urlpatterns = [
    path('club_posts/', ClubBoardPostViewSet.as_view({'get': 'list'}), name='club_posts'),  # 동아리 게시판 글
    path('free_posts/', FreeBoardPostViewSet.as_view({'get': 'list'}), name='free_posts'),  # 자유 게시판 글

    path('post/', PostCreateView.as_view(), name='post'),  # 특정 게시글 불러오기, 생성
    path('post_detail/<int:post_id>/', PostDetailView.as_view(), name='post_detail'),  # 특정 게시글 수정, 삭제

    path('post_comments/', CommentCreateView.as_view(), name='post_comments'),  # 특정 게시글에 대한 댓글 생성
    path('comment_detail/<int:comment_id>/', CommentDetailView.as_view(), name='comment_detail'),  # 특정 댓글 수정 삭제

    path('post/<int:post_id>', PostCommentDetail.as_view(), name='post_id')  # 특정 게시글에 해당하는 해당 댓글들

]

