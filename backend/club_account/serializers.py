from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.utils import setup_user_email
from allauth.account.adapter import get_adapter


class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(max_length=30)
    student_id = serializers.IntegerField()
    grade = serializers.IntegerField()
    study = serializers.CharField(max_length=20)
    gender = serializers.BooleanField()
    phone = serializers.CharField(max_length=15)

    def get_cleaned_data(self):
        cleaned_data = super().get_cleaned_data()
        cleaned_data['name'] = self.validated_data.get('name', '')
        cleaned_data['student_id'] = self.validated_data.get('student_id', 0)
        cleaned_data['grade'] = self.validated_data.get('grade', 0)
        cleaned_data['study'] = self.validated_data.get('study', '')
        cleaned_data['gender'] = self.validated_data.get('gender', False)
        cleaned_data['phone'] = self.validated_data.get('phone', 0)
        return cleaned_data

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user

    def custom_signup(self, request, user):
        user.name = self.cleaned_data.get('name')
        user.student_id = self.cleaned_data.get('student_id')
        user.grade = self.cleaned_data.get('grade')
        user.study = self.cleaned_data.get('study')
        user.gender = self.cleaned_data.get('gender')
        user.phone = self.cleaned_data.get('phone')
        user.save()