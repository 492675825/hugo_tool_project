import os
from pathlib import Path

from django.core.paginator import Paginator
from django.shortcuts import render
from django.views.generic.base import View
from apps.newsApp import models
from apps.newsApp import serializers as news_serializers
from django.http import JsonResponse
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from django.http import FileResponse
import pandas as pd


class CommonPageNumberPaginatin(PageNumberPagination):
    """分页功能"""
    page_size_query_param = "pageSize"
    page_query_param = "currentPage"


class NewsAllAPIView(ListAPIView):
    """所有新闻列表"""
    queryset = models.cctv_union_news.objects.all().order_by("-version_date")
    serializer_class = news_serializers.NewsAllSerializer
    pagination_class = CommonPageNumberPaginatin


class NewsFilterAPIView(View):

    def post(self, request):
        """
        央视新闻合并数据展示
        :param request:
        :return:
        """

        select_date = request.GET.get("select_date", "")
        news_type = request.GET.get("news_type", "")
        if select_date == "" and news_type == "":
            queryset = models.cctv_union_news.objects.all().order_by("-version_date")
        elif select_date != "" and news_type == "":
            queryset = models.cctv_union_news.objects.filter(version_date__contains=select_date).order_by(
                "-version_date")
        elif select_date == "" and news_type != "":
            queryset = models.cctv_union_news.objects.filter(news_type=news_type).order_by("-version_date")
        elif select_date != "" and news_type != "":
            queryset = models.cctv_union_news.objects.filter(version_date__contains=select_date,
                                                             news_type=news_type).order_by("-version_date")
        current_page = request.GET.get("currentPage", "1")
        page_size = request.GET.get("pageSize", "20")

        # 实例化分页对象（参数1：数据库所有数据，参数2：每页显示的数量）
        paginator = Paginator(queryset, page_size)
        # 数据总数
        total_record_count = paginator.count
        # 分页后总页数
        total_page_count = paginator.num_pages
        # 分页的页码列表（可用可不用）
        page_list = paginator.page_range
        # 实例化当前指定页对象
        page_target = paginator.page(current_page)
        # 获取当前页的数据
        output_page_data = page_target.object_list.values()
        # 系统刷新时间
        refresh_date = models.cctv_union_news.objects.values("refresh_date").first()
        # print(refresh_date)
        data = {
            "total": total_record_count,
            "records": list(output_page_data),
            "current": current_page,
            "refresh_date": refresh_date["refresh_date"]
        }
        return JsonResponse({"code": 0, "msg": "success", "data": data})

    def get(self, request):

        """
        新闻下载
        :param request:
        :return:
        """
        data_list = models.cctv_union_news.objects.all().order_by("-version_date").values()
        # 将数据库中的数据保存为csv
        df = pd.DataFrame(list(data_list))
        root_path = str(Path(__file__).resolve().parent.parent.parent)
        print("root_path:", root_path)
        save_path = root_path + "/download/news/export/"
        print(save_path)
        save_name = f'export_news.csv'
        df.to_csv(save_path + save_name, index=False, encoding='utf-8')
        # 浏览器端实现文件下载功能
        file = open(save_path + save_name, 'rb')
        response = FileResponse(file)
        response['Content-Type'] = 'application/octet-stream'
        response['Content-Disposition'] = f'attachment;filename="{save_name}"'
        return response
