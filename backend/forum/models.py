from django.db import models
from user.models import Users

class Thread(models.Model):
    title = models.CharField(max_length=255, 
                             unique=True, 
                             null=False, 
                             blank=False, 
                             verbose_name='Название темы')
    content = models.TextField(max_length=1000, 
                               null=False,
                               blank=False, 
                               verbose_name='Текст темы')
    author = models.ForeignKey(Users, 
                               on_delete=models.CASCADE, 
                               null=False, 
                               blank=False, 
                               verbose_name='Автор темы')
    created_at = models.DateTimeField(auto_now_add=True, 
                                      verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, 
                                      null=True, 
                                      blank=True, 
                                      verbose_name='Обновлено')

    class Meta:
        verbose_name = 'Тема'
        verbose_name_plural = 'Темы'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.title} от {self.created_at}'


class Post(models.Model):
    content = models.TextField(max_length=1000, 
                               null=False, 
                               blank=False, 
                               verbose_name='Текст ответа')
    author = models.ForeignKey(Users, 
                               on_delete=models.CASCADE, 
                               null=False, 
                               blank=False, 
                               verbose_name='Автор ответа')
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='posts', verbose_name='Тема')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')

    class Meta:
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'
        ordering = ['-created_at']

    def __str__(self):
        return f'Ответ {self.id} от {self.author.username} на пост {self.thread}'


class Reply(models.Model):
    content = models.TextField(max_length=1000, 
                               verbose_name='Текст ответа')
    author = models.ForeignKey(Users, 
                               on_delete=models.CASCADE, 
                               verbose_name='Автор ответа')
    post = models.ForeignKey(Post, 
                             on_delete=models.CASCADE, 
                             related_name='replies',
                             verbose_name='Ответ на пост')
    created_at = models.DateTimeField(auto_now_add=True, 
                                      verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, 
                                      verbose_name='Обновлено')

    class Meta:
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'
        ordering = ['-created_at']

    def __str__(self):
        return f'Ответ {self.id} от {self.author.username} на пост {self.post.id}'