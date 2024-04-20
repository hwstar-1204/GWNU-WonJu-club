from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from club_account.managers import CustomUserManager


# Create your models here.
class CustomUser(AbstractUser, PermissionsMixin):
    objects = CustomUserManager()

    class Meta:
        verbose_name = '동아리 유저'
        verbose_name_plural = '동아리 유저들'

    username = None
    first_name = None
    last_name = None
    email = models.EmailField(_('email address'), unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    name = models.CharField(max_length=30)
    student_id = models.IntegerField(unique=True, validators=[MinValueValidator(10000000), MaxValueValidator(100000000)])  # 학번
    grade = models.IntegerField()  # 학년
    study = models.CharField(max_length=20)  # 학과
    gender = models.BooleanField(default=False)  # true = 남, false = 여
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.email

