from django.db import models
from club_introduce.models import *
from club_board.models import *
from club_account.models import *

# Create your models here.
class Home(models.Model):
    class Meta:
        verbose_name = '동아리 홈'
        verbose_name_plural = '동아리 홈 정보'
        managed = False

    logo = models.ImageField(upload_to=club_logo_diretory_path)
    photo = models.ImageField(upload_to=club_photo_diretory_path)
    members = models.ForeignKey(ClubMember, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class Members(models.Model):
    class Meta:
        verbose_name = '동아리 회원'
        verbose_name_plural = '동아리 회원 정보'
        managed = False

    members = models.ForeignKey(ClubMember, on_delete=models.CASCADE)


