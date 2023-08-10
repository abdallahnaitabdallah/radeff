# Radeff

Radeff App is a full-stack application that offers a platform for users to request reclamation services. The backend is built using Django REST Framework with authentication handled by Djoser. The frontend consists of a web application developed in React.js, and a mobile app developed in React Native.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Backend (Django REST Framework)](#backend-django-rest-framework)
- [Frontend (React.js)](#frontend-reactjs)
- [Mobile App (React Native)](#mobile-app-react-native)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Radeff App aims to connect users in need of reclamation services with service providers. Users can create service requests, view available providers, and track the progress of their requests. Service providers can access requests, accept or reject them, and update their status.

## Features

- User registration and authentication
- Service request creation, editing, and deletion
- Provider listing and filtering
- Real-time updates on request status
- Cross-platform mobile app for users and providers

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Ensure you have the following software installed:

- Python (3.x)
- Node.js and npm
- Django
- Django REST Framework
- Djoser
- React.js
- React Native
- ...

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/reclamation-service-app.git

Set up the backend:
cd backend/
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Set up the frontend:
cd frontend/
npm install
npm start

Set up the React Native mobile app:
cd native/
npm install
npx expo start

Backend (Django REST Framework)
The backend provides the API for managing users, service requests, and providers. The api app contains the necessary endpoints, serializers, and views.

Frontend (React.js)
The React.js frontend includes components for user registration, login, request creation, and request tracking. It communicates with the backend API to retrieve and update data.

Mobile App (React Native)
The React Native mobile app offers a seamless user experience for both service requesters and providers. It leverages native device features while interacting with the backend API for data synchronization.
