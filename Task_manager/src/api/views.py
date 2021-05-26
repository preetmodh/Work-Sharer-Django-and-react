from django.shortcuts import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import User,Task_List
from .serializers import UserSerializer,TaskSerializer


#to create a user
class CreateUserAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



# to handle creation and display of task list
class TaskAPIView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    serializer_class = TaskSerializer
    def get_queryset(self):
        return Task_List.objects.filter(task_doer=self.request.user).order_by('task_duedate')
    
# to handle single taks

class SingleTaskAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    serializer_class = TaskSerializer
    lookup_url_kwarg = 'task_id'
    queryset = Task_List.objects.all()
