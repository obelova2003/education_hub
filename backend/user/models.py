from django.db import models
from django.contrib.auth.models import AbstractUser

from user.validators import validate_password, validate_phone_number, validate_username 


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
    username = models.CharField(validators=(validate_username,),
                                max_length=150,
                                unique=True,
                                verbose_name='Логин')
    date_of_birth = models.DateField(null=True, 
                                    blank=True,
                                    verbose_name="Дата рождения")
    email = models.EmailField(max_length=254, 
                              unique=True,
                              verbose_name='Почта')
    telephone = models.CharField(validators=[validate_phone_number],
                                max_length=11, 
                                blank=True, 
                                null=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', 
                                      blank=True, 
                                      null=True)
    role = models.CharField(max_length=10, 
                            choices=ROLES)
    password = models.CharField(max_length=128, 
                                validators=[validate_password])
    

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