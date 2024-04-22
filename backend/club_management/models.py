from django.db import models


#전체 동아리 소개에 필요한 모델
class ClubManagement(models.Model):
    club_name = models.CharField(max_length=20, primary_key=True)
    introducation = models.TextField()
    photo = models.ImageField()
    logo = models.ImageField()

    class Meta:
        managed = False
        db_table = 'Club'

#동아리 홈에서 회원을 소개하기 위한 모델
class ClubMemberManagement(models.Model):
    member_id = models.IntegerField(primary_key=True)
    club_name = models.ForeignKey('ClubManagement', on_delete=models.CASCADE, db_column='club_name')
    student_num = models.ForeignKey('ManagementUser', on_delete=models.CASCADE, db_column='student_num')
    joined_date = models.DateTimeField(auto_now_add=True, null=False)
    job = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'Club_Member'

#Club_Member 테이블에는 학생이름이 없다.
#그래서 User로 이름을 가져온다.
class ManagementUser(models.Model):
    student_num = models.IntegerField(primary_key=True)
    user_name = models.TextField()

    class Meta:
        managed = False
        db_table = 'User'
