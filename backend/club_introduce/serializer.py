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

class ClubSerializer(DynamicFieldModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

class ApplyClubSerializer(DynamicFieldModelSerializer):
    class Meta:
        model = ClubMember
        fields = '__all__'
