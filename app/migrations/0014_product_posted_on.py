# Generated by Django 3.2.3 on 2021-05-25 05:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_alter_product_productimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='posted_on',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]