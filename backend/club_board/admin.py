from django.contrib import admin
from .models import Board, Post, Comment

'''
list_display : 목록들의 이름
list_filter : 목록들 구분해주는 값 지정
search_fields : 목록들 검색하는 설정
list_per_page : 목록들 페이지별로 나누는 설정 
'''


# Register your models here.
class BoardAdmin(admin.ModelAdmin):
    list_display = ('id', 'club_name', 'category')
    list_filter = ('club_name', 'category')


class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'club_name', 'title', 'created_date')
    search_fields = ('board',)

    club_name = lambda self, obj: obj.board.club_name  # 외래키의 속성값 표시

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['photo'].required = False
        return form


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'post_title', 'content', 'author')
    post_title = lambda self, obj: obj.post.title  # 외래키의 속성값 표시


admin.site.register(Board, BoardAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
