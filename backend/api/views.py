from django.shortcuts import render

from rest_framework import viewsets

from api.models import Categories, Courses, Lessons, VideoMaterial, TextMaterial

from . import serializers


class CategoriesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = serializers.CategoriesSerializer
    pagination_class = None


class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = serializers.CoursesSerializer
    pagination_class = None


class LessonsViewSet(viewsets.ModelViewSet):
    queryset = Lessons.objects.all()
    serializer_class = serializers.LessonsSerializer
    pagination_class = None


class VideoMaterialViewSet(viewsets.ModelViewSet):
    queryset = VideoMaterial.objects.all()
    serializer_class = serializers.VideoMaterialSerializer
    pagination_class = None


class TextMaterialViewSet(viewsets.ModelViewSet):
    queryset = TextMaterial.objects.all()
    serializer_class = serializers.TextMaterialSerializer
    pagination_class = None