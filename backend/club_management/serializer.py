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
    existing_members = serializers.SerializerMethodField()
    applying_members = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = ['introducation', 'photo', 'logo', 'existing_members', 'applying_members']

    def get_existing_members(self):
        members = ClubMember.objects.filter(joined_data__isnull=False)
        return ClubMemberSerializer(members, many=True).data

    def get_applying_members(self):
        members = ClubMember.objectsfilter(joined_data__isnull=True)
        return ClubMemberSerializer(members, many=True).data