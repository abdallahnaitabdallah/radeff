from django.urls import path

from .views import (AllUsersAPIView, ReclamationDetailAPIView,
                    ReclamationListAPIView, ReclamationListCreateAPIView,
                    ReclamationRetrieveUpdateDestroyAPIView,
                    ReclameurListCreateAPIView, ServiceListCreateAPIView,
                    ServiceRetrieveUpdateDestroyAPIView,
                    TauxReclamationAPIView, TechniciansDetailAPIView,
                    TechniciansListAPIView, TechnicienReclamationListView,
                    UnassignedTechniciansAPIView,
                    UserAccountRetrieveUpdateDestroyAPIView, UserViewSet)

urlpatterns = [
    
    path('auth/', UserViewSet.as_view({'post': 'create'}), name='useraccount-list'),

    path('all-users/', AllUsersAPIView.as_view(), name='all-users'),
    path('users/<int:pk>/', UserAccountRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'),

    path('technicians/', TechniciansListAPIView.as_view(), name='technicians-list'),
    path('technician/<int:pk>/', TechniciansDetailAPIView.as_view(), name='technicians-list'),

    path('technicien-reclamations/<int:pk>/',TechnicienReclamationListView.as_view(),name='technicien-reclamations'),

    # Reclameur endpoints
    path('reclameurs/', ReclameurListCreateAPIView.as_view(), name='reclameur-list-create'),

    # Service endpoints
    path('services/', ServiceListCreateAPIView.as_view(), name='service-list-create'),
    path('services/<int:pk>/', ServiceRetrieveUpdateDestroyAPIView.as_view(), name='service-retrieve-update-destroy'),

    # Reclamation endpoints
    path('reclamations/', ReclamationListCreateAPIView.as_view(), name='reclamation-list-create'),
    path('reclamations/<int:pk>/', ReclamationRetrieveUpdateDestroyAPIView.as_view(), name='reclamation-retrieve-update-destroy'),

    # Unassigned Technicians endpoint
    path('unassigned-technicians/', UnassignedTechniciansAPIView.as_view(), name='unassigned-technicians'),

    # Reclamation List (with reclameur and technician details)
    path('reclamation-list/', ReclamationListAPIView.as_view(), name='reclamation-list'),

    # Reclamation Detail
    path('reclamation-detail/<int:pk>/', ReclamationDetailAPIView.as_view(), name='reclamation-detail'),

    # Taux Reclamation
    path('taux-reclamation/', TauxReclamationAPIView.as_view(), name='taux-reclamation'),
]
