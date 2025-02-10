from django.db import models
from django.contrib.auth.models import AbstractUser 


ROLES = (
    ('student', 'Студент'),
    ('teacher', 'Учитель'),
)


class Users(AbstractUser):
    last_name = models.CharField(max_length=150,
                                 verbose_name='Фамилия')
    first_name= models.CharField(max_length=150,
                                 verbose_name='Имя')
    middle_name = models.CharField(max_length=150,
                                   null=True,
                                   blank=True,
                                   verbose_name='Отчество')
    username = models.CharField(max_length=150,
                                unique=True,
                                verbose_name='Логин')
    date_of_birth = models.DateField(null=True, 
                                    blank=True,
                                    verbose_name="Дата рождения")
    email = models.EmailField(max_length=254, unique=True,
                              verbose_name='Почта')
    telephone = models.CharField(max_length=20, blank=True, null=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)
    role = models.CharField(max_length=10, choices=ROLES)
    

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    @property
    def is_teacher(self):
        return self.role == 'teacher'

    @property
    def is_student(self):
        return self.role == 'student'
    
    def __str__(self):
        return self.username
    
