from rest_framework import viewsets
from django.db.models import Count
from rest_framework import permissions, status
from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from club_account.models import CustomUser
from club_introduce.models import ClubMember
from .serializers import *
from .permissions import IsAuthorOrReadOnly
from rest_framework.exceptions import PermissionDenied


# viewsets : provides default create(), retireve(), update(), destroy(), list(), partial_update()
# Create your views here.




def order_list(queryset, order):
    if order == 'most_viewed':  # 조회순
        queryset = queryset.order_by('-view_cnt')
    elif order == 'most_commented':  # 댓글순
        queryset = queryset.annotate(num_comments=Count('comments')).order_by('-num_comments')
    else:  # 기본값 최신순
        queryset = queryset.order_by('-created_date')

    return queryset

class ClubBoardPostViewSet(viewsets.ModelViewSet):
    """ 특정 동아리 게시판 카테고리에 해당하는 글 불러오기 (정렬포함)"""
    serializer_class = PostListSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    def get_queryset(self):
        club_name = self.request.query_params.get('club_name')
        category = self.request.query_params.get('category')
        order = self.request.query_params.get('order')

        queryset = Post.objects.filter(board__club_name=club_name, board__category=category)
        queryset = order_list(queryset, order)
        return queryset

class FreeBoardPostViewSet(viewsets.ModelViewSet):
    """ 자유 게시판 카테고리에 해당하는 글 불러오기 (정렬포함)"""
    serializer_class = PostListSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    def get_queryset(self):
        club_name = 'FreeBoard'  # self.request.query_params.get('club_name')
        category = self.request.query_params.get('category')
        order = self.request.query_params.get('order')

        queryset = Post.objects.filter(board__club_name=club_name, board__category=category)
        queryset = order_list(queryset, order)
        return queryset

# 자유 게시판을 시스템 관리자가 생성,수정 삭제

# 특정 동아리 게시판을 동아리 관리자가 생성,수정,삭제


class PostCreateView(CreateAPIView):
    """
    게시글 생성
    - 자유 게시판 게시글, 댓글 생성 : 로그인한사람
    - 특정 동아리 게시판 게시글, 댓글 생성 : 로그인하고 특정 동아리 회원인 사람
    """
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # 게시글의 board_id를 요청 파라미터에서 가져옴
        user = self.request.user
        user_id = user.id

        data = self.request.data
        # board = data.get('board')
        # club_name = board.club_name
        board = serializer.validated_data.get('board')
        club_name = board.club_name.club_name
        print(club_name)
        # board의 club_name에 따라 권한 부여
        if club_name == 'FreeBoard':
            # 자유 게시판인 경우 로그인한 사용자만 게시글 작성 가능
            serializer.save(author=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        else:
            # 특정 동아리 게시판인 경우 해당 동아리 멤버만 게시글 작성 가능
            student_id = CustomUser.objects.get(id=user_id).student_id
            if ClubMember.objects.filter(club_name=club_name, student_id=student_id).exists():  #board.club.members.all():
                serializer.save(author=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            else:
                # 권한이 없는 경우 에러 처리
                raise PermissionDenied("You don't have permission to create a post in this board.")

class PostDetailView(RetrieveUpdateDestroyAPIView):
    """
    특정 게시글 읽기, 수정, 삭제
    """
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

    def get_object(self):
        post_id = self.kwargs.get('post_id')
        return Post.objects.get(id=post_id)




class CommentCreateView(CreateAPIView):
    """
    특정 게시글에 대한 댓글 생성
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # 게시글의 board_id를 요청 파라미터에서 가져옴
        user = self.request.user
        data = self.request.data
        # post = data.get('post')
        post = serializer.validated_data.get('post')
        club_name = post.board.club_name.club_name
        print(club_name)
        # board의 club_name에 따라 권한 부여
        if club_name == 'FreeBoard':
            # 자유 게시판인 경우 로그인한 사용자만 게시글 작성 가능
            serializer.save(author=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        else:
            # 특정 동아리 게시판인 경우 해당 동아리 멤버만 게시글 작성 가능
            student_id = CustomUser.objects.get(id=user).student_id
            if ClubMember.objects.filter(club_name=club_name, student_id=student_id).exists():  # board.club.members.all():
                serializer.save(author=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            else:
                # 권한이 없는 경우 에러 처리
                raise PermissionDenied("You don't have permission to create a post in this board.")


class CommentDetailView(RetrieveUpdateDestroyAPIView):
    """
    특정 댓글에 대한 읽기, 수정, 삭제
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

    def get_object(self):  # 특정 댓글 단일 객체
        comment_id = self.kwargs.get('comment_id')
        return Comment.objects.get(id=comment_id)


class PostCommentDetail(ListAPIView):
    """
    특정 게시글에 대한 모든 댓글 리스트 불러오기
    """
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        queryset = Comment.objects.filter(post_id=post_id)
        return  queryset

