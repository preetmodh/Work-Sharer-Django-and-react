# Generated by Django 3.1.7 on 2021-04-07 10:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20210407_1615'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task_list',
            name='task_description',
            field=models.CharField(max_length=700),
        ),
        migrations.AlterField(
            model_name='task_list',
            name='task_duedate',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 7, 16, 18, 0, 494732)),
        ),
        migrations.AlterField(
            model_name='task_list',
            name='task_title',
            field=models.CharField(max_length=20),
        ),
    ]
