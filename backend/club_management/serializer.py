from rest_framework import serializers
from club_management.models import *


class DynamicFieldModelSerializer(serializers.ModelSerializer):
    def __init__(self, *arg, **kwargs):
        fields = kwargs.pop('fields', None)
        super(DynamicFieldModelSerializer, self).__init__(*arg, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for fields_name in existing - allowed:
                self.fields.pop(fields_name)

class ClubSerializer(DynamicFieldModelSerializer):
    class Meta:
        model = ClubManagement
        fields = '__all__'
class UserSerializer(DynamicFieldModelSerializer):
    class Meta:
        model = ManagementUser
        fields = '__all__'

class ClubMemberSerializer(DynamicFieldModelSerializer):
    student_num = UserSerializer(read_only=False)

    class Meta:
        model = ClubMemberManagement
        fields = '__all__'