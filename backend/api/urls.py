from django.urls import path, include
from rest_framework.routers import SimpleRouter


from . import views

router = SimpleRouter()

router.register('categories', views.CategoriesViewSet)
router.register('courses', views.CoursesViewSet)
router.register('lessons', views.LessonsViewSet)
router.register('threads', views.ThreadViewSet)
router.register('posts', views.PostViewSet)
router.register('replies', views.ReplyViewSet)
router.register('materials', views.MaterialsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]