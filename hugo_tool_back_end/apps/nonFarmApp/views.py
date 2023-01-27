from pathlib import Path

from django.http import FileResponse
from django.shortcuts import render

from django.views.generic.base import View
from apps.nonFarmApp import models
from apps.nonFarmApp import serializers as non_farm_serializers
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
import pandas as pd

from util.nonfarm_data_delta import get_page

from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import register_job

try:
    scheduler = BackgroundScheduler()


    @register_job(scheduler, "interval", seconds=3600, id="daily_gold_cycle")
    def cycle_job():
        # 非农数据爬虫
        non_farm_delta = get_page()
        non_farm_delta.get_data(showScreen=False)


    scheduler.start()
except Exception as e:
    scheduler.shutdown()


class CommonPageNumberPagination(PageNumberPagination):
    """分页功能"""
    page_query_param = "currentPage"
    page_size_query_param = "pageSize"


class NonFarmDataAPIView(ListAPIView):
    """非农数据展示"""
    queryset = models.non_farm.objects.all().order_by("-version_date")
    serializer_class = non_farm_serializers.NonFarmDataSerializer
    pagination_class = CommonPageNumberPagination


class NonFarmDownload(View):
    def get(self, request):
        """
        非农下载
        :param request:
        :return:
        """
        data_list = models.non_farm.objects.all().order_by("-version_date").values()
        # 将数据库中的数据保存为csv
        df = pd.DataFrame(list(data_list))
        root_path = str(Path(__file__).resolve().parent.parent.parent)
        save_path = root_path + "/download/nonfarm/"
        save_name = f'nonfarm_download.csv'
        df.to_csv(save_path + save_name, index=False)
        # 浏览器端实现文件下载功能
        file = open(save_path + save_name, 'rb')
        response = FileResponse(file)
        response['Content-Type'] = 'application/octet-stream'
        response['Content-Disposition'] = f'attachment;filename="{save_name}"'
        return response
