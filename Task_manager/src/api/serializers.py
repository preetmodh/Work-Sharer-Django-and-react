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


class GetUserserializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('email','username','date_joined','twitter_name','avatar_url')

    def get_avatar_url(self, User):
        request = self.context.get('request')
        avatar_url = User.avatar.url
        return request.build_absolute_uri(avatar_url)


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_List
        fields = '__all__'

        
