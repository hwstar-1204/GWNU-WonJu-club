from .models import Board, Post, Comment, Event
from rest_framework import serializers

# class BoardSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Board
#         fields = '__all__'
#
# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = '__all__'
#
# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = '__all__'


class AuthorNameMixin:
    def get_author_name(self, obj):
        return obj.author.name


class PostListSerializer(serializers.ModelSerializer):
    """
    게시글 목록에 필요한 필드 제공
    """
    author_name = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id', 'board', 'title', 'author_name', 'recommended_cnt', 'view_cnt', 'created_date']

    def get_author_name(self, obj):
        return obj.author.name

class PostDetailSerializer(serializers.ModelSerializer):
    """
    해당 게시글 모든 세부 사항 필드 제공
    """
    author_name = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id', 'board', 'title', 'content', 'author_name', 'recommended_cnt', 'view_cnt', 'created_date']

    def get_author_name(self, obj):
        return obj.author.name

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

class CommentSerializer(AuthorNameMixin, serializers.ModelSerializer):
    """
    게시글 댓글
    """
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'author_name', 'created_date']

class CommentCreateSerializer(AuthorNameMixin,serializers.ModelSerializer):
    """
    댓글 생성
    """
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'author_name', 'created_date']

    def create(self, validated_data):
        post_id = self.context['request'].data.get('post_id')
        post = Post.objects.get(id=post_id)
        validated_data['post'] = post

        author = self.context['request'].user
        validated_data['author'] = author

        return Comment.objects.create(**validated_data)


class EventSerializer(AuthorNameMixin, serializers.ModelSerializer):
    """
    이벤트
    """
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'title', 'content', 'start_time', 'end_time', 'author_name', 'photo']

    def create(self, validated_data):
        author = self.context['request'].user
        validated_data['author'] = author

        return Event.objects.create(**validated_data)
