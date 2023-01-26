from rest_framework import serializers
from apps.goldApp import models


class GoldDailyDataSerializer(serializers.ModelSerializer):
    """黄金日数据"""

    class Meta:
        model = models.gold_only_data
        fields = "__all__"


class GoldMonthlyDataSerializer(serializers.ModelSerializer):
    """黄金月数据"""

    class Meta:
        model = models.gold_monthly_data
        # fields = ['month_number', 'current_sum_mapping', 'history_average_mapping', 'history_sum_mapping']
        fields = "__all__"


class GoldYearlyDataSerializer(serializers.ModelSerializer):
    """黄金年数据"""

    class Meta:
        model = models.gold_yearly_data
        # fields = ["year_number", "frequency"]
        fields = "__all__"


class GoldCloseDataSerializer(serializers.ModelSerializer):
    """黄金收盘价"""

    class Meta:
        model = models.gold_close_data
        fields = "__all__"


class GoldChartCardSerializer(serializers.ModelSerializer):
    """黄金图表，卡片"""

    class Meta:
        model = models.gold_only_data
        fields = "__all__"


class GoldChartLineSerializer(serializers.ModelSerializer):
    """黄金图表，折线图"""

    class Meta:
        model = models.gold_monthly_data
        fields = "__all__"


class GoldChartBarSerializer(serializers.ModelSerializer):
    """黄金图表，柱状图"""

    class Meta:
        model = models.gold_earning_rate
        fields = "__all__"
