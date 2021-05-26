from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime


class User(AbstractUser):
    email = models.EmailField(
        unique=True,
        max_length=254,
    )
    username = models.CharField(max_length=20,unique=True,null=True)
    

class Task_List(models.Model):
    task_doer = models.ForeignKey(User, on_delete=models.CASCADE , related_name="Doer")
    task_title = models.CharField(max_length=20, null=False)
    task_description = models.CharField(max_length=700,null=False)
    task_completed = models.BooleanField(default=False)
    task_created = models.DateTimeField(auto_now_add=True)
    task_duedate = models.DateTimeField(default=datetime.now())

    def __str__(self):
	    return self.task_title
    
    