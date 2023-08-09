from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models


class UserAccountManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(username=username, **extra_fields)

        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('Admin', 'Admin'),
        ('Technicien', 'Technicien'),
        ('Responsable', 'Responsable'),
    )
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default='Technicien')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name','role']

    def get_full_name(self):
        return self.first_name + self.last_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.username

class Reclameur(models.Model):
    adresse = models.CharField(max_length=254)
    cin = models.CharField(max_length=20)
    nom = models.CharField(max_length=254)
    prenom = models.CharField(max_length=254)
    telephone = models.CharField(max_length=20) 
    def __str__(self):
        return f"{self.prenom} {self.nom}"

class Service(models.Model):
    nom = models.CharField(max_length=254)

    def __str__(self):
        return self.nom

class Reclamation(models.Model):
    STATUS_CHOICES = (
        ('pending', 'pending'),
        ('affected', 'affected'),
        ('closed', 'closed'),
    )
    date_affectation = models.DateField(auto_now=True,null=True,blank=True)
    date_saisie = models.DateField(auto_now_add=True)
    description = models.TextField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    reclameur = models.ForeignKey(Reclameur,on_delete=models.CASCADE,null=False,blank=False)
    service = models.ForeignKey(Service,on_delete=models.CASCADE,null=True,blank=True)
    technician = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_reclamations')

    def __str__(self):
        return f"Reclamation {self.id}"
