# Generated by Django 4.2.17 on 2025-01-13 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_lessons_lesson_number_alter_lessons_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='courses',
            name='course_picture',
            field=models.ImageField(blank=True, null=True, upload_to='course_picture/', verbose_name='Картинка курса'),
        ),
    ]
