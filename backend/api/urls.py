from django.urls import path, include
from rest_framework.routers import SimpleRouter

from users.views import UserViewSet, LoginViewSet, LogoutViewSet

from . import views

router = SimpleRouter()

router.register('categories', views.CategoriesViewSet)
router.register('courses', views.CoursesViewSet)
router.register('lessons', views.LessonsViewSet)

router.register('users', UserViewSet, basename='users')
router.register('auth', LoginViewSet, basename='auth')
router.register('logout', LogoutViewSet, basename='logout')

urlpatterns = [
    path('', include(router.urls)),
]