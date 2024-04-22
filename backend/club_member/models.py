from django.db import models


class ClubMembers(models.Model):
    club_name = models.CharField(max_length=20, primary_key=True)

    class Meta:
        managed = False
        db_table = 'club'

#동아리 홈에서 회원을 소개하기 위한 모델
class ClubMemberList(models.Model):
    member_id = models.IntegerField(primary_key=True)
    club_name = models.ForeignKey('ClubMembers', on_delete=models.CASCADE, db_column='club_name')
    student_num = models.ForeignKey('MemberName', on_delete=models.CASCADE, db_column='student_num')
    joined_date = models.DateTimeField(null=False)
    job = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'club_member'

#Club_Member 테이블에는 학생이름이 없다.
#그래서 User로 이름을 가져온다.
class MemberName(models.Model):
    student_num = models.IntegerField(primary_key=True)
    user_name = models.TextField()

    class Meta:
        managed = False
        db_table = 'user'
