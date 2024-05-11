from rest_framework.generics import *
from rest_framework.permissions import *
from rest_framework.views import APIView
from rest_framework.response import Response
from club_information.serializer import *
from club_information.models import *
from club_board.models import *
from club_introduce.models import *
from django.db.models import Q


# Create your views here.
class ClubHomeView(APIView):
    serializer_class = HomeSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        """
        동아리 이름에 해당하는 홈 정보 반환
        """
        club_name = self.kwargs.get('club_name', None)
        if club_name:
            queryset = ClubMember.objects.filter(club_name_id=club_name)
            serializer = ClubMemberSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"error": "Club name not provided or invalid"}, status=400)


class AlbumView(ListAPIView):
    serializer_class = AlbumEventSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        """
        동아리가 작성한 사진첩
        """
        club_name = self.kwargs.get('club_name', None)
        photo_posts = Post.objects.filter(board__club_name=self.kwargs.get('club_name'),
                                            board__category='사진첩')
        search_type = self.request.query_params.get('search_type', None)
        search_query = self.request.query_params.get('search_query', None)

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
        serializer = self.get_serializer(photo_posts, many=True)
        return Response(serializer.data)


class EventView(ListAPIView):
    serializer_class = AlbumEventSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        """
                동아리가 작성한 이벤트
        """
        event_posts = Post.objects.filter(board__club_name=self.kwargs.get('club_name'),
                                                board__category='이벤트')
        search_type = self.request.query_params.get('search_type', None)
        search_query = self.request.query_params.get('search_query', None)

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
        serializer = self.get_serializer(event_posts, many=True)
        return Response(serializer.data)
