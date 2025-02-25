from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from course.models import Categories, Courses, Lessons
from forum.models import Thread, Post, Reply
from api.filters import CoursesFilter, LessonsFilter

from . import serializers


class CategoriesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = serializers.CategoriesSerializer
    pagination_class = None


class ThreadViewSet(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    serializer_class = serializers.ThreadSerializer
    pagination_class = None


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer
    pagination_class = None


class ReplyViewSet(viewsets.ModelViewSet):
    queryset = Reply.objects.all()
    serializer_class = serializers.ReplySerializer
    pagination_class = None


class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = serializers.CoursesSerializer
    pagination_class = None

    filter_backends = [DjangoFilterBackend]
    filterset_class = CoursesFilter


class LessonsViewSet(viewsets.ModelViewSet):
    queryset = Lessons.objects.all()
    serializer_class = serializers.LessonsSerializer
    pagination_class = None

    filter_backends = [DjangoFilterBackend]
    filterset_class = LessonsFilter
