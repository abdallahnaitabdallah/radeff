from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path("admin/", admin.site.urls),
    path("api/",include('accounts.urls'))
]

#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
