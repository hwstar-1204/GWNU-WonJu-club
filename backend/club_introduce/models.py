from django.db import models
from club_account.models import CustomUser

class Club(models.Model):
    class Meta:
        verbose_name = '동아리'
        verbose_name_plural = '동아리들'

    club_name = models.CharField(max_length=20, primary_key=True)  # 동아리 이름
    category = models.CharField(max_length=20)  # 동아리 카테고리
    introducation = models.TextField()  # 동아리 소개
    photo = models.ImageField(upload_to='club_photos', null=True)  # 동아리 사진
    logo = models.ImageField(upload_to='club_logos', null=True)  # 동아리 로고 null-> default
    new_club = models.BooleanField(default=False)  # 신규 동아리 여부


#동아리 홈에서 회원을 소개하기 위한 모델
class ClubMember(models.Model):
    class Meta:
        verbose_name = '동아리 회원'
        verbose_name_plural = '동아리 회원들'
    club_name = models.ForeignKey('Club', on_delete=models.CASCADE)  # 변경
    # club_name = models.CharField(max_length=20)
    student_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='student_id') # 변경
    # student_id = models.IntegerField()

    joined_date = models.DateTimeField(null=False)
    job = models.CharField(max_length=5)