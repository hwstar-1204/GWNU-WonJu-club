from rest_framework import serializers
from club_information.models import *
from club_board.models import *
from club_introduce.models import *
from club_account.models import *

class ClubUserName(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name']
class ClubMemberSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='student_id.name', read_only=True)
    class Meta:
        model = ClubMember
        fields = ['id', 'joined_date', 'job', 'user']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'author', 'recommended_cnt', 'view_cnt', 'created_date']

class HomeSerializer(serializers.Serializer):
    members = serializers.SerializerMethodField()
    recent_posts = serializers.SerializerMethodField()
    recent_photo_album_posts = serializers.SerializerMethodField()
    recent_event_posts = serializers.SerializerMethodField()

    def get_members(self, club_name):
        members = ClubMember.objects.filter(club_name=club_name)
        leaders = members.filter(job__in=['회장', '부회장'])

        if leaders.count() < 5:
            additional_members = members.exclude(job__in=['회장', '부회장'])[:5 - leaders.count()]
            result_list = list(leaders) + list(additional_members)
        else:
            result_list = leaders[:5]

        return ClubMemberSerializer(result_list, many=True).data

    def get_recent_posts(self, club_name):
        posts = Post.objects.filter(board__club_name=club_name).order_by('-created_date')[:7]
        return PostSerializer(posts, many=True).data

    def get_recent_photo_album_posts(self, club_name):
        posts = Post.objects.filter(board__club_name=club_name, board__category='사진첩').order_by('-created_date')[:3]
        return PostSerializer(posts, many=True).data

    def get_recent_event_posts(self, club_name):
        posts = Post.objects.filter(board__club_name=club_name, board__category='이벤트').order_by('-created_date')[:3]
        return PostSerializer(posts, many=True).data

class AlbumEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'photo', 'recommended_cnt']

class PostCreateSerializer(serializers.ModelSerializer):
    """
    특정 게시판에 게시글 생성
    """
    class Meta:
        model = Post
        fields = ['title', 'content']

    def create(self, validated_data):
        club_name = self.context['request'].data.get('club_name')
        category = self.context['request'].data.get('category')
        board = Board.objects.get(club_name=club_name, category=category)
        validated_data['board'] = board

        author = self.context['request'].user
        validated_data['author'] = author

        return Post.objects.create(**validated_data)

