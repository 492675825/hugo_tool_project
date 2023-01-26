from rest_framework import serializers
from apps.nonFarmApp import models

class NonFarmDataSerializer(serializers.ModelSerializer):
    """非农数据"""
    class Meta:
        model = models.non_farm
        fields = "__all__"
