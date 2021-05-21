from django.contrib import admin
from .models import User,Task_List
# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    exclude = ('password','groups','first_name','last_name',)

@admin.register(Task_List)
class UserAdmin(admin.ModelAdmin):
    pass