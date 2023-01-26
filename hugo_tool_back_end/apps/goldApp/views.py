from django.db.models import Max
from django.views.generic.base import View
from apps.goldApp import models, serializers as gold_serializers
from django.http import JsonResponse
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from django.http import FileResponse
import pandas as pd
from util.data_transform import data_transform


class CommonPageNumberPagination(PageNumberPagination):
    """分页功能"""
    page_size_query_param = 'pageSize'
    page_query_param = 'currentPage'


class GoldDailyDataAPIView(ListAPIView):
    """黄金日数据"""
    queryset = models.gold_only_data.objects.all().order_by("-version_date")
    serializer_class = gold_serializers.GoldDailyDataSerializer
    pagination_class = CommonPageNumberPagination


class GoldMonthlyDataAPIView(ListAPIView):
    """黄金月数据"""
    queryset = models.gold_monthly_data.objects.all().order_by("month_number")
    serializer_class = gold_serializers.GoldMonthlyDataSerializer


class GoldYearlyDataAPIView(ListAPIView):
    """黄金年数据"""
    queryset = models.gold_yearly_data.objects.all().order_by("-year_number")
    serializer_class = gold_serializers.GoldYearlyDataSerializer
    pagination_class = CommonPageNumberPagination


class GoldCloseDataAPIView(ListAPIView):
    """黄金收盘价"""
    queryset = models.gold_close_data.objects.all().order_by("-year_number")
    serializer_class = gold_serializers.GoldCloseDataSerializer
    pagination_class = CommonPageNumberPagination


class GoldDailyDataDownload(View):
    """下载黄金日数据"""

    def get(self, request, param_01):
        if param_01 == "full":
            queryset = models.gold_only_data.objects.all().values()
            df = pd.DataFrame(queryset)
            save_path = "./download/gold_daily.csv"
            df.to_csv(save_path, index=False, encoding='utf-8')
            file = open(save_path, 'rb')
            response = FileResponse(file)
            response["Content-Type"] = "application/octet-stream"
            response["Content-Disposition"] = f'attachment;filename="gold_daily.csv"'
            return response
        elif param_01 != "null":
            queryset = models.gold_only_data.objects.all().values()
            df = pd.DataFrame(queryset)
            save_path = "./download/gold_daily.csv"
            df.to_csv(save_path, index=False, encoding='utf-8')
            file = open(save_path, 'rb')
            response = FileResponse(file)
            response["Content-Type"] = "application/octet-stream"
            response["Content-Disposition"] = f'attachment;filename="gold_daily.csv"'
            return response


class gold_daily_data_insert(View):
    def get(self, request):
        """
        黄金价格爬虫
        :param request:
        :return:
        """
        data = data_transform()
        data.main()
        return JsonResponse({"code": 0, "msg": "success"})


class GoldChartCardAPIView(ListAPIView):
    """图表，卡片"""
    # 先获取最大version_date所在行，避免获取去表影响性能
    max_version_date_dict = models.gold_only_data.objects.all().order_by("-version_date").values()
    df = pd.DataFrame(max_version_date_dict)
    max_version_date = max_version_date_dict[0]["version_date"]
    queryset = models.gold_only_data.objects.filter(version_date=max_version_date)
    serializer_class = gold_serializers.GoldChartCardSerializer


class GoldChartLineAPIView(ListAPIView):
    """图表，折线图"""
    queryset = models.gold_monthly_data.objects.all().order_by("month_number")
    serializer_class = gold_serializers.GoldChartLineSerializer


class GoldChartBarAPIView(ListAPIView):
    """图表，柱状图"""
    queryset = models.gold_earning_rate.objects.all().order_by("-year_number")
    serializer_class = gold_serializers.GoldChartBarSerializer
