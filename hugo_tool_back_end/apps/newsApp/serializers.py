from rest_framework import serializers
from apps.newsApp import models

class NewsAllSerializer(serializers.ModelSerializer):
    """新闻合并"""
    class Meta:
        model = models.cctv_union_news
        fields = "__all__"

