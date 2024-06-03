from rest_framework.generics import *
from rest_framework.permissions import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from club_information.serializer import *
from club_information.models import *
from club_board.models import *
from club_introduce.models import *
from club_introduce.serializer import *
from django.db.models import Q

# Create your views here.
class ClubHomeView(APIView):
    serializer_class = HomeSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        club_name = kwargs.get('club_name', None)
        if club_name:
            try:
                club = Club.objects.get(club_name=club_name)
                club_serializer = ClubSerializer(club)
                club_data = club_serializer.data

                # HomeSerializer에 club_name을 전달
                home_serializer = HomeSerializer()

                club_members = home_serializer.get_members(club_name)
                club_posts = home_serializer.get_recent_posts(club_name)
                club_album = home_serializer.get_recent_photo_album_posts(club_name)
                club_event = home_serializer.get_recent_event_posts(club_name)

                return Response({
                    'club_data': club_data,
                    'club_members': club_members,
                    'club_posts': club_posts,
                    'club_album': club_album,
                    'club_event': club_event
                })
            except Club.DoesNotExist:
                return Response({"error": "Club not found"}, status=404)
        else:
            return Response({"error": "Club name not provided or invalid"}, status=400)

class MembersView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        club_name = kwargs.get('club_name')
        club_members = ClubMember.objects.filter(club_name=club_name)

        serializer = ClubMemberSerializer(club_members, many=True).data
        return Response(serializer)

class AlbumView(APIView):
    permission_classes = [AllowAny]
    pagination_class = PageNumberPagination

    def get(self, request, *args, **kwargs):
        """
        동아리가 작성한 사진첩
        """
        photo_posts = Post.objects.filter(board__club_name=kwargs.get('club_name'),
                                                board__category='사진첩')
        search_type = self.request.query_params.get('search_type', None)
        search_query = self.request.query_params.get('search_query', None)

        if search_query:
            filters = Q()
            if search_type == 'title_content':
                filters = Q(title=search_query) | Q(content=search_query)
            elif search_type == 'title':
                filters = Q(title=search_query)
            elif search_type == 'content':
                filters = Q(content=search_query)
            elif search_type == 'author':
                filters = Q(author=search_query)

            photo_posts = photo_posts.filter(filters)

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(photo_posts, request)
        serializer = AlbumEventSerializer(page, many=True)
        return Response(serializer.data)


class EventView(APIView):
    permission_classes = [AllowAny]
    pagination_class = PageNumberPagination
    def get(self, request, *args, **kwargs):
        """
                동아리가 작성한 이벤트
        """
        event_posts = Post.objects.filter(board__club_name=kwargs.get('club_name'),
                                                board__category='이벤트')
        search_type = self.request.query_params.get('search_type', None)
        search_query = self.request.query_params.get('search_query', None)

        if search_query:
            filters = Q()
            if search_type == 'title_content':
                filters = Q(title=search_query) | Q(content=search_query)
            elif search_type == 'title':
                filters = Q(title=search_query)
            elif search_type == 'content':
                filters = Q(content=search_query)
            elif search_type == 'author':
                filters = Q(author=search_query)

            event_posts = event_posts.filter(filters)

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(event_posts, request)
        serializer = AlbumEventSerializer(page, many=True)
        return Response(serializer.data)

class CreateAlbumView(APIView):
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
class CreateEventView(APIView):
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
