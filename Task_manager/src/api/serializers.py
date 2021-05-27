from rest_framework import serializers
from .models import User,Task_List
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ( 'email','username','password')
    def create(self, validated_data):
        User = super(UserSerializer, self).create(validated_data)
        User.set_password(validated_data['password'])
        User.save()
        Token.objects.create(user=User)
        return User


class TaskSerializer(serializers.ModelSerializer):
    task_duedate=serializers.DateField(format="%d-%m-%Y",input_formats=['%d-%m-%Y',])
    class Meta:
        model = Task_List
        fields = fields = ['id','task_title', 'task_description', 'task_completed', 'task_duedate']

        
