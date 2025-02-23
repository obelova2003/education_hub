from django.db import models

from user.models import Users


class Categories(models.Model):
    category_name = models.CharField(max_length=100, 
                                     verbose_name="Название")
    category_description = models.TextField(max_length=250, 
                                            verbose_name="Описание")

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.category_name


LEVEL = (
    ('Для начинающих', 'Для начинающих'),
    ('Для продолжающих', 'Для продолжающих'),
    ('Для продвинутых', 'Для продвинутых'),
    ('Для всех', 'Для всех'),
)


class Courses(models.Model):
    course_name = models.CharField(max_length=255, 
                                   unique=True,
                                   null=False, 
                                   blank=False, 
                                   verbose_name="Название курса")
    course_duration = models.PositiveIntegerField(null=False, 
                                          blank=False, 
                                          default=1, 
                                          verbose_name="Длительность курса (мес.)")
    course_date_of_start = models.DateField(null=False, 
                                            blank=False,
                                            verbose_name="Дата начала курса")
    course_price = models.FloatField(null=False, 
                                     blank=False, 
                                     default=1, 
                                     verbose_name="Цена курса (в руб.)")
    course_description = models.TextField(null=False, 
                                          blank=False, 
                                          max_length=750, 
                                          verbose_name="Описание курса")
    course_teacher = models.ForeignKey(Users,
                                       on_delete=models.CASCADE,
                                       null=False,
                                       blank=False,
                                       verbose_name="Преподаватель курса")
    course_for_who = models.CharField(max_length=150, 
                                      choices=LEVEL, 
                                      null=False, 
                                      blank=False, 
                                      verbose_name="Для кого")
    course_categories = models.ManyToManyField(Categories, 
                                               verbose_name='Категории')
    course_picture = models.ImageField(upload_to='course_picture/', null=True, blank=True,
                                       verbose_name="Картинка курса")

    def __str__(self):
        return f"{self.course_name}"

    class Meta:
        verbose_name = "Курс"
        verbose_name_plural = "Курсы"


class Lessons(models.Model):
    lesson_name = models.CharField(max_length=255, null=False, blank=False,
                                   verbose_name="Название урока")
    lesson_course = models.ForeignKey(
        to=Courses,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
        verbose_name="Курс"
    )
    lesson_number = models.PositiveIntegerField(default=0,
        verbose_name="Номер урока в курсе")
    lesson_description = models.TextField(
        max_length=300, verbose_name="Описание урока"
    )
    video_file = models.FileField(null=True, blank=True, upload_to='video_materials/', verbose_name="Видеоматериал к уроку")
    text_file = models.FileField(null=True, blank=True, upload_to='text_materials/', verbose_name="Текстовый файл к уроку")
    

    def __str__(self):
        return f"{self.lesson_number}. {self.lesson_name}"
    

    class Meta:
        verbose_name = "Урок"
        verbose_name_plural = "Уроки"
        ordering = ["lesson_number"]



