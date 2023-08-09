from django.contrib.auth import get_user_model
from django.db.models import Count
from djoser.views import UserViewSet as DjoserUserViewSet
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Reclamation, Reclameur, Service, UserAccount
from .permissions import AllowAnyPost
from .serializers import (ReclamationGetSerializer, ReclamationSerializer,
                          ReclameurSerializer, ServiceSerializer,
                          UserCreateSerializer, UserUpdateSerializer)


class UserViewSet(DjoserUserViewSet):
    serializer_class = UserCreateSerializer

User = get_user_model()
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Reclamation, UserAccount
from .serializers import ReclamationSerializer


class TechnicienReclamationListView(APIView):
    def get(self, request, pk):
        # Get the UserAccount instance for the specific technicien_id
        try:
            technicien = UserAccount.objects.get(pk=pk, role='Technicien')
        except UserAccount.DoesNotExist:
            return Response({"error": "Technicien not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get all the reclamations assigned to the specific technicien
        reclamations = Reclamation.objects.filter(technician=technicien)

        serializer = ReclamationSerializer(reclamations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TechniciansListAPIView(APIView):
    def get(self, request):
        technicians = User.objects.filter(role='Technicien')
        serializer = UserCreateSerializer(technicians, many=True)
        return Response(serializer.data)

class TechniciansDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            technician = User.objects.get(role='Technicien', pk=pk)
            serializer = UserCreateSerializer(technician)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"error": "Technician not found."}, status=404)


class AllUsersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Check if the user making the request is an admin
        users = User.objects.all()
        serializer = UserCreateSerializer(users, many=True)
        return Response(serializer.data)


class UserAccountRetrieveUpdateDestroyAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return UserAccount.objects.get(pk=pk)
        except UserAccount.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = UserCreateSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = self.get_object(pk)
        serializer = UserUpdateSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class ReclameurListCreateAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        reclameur = Reclameur.objects.all()
        serializer = ReclameurSerializer(reclameur, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReclameurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServiceListCreateAPIView(APIView):

    def get(self, request):
        service = Service.objects.all()
        serializer = ServiceSerializer(service, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ServiceRetrieveUpdateDestroyAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Service.objects.get(pk=pk)
        except Service.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        service = self.get_object(pk)
        serializer = ServiceSerializer(service)
        return Response(serializer.data)

    def put(self, request, pk):
        service = self.get_object(pk)
        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        service = self.get_object(pk)
        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class ReclamationListCreateAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        reclamation = Reclamation.objects.all()
        serializer = ReclamationGetSerializer(reclamation, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)  # Print the request data for debugging

        serializer = ReclamationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReclamationRetrieveUpdateDestroyAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Reclamation.objects.get(pk=pk)
        except Service.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        reclamation = self.get_object(pk)
        serializer = ReclamationGetSerializer(reclamation)
        return Response(serializer.data)

    def put(self, request, pk):
        reclamation = self.get_object(pk)
        serializer = ReclamationSerializer(reclamation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        reclamation = self.get_object(pk)
        reclamation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UnassignedTechniciansAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        technicians = UserAccount.objects.filter(role='Technicien', assigned_reclamations__isnull=True)
        serializer = UserCreateSerializer(technicians, many=True)
        return Response(serializer.data)

class ReclamationListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reclamations = Reclamation.objects.select_related('reclameur', 'technician')
        serializer = ReclamationSerializer(reclamations, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReclamationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReclamationDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Reclamation.objects.select_related('reclameur', 'technician').get(pk=pk)
        except Reclamation.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        reclamation = self.get_object(pk)
        serializer = ReclamationSerializer(reclamation)
        return Response(serializer.data)

    def put(self, request, pk):
        reclamation = self.get_object(pk)
        serializer = ReclamationSerializer(reclamation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        reclamation = self.get_object(pk)
        reclamation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TauxReclamationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the count of reclamations created per day
        reclamations_per_day = Reclamation.objects.values('date_saisie').annotate(count=Count('id'))

        # Calculate the total number of reclamations
        total_reclamations = Reclamation.objects.count()

        # Calculate the total number of days
        total_days = len(reclamations_per_day)

        # Calculate the average percentage of reclamations created per day
        average_taux_reclamation_per_day = (total_reclamations / total_days) * 100

        return Response(average_taux_reclamation_per_day)