from .models import Board, Post, Comment
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




class PostListSerializer(serializers.ModelSerializer):
    """
    게시글 목록에 필요한 필드 제공
    """
    class Meta:
        model = Post
        fields = ['id', 'board', 'title', 'author', 'recommended_cnt', 'view_cnt', 'created_date']

class PostDetailSerializer(serializers.ModelSerializer):
    """
    해당 게시글 모든 세부 사항 필드 제공
    """
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    """
    게시글 댓글
    """
    class Meta:
        model = Comment
        fields = '__all__'

# class PostCommentSerializer(serializers.ModelSerializer):
#     """
#     댓글 리스트
#     """
#     # comments = CommentSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = Post
#         fields = '__all__'
