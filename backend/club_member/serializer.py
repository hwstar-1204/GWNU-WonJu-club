from rest_framework import serializers
from club_member.models import *


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
        model = MemberName
        fields = '__all__'

class ClubMemberSerializer(DynamicFieldModelSerializer):
    student_num = UserSerializer(read_only=False)

    class Meta:
        model = ClubMemberList
        fields = '__all__'