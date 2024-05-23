from rest_framework import serializers
from club_management.models import *
from club_account.models import *
from club_introduce.models import *

class ClubListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubMember
        fields = ['club_name']
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name']

class ClubMemberSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)
    class Meta:
        model = ClubMember
        fields = ['id', 'joined_date', 'job', 'student_id']

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['introducation', 'photo', 'logo']
    @classmethod
    def get_existing_members(self, club_name):
        members = ClubMember.objects.filter(joined_date__isnull=False, club_name=club_name)
        return ClubMemberSerializer(members, many=True).data
    @classmethod
    def get_applying_members(self, club_name):
        members = ClubMember.objects.filter(joined_date__isnull=True, club_name=club_name)
        return ClubMemberSerializer(members, many=True).data