from .models import Users
from rest_framework import serializers

from rest_framework_simplejwt.tokens import RefreshToken

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class UsersSerializer(serializers.ModelSerializer):
    is_teacher = serializers.SerializerMethodField(method_name = 'get_is_teacher')
    is_student = serializers.SerializerMethodField(method_name = 'get_is_student')


    class Meta:
        model = Users
        fields = ('username', 'first_name', 'last_name', 'middle_name', 'email', 'role', 'telephone', 'profile_photo',
                  'is_teacher', 'is_student')
        
    def get_is_teacher(self, obj):
        return obj.is_teacher

    def get_is_student(self, obj):
        return obj.is_student


class TeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = '__all__'