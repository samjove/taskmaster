from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, UserRegistrationView
from django.urls import path, include

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register', UserRegistrationView.as_view(), name='register')
]
