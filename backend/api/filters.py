import django_filters
from django_filters.rest_framework import FilterSet, filters

from course.models import Courses, Categories, Lessons


class CoursesFilter(FilterSet):
    course_categories = django_filters.ModelMultipleChoiceFilter(field_name='course_categories__category_name',
                                                    to_field_name='category_name',
                                                    queryset=Categories.objects.all())
    class Meta:
        model = Courses
        fields = ['course_categories']



class LessonsFilter(FilterSet):
    lesson_course = django_filters.ModelMultipleChoiceFilter(field_name='lesson_course__id',
                                                    to_field_name='id',
                                                    queryset=Courses.objects.all())
    class Meta:
        model = Lessons
        fields = ['lesson_course']