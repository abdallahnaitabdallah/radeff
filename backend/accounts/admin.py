from django.contrib import admin
from .models import UserAccount,Reclamation,Reclameur,Service
# Register your models here.
admin.site.register(UserAccount)
admin.site.register(Reclameur)
admin.site.register(Reclamation)
admin.site.register(Service)