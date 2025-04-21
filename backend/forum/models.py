from django.db import models
from user.models import Users

class Post(models.Model):
    post_title = models.CharField(max_length=255, 
                             unique=True, 
                             null=False, 
                             blank=False, 
                             verbose_name='Заголовок поста')
    post_content = models.TextField(max_length=1000, 
                               null=False,
                               blank=False, 
                               verbose_name='Текст поста')
    post_author = models.ForeignKey(Users, 
                               on_delete=models.CASCADE, 
                               null=False, 
                               blank=False, 
                               verbose_name='Автор поста')
    post_created_at = models.DateTimeField(auto_now_add=True, 
                                      verbose_name='Создано')
    class Meta:
        verbose_name = 'Пост'
        verbose_name_plural = 'Посты'
        ordering = ['-post_created_at']

    def __str__(self):
        return f'{self.post_title} от {self.post_created_at}'


class Comment(models.Model):
    comment_content = models.TextField(max_length=1000, 
                               null=False, 
                               blank=False, 
                               verbose_name='Текст комментария')
    comment_author = models.ForeignKey(Users, 
                               on_delete=models.CASCADE, 
                               null=False, 
                               blank=False, 
                               verbose_name='Автор комментария')
    comment_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='posts', verbose_name='Пост, к которому комментарий')
    comment_created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
        ordering = ['-comment_created_at']

    def __str__(self):
        return f'Комментарий {self.id} от {self.comment_author.username} к посту {self.comment_post}'