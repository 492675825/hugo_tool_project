from django.shortcuts import render

from django.views.generic.base import View
from apps.nonFarmApp import models
from apps.nonFarmApp import serializers as non_farm_serializers
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

class CommonPageNumberPagination(PageNumberPagination):
    """分页功能"""
    page_query_param = "currentPage"
    page_size_query_param = "pageSize"

class NonFarmDataAPIView(ListAPIView):
    """非农数据展示"""
    queryset = models.non_farm.objects.all().order_by("-version_date")
    serializer_class = non_farm_serializers.NonFarmDataSerializer
    pagination_class = CommonPageNumberPagination
