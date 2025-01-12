from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
                                   
from api.models import Categories, Courses, Lessons, VideoMaterial, TextMaterial


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'


class VideoMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoMaterial
        fields = '__all__'


class TextMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextMaterial
        fields = '__all__'


class CoursesSerializer(serializers.ModelSerializer):
    price_for_month = SerializerMethodField()
    course_categories = CategoriesSerializer(many=True)

    class Meta:
        model = Courses
        fields = ('id', 'course_name', 'course_duration', 'course_price', 'price_for_month', 'course_description', 'course_for_who', 'course_categories')

    def get_price_for_month(self, obj):
        price_for_month = int(obj.course_price / obj.course_duration)
        return price_for_month


class LessonsSerializer(serializers.ModelSerializer):
    video_file = VideoMaterialSerializer()
    text_file = TextMaterialSerializer()
    class Meta:
        model = Lessons
        fields = ('id', 'lesson_name', 'lesson_description', 'lesson_course', 'video_file', 'text_file')
