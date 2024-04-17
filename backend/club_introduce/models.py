from django.db import models


# Create your models here.

class Club(models.Model):
    club_name = models.CharField(max_length=20, primary_key=True)
    category = models.IntegerField()
    introducation = models.TextField()
    photo = models.ImageField()
    logo = models.ImageField()
    new_club = models.BooleanField()

    class Meta:
        db_table = 'Club'


class ClubMember(models.Model):
    member_id = models.IntegerField(primary_key=True)
    club_name = models.ForeignKey('Club', on_delete=models.CASCADE, db_column='club_name')
    student_num = models.ForeignKey('User', on_delete=models.CASCADE, db_column='student_num')
    joined_date = models.DateTimeField(null=True)
    job = models.IntegerField()

    class Meta:
        db_table = 'Club_Member'


class BoardPost(models.Model):
    post_id = models.IntegerField(primary_key=True)
    club_type = models.ForeignKey('Club', on_delete=models.CASCADE, db_column='club_type',related_name='posts')
    post_name = models.TextField()
    writer = models.TextField()
    created_date = models.DateTimeField(null=True)
    category = models.IntegerField()
    recommend_cnt = models.IntegerField()
    view_cnt = models.IntegerField()

    class Meta:
        db_table = 'Board_Post'


class User(models.Model):
    student_num = models.IntegerField(primary_key=True)
    user_name = models.TextField()

    class Meta:
        db_table = 'User'


class BoardPostContent(models.Model):
    post_id = models.ForeignKey('BoardPost', on_delete=models.CASCADE, db_column='post_id', primary_key=True)
    post_content = models.TextField()
    photo = models.ImageField()

    class Meta:
        db_table = 'Board_Post_Content'

'''
class BoardComment(models.Model):
    comment_id = models.IntegerField(primary_key=True)
    post_id = models.ForeignKey('BoardPost', on_delete=models.CASCADE, db_column='post_id')
    comment_content = models.TextField()
    created_data = models.DateTimeField(null=True)
    writer = models.TextField()

    class Meta:
        db_table = 'Board_Comment'
'''