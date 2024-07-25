from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from allauth.account.utils import setup_user_email
from allauth.account.adapter import get_adapter
from club_account.models import CustomUser
from typing import Any, Dict

class CustomRegisterSerializer(RegisterSerializer):
    NAME_MAX_LENGTH = 30
    STUDY_MAX_LENGTH = 20
    GENDER_MAX_LENGTH = 10
    PHONE_MAX_LENGTH = 15

    name = serializers.CharField(max_length=NAME_MAX_LENGTH)
    student_id = serializers.IntegerField()
    grade = serializers.IntegerField()
    study = serializers.CharField(max_length=STUDY_MAX_LENGTH)
    gender = serializers.CharField(max_length=GENDER_MAX_LENGTH)
    phone = serializers.CharField(max_length=PHONE_MAX_LENGTH)

    def get_cleaned_data(self) -> Dict[str, Any]:
        """
        사용자 입력 데이터 검증 및 정리
        추가 사용자 정보 입력 받기 위한 함수
        """
        cleaned_data = super().get_cleaned_data()  # username, email, password1
        additional_fields = ['name', 'student_id', 'grade', 'study', 'gender', 'phone']
        for field in additional_fields:
            cleaned_data[field] = self.validated_data.get(field, '')
        return cleaned_data

    def custom_signup(self, request: Any, user: CustomUser) -> CustomUser:
        """
        cleaned_data를 실제로 사용자 모델에 추가 정보를 저장하는 역할 수행
        """
        additional_fields = ['name', 'student_id', 'grade', 'study', 'gender', 'phone']
        for field in additional_fields:
            setattr(user, field, self.cleaned_data.get(field))
        user.save()
        return user

    def save(self, request: Any) -> CustomUser:
        """
        이메일 추가하여 사용자 인스턴스 생성
        """
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self, True)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + \
                 ('name', 'student_id', 'grade', 'study', 'gender', 'phone',)
