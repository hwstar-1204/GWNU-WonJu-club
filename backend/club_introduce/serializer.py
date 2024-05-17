from rest_framework import serializers
from .models import *

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

class ApplyClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubMember
        fields = '__all__'
