from rest_framework import serializers
from club_introduce.models import *


class DynamicFieldModelSerializer(serializers.ModelSerializer):
    def __init__(self, *arg, **kwargs):
        fields = kwargs.pop('fields', None)
        super(DynamicFieldModelSerializer, self).__init__(*arg, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for fields_name in existing - allowed:
                self.fields.pop(fields_name)

class UserSerializer(DynamicFieldModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ClubSerializer(DynamicFieldModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'


class ClubMemberSerializer(DynamicFieldModelSerializer):
    student_num = UserSerializer(read_only=False)

    class Meta:
        model = ClubMember
        fields = '__all__'

class BoardPostSerializer(DynamicFieldModelSerializer):

    class Meta:
        model = BoardPost
        fields = '__all__'

class BoardPostContentSerializer(DynamicFieldModelSerializer):
    post_id = BoardPostSerializer(read_only=False)

    class Meta:
        model = BoardPostContent
        fields = '__all__'

'''
class BoardPostCommentSerializer(DynamicFieldModelSerializer):
    post_id = serializers.PrimaryKeyRelatedField(read_only=True, source='BoardPost.post_id')
    club_type = serializers.CharField(source='BoardPost.club_type')
    post_name = serializers.CharField(source='BoardPost.post_name')
    writer = serializers.CharField(source='BoardPost.writer')
    view_cnt = serializers.IntegerField(source='BoardPost.view_cnt')
    post_content = serializers.CharField(source='BoardPostContent.post_content')
    photo = serializers.ImageField(source='BoardPostContent.photo')

    class Meta:
        model = BoardComment
        field = '__all__'
'''