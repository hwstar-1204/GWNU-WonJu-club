from django.db import models

# Create your models here.
#전체 동아리 소개에 필요한 모델
class Club(models.Model):
    club_name = models.CharField(max_length=20, primary_key=True)
    category = models.IntegerField()
    introducation = models.TextField()
    photo = models.ImageField()
    logo = models.ImageField()
    new_club = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'Club'


#동아리 홈에서 회원을 소개하기 위한 모델
class ClubMember(models.Model):
    member_id = models.IntegerField(primary_key=True)
    club_name = models.ForeignKey('Club', on_delete=models.CASCADE, db_column='club_name')
    student_num = models.ForeignKey('User', on_delete=models.CASCADE, db_column='student_num')
    joined_date = models.DateTimeField(auto_now_add=True, null=True)
    job = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'Club_Member'

#최신 쓴 글을 위한 데이터
class BoardPost(models.Model):
    post_id = models.IntegerField(primary_key=True)
    club_type = models.ForeignKey('Club', on_delete=models.CASCADE, db_column='club_type',related_name='posts')
    post_name = models.TextField()
    writer = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    category = models.IntegerField()
    recommend_cnt = models.IntegerField()
    view_cnt = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'Board_Post'

#Club_Member 테이블에는 학생이름이 없다.
#그래서 User로 이름을 가져온다.
class User(models.Model):
    student_num = models.IntegerField(primary_key=True)
    user_name = models.TextField()

    class Meta:
        managed = True
        db_table = 'User'

#사진첩과 이벤트에 사용될 이미지
#글을 가져오기 위한 모델
class BoardPostContent(models.Model):
    post_id = models.ForeignKey('BoardPost', on_delete=models.CASCADE, db_column='post_id', primary_key=True)
    post_content = models.TextField()
    photo = models.ImageField()

    class Meta:
        managed = False
        db_table = 'Board_Post_Content'