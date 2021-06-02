# Generated by Django 3.2.3 on 2021-05-24 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20210524_1403'),
        ('app', '0005_auto_20210524_1403'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='likes',
        ),
        migrations.AddField(
            model_name='blog',
            name='likes',
            field=models.ManyToManyField(related_name='BlogLikes', to='authentication.Showcaser'),
        ),
        migrations.RemoveField(
            model_name='product',
            name='likes',
        ),
        migrations.AddField(
            model_name='product',
            name='likes',
            field=models.ManyToManyField(related_name='ProductLikes', to='authentication.Showcaser'),
        ),
    ]
