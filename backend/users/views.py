from datetime import time
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Users
from users import serializers
from rest_framework.decorators import action
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.exceptions import TokenError

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = serializers.UsersSerializer

    http_method_names = ['get', 'post']

    def hash_password(self, data):
        password = data.get('password')
        data['password'] = make_password(password)
        return data

    def get_serializer_class(self):        
        if self.action == "teacher_create":
            return serializers.TeacherSerializer
        elif self.action == "student_create":
            return serializers.StudentSerializer
        else:
            return serializers.UsersSerializer

    @action(
        methods=['POST',],
        detail=False,
    )
    def teacher_create(self, request):
        data = self.hash_password(request.data.copy())
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

    @action(
        methods=['POST',],
        detail=False,
    )
    def student_create(self, request):
        data = self.hash_password(request.data.copy())
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.LoginSerializer

    @action(
        methods=['POST',],
        detail=False,
        permission_classes=(AllowAny,)
    )
    def login(self, request):
        serializer = serializers.LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = Users.objects.get(username=serializer.validated_data.get('username'))
        except Users.DoesNotExist as e:
            raise serializers.ValidationError(str(e))
        refresh = RefreshToken.for_user(user)
        token_data={}
        token_data['id'] = user.id
        token_data['refresh'] = str(refresh)
        token_data['access'] = str(refresh.access_token)
        return Response(token_data, status=status.HTTP_200_OK)
        

class LogoutViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.LogoutSerializer

    @action(
        methods=['POST'],
        detail=False,
        permission_classes=(IsAuthenticated,)
    )
    def logout(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Токен успешно аннулирован"}, status=status.HTTP_200_OK)
        except TokenError as e:
            return Response({"error": "Недействительный токен"}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response({"error": "Refresh-токен не предоставлен"}, status=status.HTTP_400_BAD_REQUEST)
    
