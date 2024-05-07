from rest_framework import serializers
from club_management.models import *
from club_account.models import *
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name']

class ClubMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='customuser')

    class Meta:
        model = ClubMember
        fields = ['id', 'joined_date', 'job', 'user']

class ClubSerializer(serializers.ModelSerializer):
    members = ClubMemberSerializer(source='clubmember_set', many=True)

    class Meta:
        model = Club
        fields = ['introducation', 'photo', 'logo', 'members']