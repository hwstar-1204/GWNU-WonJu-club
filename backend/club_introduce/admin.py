from django.contrib import admin
from .models import Club, ClubMember

# Register your models here.

class ClubAdmin(admin.ModelAdmin):
    list_display = ('club_name', 'category', 'new_club')

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['photo'].required = False
        form.base_fields['logo'].required = False
        return form


admin.site.register(Club, ClubAdmin)
admin.site.register(ClubMember)
