from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from .models import Reclamation, Reclameur, Service

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES)

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'password','role')
 
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name','role')

    def update(self, instance, validated_data):
        # Exclude the "password" field from the validated s
        validated_data.pop('password', None)
        
        # Perform the default update operation
        return super().update(instance, validated_data)
class ReclameurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclameur
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ReclamationGetSerializer(serializers.ModelSerializer):
    reclameur = ReclameurSerializer()
    technician = UserCreateSerializer()
    service = ServiceSerializer()
    class Meta:
        model = Reclamation
        fields = '__all__'

class ReclamationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamation
        fields = '__all__'
class TauxReclamationSerializer(serializers.Serializer):
    date = serializers.DateField()
    percentage = serializers.FloatField()