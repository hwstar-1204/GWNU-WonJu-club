from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
# from django.utils.translation import ugettext_lazy as _
from django.utils.translation import gettext_lazy as _

from club_account.managers import CustomUserManager


# Create your models here.
class CustomUser(AbstractUser, PermissionsMixin):
    GENDER_CHOICES = (
        ('남자', 'Male'),
        ('여자', 'Female'),
    )
    username = None
    first_name = None
    last_name = None

    name = models.CharField(max_length=30)  # 변경사항 (name)
    email = models.EmailField(_('email address'), unique=True)
    student_id = models.IntegerField(unique=True, validators=[MinValueValidator(10000000), MaxValueValidator(100000000)])  # 학번
    grade = models.IntegerField()  # 학년
    study = models.CharField(max_length=20)  # 학과
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='M')  # 변경사항
    phone = models.CharField(max_length=15)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    # USERNAME_FIELD = ''
    # REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = '회원'
        verbose_name_plural = '회원들'

    def __str__(self):
        return self.email
