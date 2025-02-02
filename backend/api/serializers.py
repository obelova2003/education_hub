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
    price_for_month = serializers.SerializerMethodField()
    course_categories = CategoriesSerializer(many=True)
    amount_of_lessons = serializers.SerializerMethodField()

    class Meta:
        model = Courses
        fields = ('id', 'course_name', 'course_duration', 'amount_of_lessons', 'course_price', 'price_for_month', 'course_description', 'course_for_who', 'course_categories', 'course_picture')

    def get_price_for_month(self, obj):
        price_for_month = int(obj.course_price / obj.course_duration)
        return price_for_month
    
    def get_amount_of_lessons(self, obj):
        amount = Lessons.objects.filter(lesson_course=obj.id)
        return len(amount)

    def create(self, validated_data):
        categories_data = validated_data.pop('course_categories', [])
        
        course = Courses.objects.create(**validated_data)
        
        for category_data in categories_data:
            category, _ = Categories.objects.get_or_create(**category_data)
            course.course_categories.add(category)

        return course

    def update(self, instance, validated_data):
        categories_data = validated_data.pop('course_categories', [])
        instance.course_name = validated_data.get('course_name', instance.course_name)
        instance.course_duration = validated_data.get('course_duration', instance.course_duration)
        instance.course_price = validated_data.get('course_price', instance.course_price)
        instance.course_description = validated_data.get('course_description', instance.course_description)
        instance.course_for_who = validated_data.get('course_for_who', instance.course_for_who)
        instance.course_picture = validated_data.get('course_picture', instance.course_picture)
        instance.save()
        instance.course_categories.clear()
        for category_data in categories_data:
            category, _ = Categories.objects.get_or_create(**category_data)
            instance.course_categories.add(category)

        return instance


class LessonsSerializer(serializers.ModelSerializer):
    video_file = VideoMaterialSerializer(read_only=True)
    text_file = TextMaterialSerializer(read_only=True)

    class Meta:
        model = Lessons
        fields = ('id', 'lesson_number', 'lesson_name', 'lesson_description', 'lesson_course', 'video_file', 'text_file')
