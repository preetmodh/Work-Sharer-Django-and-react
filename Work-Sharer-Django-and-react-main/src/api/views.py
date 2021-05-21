from django.shortcuts import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import User,Task_List
from .serializers import UserSerializer,GetUserserializer,TaskSerializer

# Create your views here.
def index(request):
    return HttpResponse("hello world")

 
#to create a user
class CreateUserAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#to get user profile data
class GetUserAPIView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = User.objects.filter(username=self.request.user)
        serializer = GetUserserializer(queryset, many=True, context={"request":request})
        authentication_classes = [TokenAuthentication, ]
        permission_classes = [IsAuthenticated, ]
        return Response(serializer.data, status=status.HTTP_200_OK)

# to handle creation and display of task list
class TaskAPIView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    serializer_class = TaskSerializer
    def get_queryset(self):
        return Task_List.objects.filter(task_doer=self.request.user,task_accepted=self.request.GET.get('accepted', True)).order_by('task_duedate')
    
# to handle single taks

class SingleTaskAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    serializer_class = TaskSerializer
    lookup_url_kwarg = 'task_id'
    queryset = Task_List.objects.all()
