from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    from drf_spectacular.views import (
        SpectacularAPIView,
        SpectacularRedocView,
        SpectacularSwaggerView,
    )

    urlpatterns.extend(
        [
            path(
                "swagger/",
                SpectacularSwaggerView.as_view(url_name="schema"),
                name="swagger-ui",
            ),
            path("swagger/schema/", SpectacularAPIView.as_view(), name="schema"),
            path(
                "swagger/redoc/",
                SpectacularRedocView.as_view(url_name="schema"),
                name="redoc",
            ),
        ]
    )