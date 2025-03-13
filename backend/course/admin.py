from django.contrib import admin

from course.models import Categories, Courses, Lessons, Materials

admin.site.register(Categories)
admin.site.register(Courses)
admin.site.register(Lessons)
admin.site.register(Materials)