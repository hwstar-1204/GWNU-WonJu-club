from rest_framework import serializers
from club_information.models import *


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
        model = ClubHomeUser
        fields = '__all__'

class ClubSerializer(DynamicFieldModelSerializer):
    class Meta:
        model = ClubHome
        fields = '__all__'


class ClubMemberSerializer(DynamicFieldModelSerializer):
    student_num = UserSerializer(read_only=False)

    class Meta:
        model = ClubHomeMember
        fields = '__all__'

class BoardPostSerializer(DynamicFieldModelSerializer):

    class Meta:
        model = ClubHomePost
        fields = '__all__'

class BoardPostContentSerializer(DynamicFieldModelSerializer):
    post_id = BoardPostSerializer(read_only=False)

    class Meta:
        model = ClubHomePostContent
        fields = '__all__'