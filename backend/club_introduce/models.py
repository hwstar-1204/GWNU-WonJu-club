from django.db import models
from club_account.models import CustomUser

def club_logo_directory_path(instance, filename):
    # 파일 저장 경로를 'MEDIA_ROOT/club_name/logo/'로 설정
    return 'club/logo/'

def club_photo_directory_path(instance: object, filename: object) -> object:
    # 파일 저장 경로를 'MEDIA_ROOT/club_name/photo/'로 설정
    return 'club/photo/'

class Club(models.Model):
    class Meta:
        verbose_name = '동아리'
        verbose_name_plural = '동아리들'

    club_name = models.CharField(max_length=20, primary_key=True)  # 동아리 이름
    category = models.CharField(max_length=20)  # 정규, 소모임, 취업 등등
    type = models.CharField(max_length=20)  # 운동, 음악, 종교 등등
    introducation = models.TextField()  # 동아리 소개
    photo = models.ImageField(upload_to=club_photo_directory_path, null=True)  # 동아리 사진
    logo = models.ImageField(upload_to=club_logo_directory_path, null=True)  # 동아리 로고 null-> default
    new_club = models.BooleanField(default=False)  # 신규 동아리 여부

class ClubDetail(models.Model):
    club = models.OneToOneField(Club, on_delete=models.CASCADE, primary_key=True, related_name='details')
    join = models.CharField(max_length=100)  # 가입방법
    location = models.CharField(max_length=100)  # 위치
    activity = models.TextField()  # 활동
    fee = models.CharField(max_length=100)  # 회비

    def __str__(self):
        return f"Details of {self.club.club_name}"


#동아리 홈에서 회원을 소개하기 위한 모델
class ClubMember(models.Model):
    class Meta:
        verbose_name = '동아리 회원'
        verbose_name_plural = '동아리 회원들'
    club_name = models.ForeignKey('Club', on_delete=models.CASCADE, to_field='club_name', null=True)  # 변경
    # club_name = models.CharField(max_length=20)
    student_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='student_id') # 변경
    # student_id = models.IntegerField()

    joined_date = models.DateTimeField(null=False)
    job = models.CharField(max_length=5, default='일반회원')