from django.urls import path
from .views import *


urlpatterns = [
    # path('club_posts/', ClubBoardPostViewSet.as_view({'get': 'list'}), name='club_posts'),  # 동아리 게시판 글
    # path('free_posts/', FreeBoardPostViewSet.as_view({'get': 'list'}), name='free_posts'),  # 자유 게시판 글
    path('board_posts/<str:club_name>/<str:category>/<str:order>/', BoardPostListView.as_view(), name='board_posts'),  # 모든 게시글 불러오기 (페이지네이션 적용)

    path('post/', PostCreateView.as_view(), name='post'),  # 특정 게시글 불러오기, 생성
    path('post_detail/<int:post_id>/', PostDetailView.as_view(), name='post_detail'),  # 특정 게시글 수정, 삭제

    path('comment_create/', CommentCreateView.as_view(), name='comment_create'),  # 특정 게시글에 대한 댓글 생성
    path('comment_detail/<int:comment_id>/', CommentDetailView.as_view(), name='comment_detail'),  # 특정 댓글 수정 삭제
    path('comment_list/<int:post_id>', PostCommentDetail.as_view(), name='post_id'),  # 특정 게시글에 해당하는 해당 댓글들

    path('event/', EventListCreateView.as_view(), name='event_create'),  # 동아리 이벤트 리스트, 생성
    path('notice/', NoticeListView.as_view(), name='notice_list'),  # 메인 페이지 동아리 공지사항 리스트

]

