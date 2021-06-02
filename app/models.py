from django.db import models
from django.contrib.auth.models import User
from authentication.models import Showcaser
# Create your models here.


class Blog(models.Model):
    CAT = (
        ("Blog", "Blog"),
        ("Product", "Product")
    )
    category = models.CharField(
        max_length=80, null=False, blank=False, choices=CAT, default="Blog")
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=80, blank=False, null=False)
    body = models.TextField()
    likes = models.ManyToManyField(
        User, related_name='BlogLikes', blank=True)
    posted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.owner.first_name + " - " + self.title


class Product(models.Model):
    CAT = (
        ("Blog", "Blog"),
        ("Product", "Product")
    )
    category = models.CharField(
        max_length=80, null=False, blank=False, choices=CAT, default="Product")
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(
        User, related_name='ProductLikes', blank=True)
    productName = models.CharField(
        max_length=60, blank=False, null=False, verbose_name="Product Name")
    price = models.FloatField(verbose_name="Price")
    productDescription = models.TextField(null=True, blank=True)
    productImage = models.ImageField(
        verbose_name="Image", upload_to='products', blank=True)
    posted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.owner.first_name + " - " + self.productName
