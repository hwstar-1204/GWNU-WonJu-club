from rest_framework import serializers
from club_information.models import *
from club_board.models import *
from club_introduce.models import *
from club_account.models import *


class DynamicFieldModelSerializer(serializers.ModelSerializer):
    def __init__(self, *arg, **kwargs):
        fields = kwargs.pop('fields', None)
        super(DynamicFieldModelSerializer, self).__init__(*arg, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for fields_name in existing - allowed:
                self.fields.pop(fields_name)

class ClubMemberSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source=CustomUser.name)

    class Meta:
        model = ClubMember
        fields = ['id', 'name', 'job']

class PostSerializer(serializers.ModelSerializer):
    board_category = serializers.CharField(source='board.category')

    class Meta:
        model = Post
        fields = ['id', 'title', 'author', 'recommended_cnt', 'view_cnt', 'created_data', 'board_category']

class HomeSerializer(serializers.Serializer):
    members = serializers.SerializerMethodField()
    recent_posts = serializers.SerializerMethodField()
    recent_photo_album_posts = serializers.SerializerMethodField()
    recent_event_posts = serializers.SerializerMethodField()

    def get_members(self, obj):
        club_name = self.context.get('club_name')
        members = ClubMember.objects.filter(club__club_name=club_name)

        leaders = members.filter(job__in=['회장', '부회장'])

        if leaders.count() < 5:
            additional_members = members.exclude(job__in=['회장', '부회장'])[:5 - leaders.count()]
            result_list = list(leaders) + list(additional_members)
        else:
            result_list = leaders[:5]

        return ClubMemberSerializer(result_list, many=True).data

    def get_recent_posts(self, obj):
        club_name = self.context.get('club_name')
        posts = Post.objects.filter(board__club_name=club_name).order_by('-created_date')[:7]
        return PostSerializer(posts, many=True).data

    def get_recent_photo_album_posts(self, obj):
        club_name = self.context.get('club_name')
        posts = Post.objects.filter(board__club_name=club_name, board__category='사진첩').order_by('-created_date')[:3]
        return PostSerializer(posts, many=True).data

    def get_recent_event_posts(self, obj):
        club_name = self.context.get('club_name')
        posts = Post.objects.filter(board__club_name=club_name, board__category='이벤트').order_by('-created_date')[:3]
        return PostSerializer(posts, many=True).data

class AlbumEventSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='posts.title', read_only=True)
    photo = serializers.ImageField(source='posts.photo', read_only=True)
    recommended_cnt = serializers.IntegerField(source='posts.recommended_cnt', read_only=True)

    class Meta:
        model = Post
        fields = ['title', 'photo', 'recommended_cnt']

