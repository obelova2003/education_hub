# Generated by Django 4.2.17 on 2025-01-16 13:08

import django.contrib.auth.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('api', '0010_alter_courses_course_for_who'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(max_length=150, unique=True, verbose_name='Никнейм пользователя')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Почта')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='Имя')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='Фамилия')),
                ('bio', models.TextField(blank=True, verbose_name='Инфа о пользователе')),
                ('role', models.CharField(choices=[('student', 'Ученик'), ('teacher', 'Учитель'), ('admin', 'Админ')], default='student', max_length=9, verbose_name='Роль пользователя')),
                ('groups', models.ManyToManyField(blank=True, help_text='Группы, к которым принадлежит пользователь', related_name='api_user_set', related_query_name='api_user', to='auth.group', verbose_name='Группы')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Специфичные права для этого пользователя', related_name='api_user_set', related_query_name='api_user', to='auth.permission', verbose_name='Права пользователя')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
