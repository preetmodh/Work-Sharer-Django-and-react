# Generated by Django 3.2.3 on 2021-05-26 11:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20210526_1627'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task_list',
            name='task_duedate',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 26, 16, 32, 57, 214150)),
        ),
    ]
