from rest_framework import permissions

class TeacherRole(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.role == 'teacher'
    

class StudentRole(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.role == 'student'