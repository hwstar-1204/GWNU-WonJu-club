from django.db import models
from django.conf import settings
from club_introduce.models import Club

# Create your models here.
class Board(models.Model):  # 게시판
    class Meta:
        verbose_name = '게시판'
        verbose_name_plural = '게시판들'
    # TODO club_table 동아리의 이름과 외래키 설정 해야함!!, 다른 테이블의 기본키를 참조하는 왜래키는 null을 허용하지 않음 -> blank로 처리
    # club_name = models.CharField(max_length=50, blank=True)  # 동아리 명 ,
    club_name = models.ForeignKey(Club, on_delete=models.CASCADE, null=True)  # club_name
    category = models.CharField(max_length=50)  # 게시판 종류 구분 역할 (일반, 공지, 이벤트 , 부원모집)

class Post(models.Model):  # 게시글
    class Meta:
        verbose_name = '게시글'
        verbose_name_plural = '게시글들'

    board = models.ForeignKey('Board', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)  # 게시판 글 제목
    content = models.TextField()  # 게시글의 내용  # from tinymce.models import HTMLField
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # 게시글 저자
    photo = models.ImageField(upload_to='media/%Y', null=True)
    recommended_cnt = models.IntegerField(default=0)  # 추천 수
    view_cnt = models.IntegerField(default=0)  # 조회 수
    created_date = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):  # 게시글 댓글
    class Meta:
        verbose_name = '댓글'
        verbose_name_plural = '댓글들'

    post = models.ForeignKey('Post', on_delete=models.CASCADE)  # 게시글 번호
    content = models.TextField()  # 댓글 내용
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # 댓글 저자
    created_date = models.DateTimeField(auto_now_add=True)

class Event(models.Model):
    class Meta:
        verbose_name = '이벤트'
        verbose_name_plural = '이벤트들'

    title = models.CharField(max_length=50) # 이벤트 제목
    content = models.TextField()  # 이벤트 글
    start_time = models.DateField()  # 이벤트 시작 날짜
    end_time = models.DateField()  # 이벤트 종료 날짜
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # 작성자
    photo = models.ImageField(upload_to='media/%Y', null=True)  # 사진
    created_date = models.DateTimeField(auto_now_add=True)  # 작성 일자

class Notice(models.Model):
    class Meta:
        verbose_name = '공지사항'
        verbose_name_plural = '공지사항들'

    specific_id = models.CharField(primary_key=True, max_length=50)  # 공지사항 고유번호
    title = models.CharField(max_length=70)  # 제목
    author = models.CharField(max_length=20)  # 작성자
    created_date = models.DateField()  # 작성 일자
    link = models.URLField()  # 링크