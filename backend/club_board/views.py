from django.db.models import Count
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from club_introduce.models import ClubMember
from .serializers import *
from .permissions import IsAuthorOrReadOnly, IsSystemAdminOrReadOnly
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import TokenAuthentication

# viewsets : provides default create(), retireve(), update(), destroy(), list(), partial_update()
# Create your views here.

# class BoardPostListView(ListAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostListSerializer
#     pagination_class = PageNumberPagination


def order_list(queryset, order):
    if order == 'most_viewed':  # 조회순
        queryset = queryset.order_by('-view_cnt')
    elif order == 'most_commented':  # 댓글순
        queryset = queryset.annotate(num_comments=Count('comments')).order_by('-num_comments')
    else:  # 기본값 최신순
        queryset = queryset.order_by('-created_date')
    return queryset

class BoardPostListView(generics.ListAPIView):
    """ 동아리 게시판 글 불러오기 (정렬포함)"""
    serializer_class = PostListSerializer
    # pagination_class = PageNumberPagination

    def get_queryset(self):
        club_name = self.kwargs.get('club_name')
        category = self.kwargs.get('category')
        order = self.kwargs.get('order')

        queryset = Post.objects.filter(board__club_name=club_name, board__category=category)
        queryset = order_list(queryset, order)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

# 자유 게시판을 시스템 관리자가 생성,수정 삭제
# 특정 동아리 게시판을 동아리 관리자가 생성,수정,삭제
# 검색 기능

class PostCreateView(APIView):
    """
    게시글 생성
    - 자유 게시판 게시글, 댓글 생성 : 로그인한사람
    - 특정 동아리 게시판 게시글, 댓글 생성 : 로그인하고 특정 동아리 회원인 사람
    """
    def post(self, request, format=None):
        serializer = PostCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # 동아리명에 따라 처리
            club_name = request.data.get('club_name')
            if club_name == 'FreeBoard':
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)  # serializer.data,
            else:
                # 특정 동아리 게시판인 경우 해당 동아리 멤버만 게시글 작성 가능
                user = request.user
                student_id = user.student_id
                if ClubMember.objects.filter(club_name=club_name, student_id=student_id).exists():
                    serializer.save()
                    return Response(status=status.HTTP_201_CREATED)
                else:
                    # 권한이 없는 경우 에러 처리
                    raise PermissionDenied("You don't have permission to create a post in this board.")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    특정 게시글 읽기, 수정, 삭제
    """
    serializer_class = PostDetailSerializer
    # permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

    def get_object(self):
        post_id = self.kwargs.get('post_id')
        return Post.objects.get(id=post_id)


class CommentCreateView(APIView):
    """
    특정 게시글에 대한 댓글 생성
    """
    def post(self, request, format=None):
        serializer = CommentCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # post_id 따라 처리
            post_id = request.data.get('post_id')
            club_name = Post.objects.get(id=post_id).board.club_name.club_name
            print(club_name)
            if club_name == 'FreeBoard':
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                # 특정 동아리 게시판인 경우 해당 동아리 멤버만 게시글 작성 가능
                user = request.user
                student_id = user.student_id
                if ClubMember.objects.filter(club_name=club_name, student_id=student_id).exists():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    # 권한이 없는 경우 에러 처리
                    raise PermissionDenied("You don't have permission to create a post in this board.")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    특정 댓글에 대한 읽기, 수정, 삭제
    """
    serializer_class = CommentSerializer
    # permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

    def get_object(self):  # 특정 댓글 단일 객체
        comment_id = self.kwargs.get('comment_id')
        return Comment.objects.get(id=comment_id)

class PostCommentDetail(generics.ListAPIView):
    """
    특정 게시글에 대한 모든 댓글 리스트 불러오기
    """
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        queryset = Comment.objects.filter(post_id=post_id)
        return queryset

# ----
class EventListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsSystemAdminOrReadOnly]  # 관리자 권한
    queryset = Event.objects.all()
    serializer_class = EventSerializer
