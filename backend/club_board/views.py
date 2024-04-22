from rest_framework import viewsets
from django.db.models import Count
from rest_framework import permissions, status
from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.response import Response

from .serializers import *
from .permissions import IsOwnerOrReadOnly

# viewsets : provides default create(), retireve(), update(), destroy(), list(), partial_update()
# Create your views here.

permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]


def order_list(queryset, order):
    if order == 'most_viewed':  # 조회순
        queryset = queryset.order_by('-view_cnt')
    elif order == 'most_commented':  # 댓글순
        queryset = queryset.annotate(num_comments=Count('comments')).order_by('-num_comments')
    else:  # 기본값 최신순
        queryset = queryset.order_by('-created_date')

    return queryset

class ClubBoardPostViewSet(viewsets.ModelViewSet):
    """ 특정 동아리 게시판 카테고리에 해당하는 글 불러오기 """
    serializer_class = PostListSerializer

    def get_queryset(self):
        club_name = self.request.query_params.get('club_name')
        category = self.request.query_params.get('category')
        order = self.request.query_params.get('order')

        queryset = Post.objects.filter(board__club_name=club_name, board__category=category)
        queryset = order_list(queryset, order)
        return queryset

class FreeBoardPostViewSet(viewsets.ModelViewSet):
    """ 자유 게시판 카테고리에 해당하는 글 불러오기 """
    serializer_class = PostListSerializer

    def get_queryset(self):
        # club_name = self.request.query_params.get('club_name')
        category = self.request.query_params.get('category')
        order = self.request.query_params.get('order')

        queryset = Post.objects.filter(board__club_name__isnull=True, board__category=category)
        queryset = order_list(queryset, order)
        return queryset


class PostCreateView(CreateAPIView):
    """
    게시물 생성
    """
    serializer_class = PostDetailSerializer

    def get_queryset(self):
        board_id = self.request.query_params.get('board_id')
        return Post.objects.filter(board=board_id)

    # def post(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class PostDetailView(RetrieveUpdateDestroyAPIView):
    """
    특정 게시글 읽기, 수정, 삭제
    """
    serializer_class = PostDetailSerializer
    # permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self):
        post_id = self.kwargs.get('post_id')
        return Post.objects.get(id=post_id)



    # def delete(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     # self.check_object_permissions(request, instance)
    #     instance.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     # self.check_object_permissions(request, instance)
    #     serializer = self.get_serializer(instance, data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_200_OK)
    #






class CommentCreateView(CreateAPIView):
    """
    특정 게시글에 대한 댓글 생성
    """
    serializer_class = PostCommentSerializer

    def get_queryset(self):  # 게시글 댓글들
        post_id = self.request.query_params.get('post_id')
        return Comment.objects.filter(post=post_id)  # 특정 게시물에 대한 댓글 목록


class CommentDetailView(RetrieveUpdateDestroyAPIView):
    """
    특정 댓글에 대한 읽기, 수정, 삭제
    """
    serializer_class = PostCommentSerializer

    def get_object(self):  # 특정 댓글 단일 객체
        comment_id = self.kwargs.get('comment_id')
        return Comment.objects.get(id=comment_id)

