from rest_framework.generics import *
from club_information.serializer import *
from club_information.models import *
from django.db.models import Q


# Create your views here.
class ClubHomeView(RetrieveAPIView):
    serializer_class = HomeSerializer

    def get_queryset(self):
        """
        동아리 이름에 해당하는 홈 정보
        """
        club_name = self.kwargs.get('club_name', None)
        if club_name:
            return Home.objects.filter(members__club_name=club_name, post__club_name=club_name)
        return self.queryset.none()


class AlbumView(ListAPIView):
    serializer_class = AlbumEventSerializer

    def get_queryset(self):
        """
        동아리가 작성한 사진첩
        """
        photo_posts = AlbumEvent.objects.filter(posts__board__club_name=self.kwargs.get('club_name', None),
                                        posts__board__category='사진첩')
        search_type = self.request.query_params.get('search_type', None)
        search_query = self.request.query_params.get('search_query', None)

        filters = Q()
        if search_type == 'title_content':
            filters = Q(posts__title=search_query) | Q(posts__content=search_query)
        elif search_type == 'title':
            filters = Q(posts__title=search_query)
        elif search_type == 'content':
            filters = Q(posts__content=search_query)
        elif search_type == 'author':
            filters = Q(posts__author=search_query)

        photo_posts = photo_posts.filter(filters)
        return photo_posts

class EventView(ListAPIView):
    serializer_class = AlbumEventSerializer

    def get_queryset(self):
        """
                동아리가 작성한 이벤트
        """
        event_posts = AlbumEvent.objects.filter(posts__board__club_name=self.kwargs['club_name'],
                                             posts__board__category='이벤트')
        search_type = self.request.query_params.get('search_type', None)
        search_query = self.request.query_params.get('search_query', None)

        filters = Q()
        if search_type == 'title_content':
            filters = Q(posts__title=search_query) | Q(posts__content=search_query)
        elif search_type == 'title':
            filters = Q(posts__title=search_query)
        elif search_type == 'content':
            filters = Q(posts__content=search_query)
        elif search_type == 'author':
            filters = Q(posts__author=search_query)

        event_posts = event_posts.filter(filters)
        return event_posts