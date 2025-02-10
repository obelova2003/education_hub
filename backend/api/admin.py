from django.contrib import admin

from api.models import Categories, Courses, Lessons, VideoMaterial, TextMaterial

admin.site.register(Categories)
admin.site.register(Courses)
admin.site.register(Lessons)
admin.site.register(VideoMaterial)
admin.site.register(TextMaterial)