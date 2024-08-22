from django.test import TestCase
from rest_framework.test import APIClient, APITestCase, force_authenticate
from rest_framework import status
from django.contrib.auth.models import User
from .models import Task

# Create your tests here.
class TaskModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.task = Task.objects.create(title='Test', description='Test case description', user=self.user)
    
    def test_task_creation(self):
        self.assertEqual(self.task.title, "Test")
        self.assertEqual(self.task.description, "Test case description")
        
class TaskAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(self.user)
        self.task = Task.objects.create(title='Test', description='Test case description', user=self.user)
    
    def test_get_task_list(self):
        response = self.client.get('/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Test', response.data[0]['title'])
        
    def task_create_task(self):
        force_authenticate(user=self.user)
        data = {'title': 'API Task', 'description': 'API test case description'}
        response = self.client.post('/tasks/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)