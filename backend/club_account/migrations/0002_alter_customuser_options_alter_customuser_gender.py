# Generated by Django 4.2.1 on 2024-04-25 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club_account', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'verbose_name': '회원', 'verbose_name_plural': '회원들'},
        ),
        migrations.AlterField(
            model_name='customuser',
            name='gender',
            field=models.CharField(choices=[('남자', 'Male'), ('여자', 'Female')], default='M', max_length=10),
        ),
    ]