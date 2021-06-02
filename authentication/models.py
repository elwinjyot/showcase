from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Showcaser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    followers = models.ManyToManyField(
        User, related_name="following", verbose_name="Followers", blank=True)
    following = models.ManyToManyField(
        User, related_name="follower", verbose_name="Following", blank=True)
    profilePic = models.ImageField(upload_to="profile/", blank=True)
    bio = models.CharField(
        max_length=800, verbose_name="Bio", null=False, blank=True)
    verified = models.BooleanField(verbose_name="Verified", default=False)

    def __str__(self) -> str:
        return self.user.first_name
