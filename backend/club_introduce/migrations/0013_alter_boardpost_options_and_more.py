# Generated by Django 5.0.4 on 2024-04-19 12:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('club_introduce', '0012_delete_boardcomment'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='boardpost',
            options={'managed': False},
        ),
        migrations.AlterModelOptions(
            name='boardpostcontent',
            options={'managed': False},
        ),
        migrations.AlterModelOptions(
            name='club',
            options={'managed': True},
        ),
        migrations.AlterModelOptions(
            name='clubmember',
            options={'managed': False},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'managed': False},
        ),
    ]