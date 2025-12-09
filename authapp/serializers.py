from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=['Operator','Analyst','Admin'], default='Operator')
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('username','email','password','first_name','last_name','role')

    def create(self, validated_data):
        role = validated_data.pop('role','Operator')
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        Profile.objects.create(user=user, role=role)
        return user

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id','username','email','first_name','last_name','role')

    def get_role(self, obj):
        return obj.profile.role if hasattr(obj, 'profile') else None
