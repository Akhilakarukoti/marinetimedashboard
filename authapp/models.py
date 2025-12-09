from django.db import models
from django.contrib.auth.models import User

ROLE_CHOICES = (('Operator','Operator'),('Analyst','Analyst'),('Admin','Admin'))

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Operator')

    def __str__(self):
        return f"{self.user.username} - {self.role}"
