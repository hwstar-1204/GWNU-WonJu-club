# Generated by Django 4.2.1 on 2024-05-23 11:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('club_introduce', '0002_club_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClubDetail',
            fields=[
                ('club', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='details', serialize=False, to='club_introduce.club')),
                ('join', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('activity', models.TextField()),
                ('fee', models.CharField(max_length=100)),
            ],
        ),
    ]
