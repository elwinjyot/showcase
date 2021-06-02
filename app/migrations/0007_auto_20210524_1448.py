# Generated by Django 3.2.3 on 2021-05-24 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20210524_1403'),
        ('app', '0006_auto_20210524_1441'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='BlogLikes', to='authentication.Showcaser'),
        ),
        migrations.AlterField(
            model_name='product',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='ProductLikes', to='authentication.Showcaser'),
        ),
    ]
