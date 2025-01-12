from django.db import models


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
    ('new', 'Начинающий'),
    ('middle', 'Средний'),
    ('pro', 'Продвинутый'),)


class Courses(models.Model):
    course_name = models.CharField(max_length=255,
                                   verbose_name="Название курса")
    
    course_duration = models.IntegerField(null=False, 
                                          blank=False, 
                                          default=1, 
                                          verbose_name="Длительность курса")
    
    course_price = models.FloatField(null=False, 
                                     blank=False, 
                                     default=1, 
                                     verbose_name="Цена курса")
    
    course_description = models.TextField(null=False, 
                                          blank=False, 
                                          max_length=250, 
                                          verbose_name="Описание курса")
    
    course_for_who = models.CharField(max_length=150, 
                                      choices=LEVEL, 
                                      null=False, 
                                      blank=False, 
                                      verbose_name="Для кого")
    
    course_categories = models.ManyToManyField(Categories, 
                                               verbose_name='Категории')

    def __str__(self):
        return f"{self.course_name}"

    class Meta:
        verbose_name = "Курс"
        verbose_name_plural = "Курсы"


class VideoMaterial(models.Model):
    video_name = models.CharField(max_length=255,
                                  verbose_name="Название видео")
    video_file = models.FileField(upload_to='video_materials/',
                                  verbose_name="Видеоматериал к уроку")
    video_description = models.TextField(max_length=1000,
                                         verbose_name="Описание видео")

    def __str__(self):
        return f"{self.video_name}"

    class Meta:
        verbose_name = "Видеоматериал"
        verbose_name_plural = "Видеоматериалы"


class TextMaterial(models.Model):
    text_name = models.CharField(max_length=255,
                                 verbose_name="Название текста")
    text_field = models.TextField(max_length=10000,
                                 verbose_name="Текстовый материал к уроку")
    text_file = models.FileField(null=True, blank=True, upload_to='text_materials/',
                                  verbose_name="Текстовый файл к уроку")
    text_description = models.TextField(max_length=1000,
                                        verbose_name="Описание к тексту")

    def __str__(self):
        return f"{self.text_name}"

    class Meta:
        verbose_name = "Текстовый материал к уроку"
        verbose_name_plural = "Текстовые материалы к уроку"



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
    id = models.PositiveIntegerField(primary_key=True,
        verbose_name="Номер урока в курсе")
    lesson_description = models.TextField(
        max_length=300, verbose_name="Описание урока"
    )
    video_file = models.ForeignKey(
        to=VideoMaterial,
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
        verbose_name="Видеоматериал к уроку")
    
    text_file = models.ForeignKey(
        to=TextMaterial,
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
        verbose_name="Текстовый материал к уроку")

    def __str__(self):
        return f"{self.id}. {self.lesson_name}"

    class Meta:
        verbose_name = "Урок"
        verbose_name_plural = "Уроки"


# class Student(models.Model):
#     student_first_name = models.CharField(null=False, 
#                                           blank=False,
#                                           max_length=250,
#                                           verbose_name="Имя студента")
#     student_second_name = models.CharField(null=True, 
#                                           blank=True,
#                                           max_length=250,
#                                           verbose_name="Отчество студента")
#     student_last_name = models.CharField(null=False, 
#                                           blank=False,
#                                           max_length=250,
#                                           verbose_name="Фамилия студента")
#     student_date_of_birth = models.DateField(null=False, 
#                                           blank=False,
#                                           verbose_name="Дата рождения студента")
#     student_email = models.EmailField(max_length=250, unique=True, verbose_name="Почта студента")