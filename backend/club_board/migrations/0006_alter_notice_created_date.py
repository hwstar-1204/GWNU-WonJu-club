# Generated by Django 4.2.1 on 2024-05-28 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club_board', '0005_alter_notice_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notice',
            name='created_date',
            field=models.DateField(),
        ),
    ]