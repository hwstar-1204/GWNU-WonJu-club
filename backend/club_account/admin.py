from django import forms
from django.contrib import admin
from .models import CustomUser

# Register your models here.

# class CustomUserCreationForm(forms.ModelForm):



class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'name', 'student_id')

admin.site.register(CustomUser, CustomUserAdmin)
