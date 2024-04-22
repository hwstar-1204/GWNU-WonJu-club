from django.db import models

class ClubList(models.Model):
    club_name = models.CharField(max_length=20, primary_key=True)  # 동아리 이름
    category = models.IntegerField()  # 동아리 카테고리
    introducation = models.TextField()  # 동아리 소개
    photo = models.ImageField(upload_to='club_photos')  # 동아리 사진
    logo = models.ImageField(upload_to='club_logos')  # 동아리 로고
    new_club = models.BooleanField(default=False)  # 신규 동아리 여부

    class Meta:
        managed = False
        db_table = 'club'
