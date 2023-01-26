"""financial_instruments URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from apps.goldApp import views as gold_views

urlpatterns = [
    path("gold/daily_data", gold_views.GoldDailyDataAPIView.as_view(), name="gold/daily_data"),
    path("gold/monthly_data", gold_views.GoldMonthlyDataAPIView.as_view(), name="gold/monthly_data"),
    path("gold/yearly_data", gold_views.GoldYearlyDataAPIView.as_view(), name="gold/yearly_data"),
    path("gold/close_data", gold_views.GoldCloseDataAPIView.as_view(), name="gold/close_data"),
    path("gold/daily_download/<param_01>", gold_views.GoldDailyDataDownload.as_view(), name="gold/daily_download"),
    path("gold/gold_daily_data_insert", gold_views.gold_daily_data_insert.as_view(), name="gold/gold_daily_data_insert"),
    path("chart/card", gold_views.GoldChartCardAPIView.as_view(), name="chart/card"),
    path("chart/line", gold_views.GoldChartLineAPIView.as_view(), name="chart/line"),
    path("chart/bar", gold_views.GoldChartBarAPIView.as_view(), name="chart/bar")
]
