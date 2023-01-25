from django.db import models

# Create your models here.

class gold_data(models.Model):
    # 上海黄金交易所数据模型
    id = models.BigIntegerField(null=False, blank=False, primary_key=True, verbose_name="id")
    item = models.CharField(max_length=100, null=True, blank=True, verbose_name="类别")
    open = models.CharField(max_length=100, null=True, blank=True, verbose_name="开盘价")
    high = models.CharField(max_length=100, null=True, blank=True, verbose_name="最高价")
    low = models.CharField(max_length=100, null=True, blank=True, verbose_name="最低价")
    close = models.CharField(max_length=100, null=True, blank=True, verbose_name="收盘价")
    up_or_down = models.CharField(max_length=100, null=True, blank=True, verbose_name="涨幅")
    version_date = models.CharField(max_length=100, blank=False, verbose_name="涨幅")
    objects = models.Manager()

    class Meta:
        db_table = "temp_gold_data"
        verbose_name = "贵金属价格"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.item


class gold_only_data(models.Model):
    """黄金日数据"""
    id = models.BigIntegerField(null=False, blank=False, primary_key=True, verbose_name="id")
    item = models.CharField(max_length=100, null=True, blank=True, verbose_name="类别")
    open = models.CharField(max_length=100, null=True, blank=True, verbose_name="开盘价")
    high = models.CharField(max_length=100, null=True, blank=True, verbose_name="最高价")
    low = models.CharField(max_length=100, null=True, blank=True, verbose_name="最低价")
    close = models.CharField(max_length=100, null=True, blank=True, verbose_name="收盘价")
    up_or_down = models.CharField(max_length=100, null=True, blank=True, verbose_name="涨幅")
    version_date = models.CharField(max_length=100, blank=False, verbose_name="交易日期")
    mapping = models.CharField(max_length=15, null=True, blank=True, verbose_name="映射")
    date_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="年月日")
    year_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="年份")
    month_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="月份")
    day_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="日")
    refresh_date = models.CharField(max_length=50, null=True, blank=True, verbose_name="日")
    objects = models.Manager()

    class Meta:
        db_table = "tbl_au_td_gold_data_analysis"
        verbose_name = "黄金价格"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.item


class gold_monthly_data(models.Model):
    # 黄金月数据
    id = models.BigIntegerField(null=False, blank=False, primary_key=True, verbose_name="id")
    month_number = models.CharField(max_length=100, null=True, blank=True, verbose_name="月份")
    current_sum_mapping = models.CharField(max_length=100, null=True, blank=True, verbose_name="当月净值")
    history_average_mapping = models.CharField(max_length=100, null=True, blank=True, verbose_name="历史年平均净值")
    history_sum_mapping = models.CharField(max_length=100, null=True, blank=True, verbose_name="历史年净值")
    objects = models.Manager()

    class Meta:
        db_table = "tbl_m_au_td_gold_data_mapping"
        verbose_name = "黄金月价格"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.id


class gold_yearly_data(models.Model):
    """
    黄金年数据
    """
    id = models.BigIntegerField(null=False, blank=False, primary_key=True, verbose_name="id")
    year_number = models.CharField(max_length=100, null=True, blank=True, verbose_name="年份")
    frequency = models.CharField(max_length=100, null=True, blank=True, verbose_name="净值")
    objects = models.Manager()

    class Meta:
        db_table = "tbl_y_au_td_gold_data_analysis"
        verbose_name = "黄金年价格"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.id


class gold_earning_rate(models.Model):
    """
    黄金年数据
    """
    id = models.BigIntegerField(null=False, blank=False, primary_key=True, verbose_name="id")
    year_number = models.CharField(max_length=100, null=True, blank=True, verbose_name="年份")
    max_earning_rate = models.CharField(max_length=100, null=True, blank=True, verbose_name="最大收益率")
    average_earning_rate = models.CharField(max_length=100, null=True, blank=True, verbose_name="平均收益率")
    objects = models.Manager()

    class Meta:
        db_table = "tbl_d_au_td_earning_rate"
        verbose_name = "黄金收益率"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.id


class gold_close_data(models.Model):
    """黄金收盘价"""
    id = models.BigIntegerField(null=False, blank=False, primary_key=True, verbose_name="id")
    year_number = models.CharField(max_length=5, null=True, blank=True, verbose_name="年份")
    min_close = models.CharField(max_length=100, null=True, blank=True, verbose_name="最低收盘价")
    min_close_version_date = models.CharField(max_length=100, null=True, blank=True, verbose_name="最低收盘价日期")
    min_close_month = models.CharField(max_length=100, null=True, blank=True, verbose_name="最低收盘价月份")
    max_close = models.CharField(max_length=100, null=True, blank=True, verbose_name="最高收盘价")
    max_close_version_date = models.CharField(max_length=100, null=True, blank=True, verbose_name="最高收盘价日期")
    max_close_month = models.CharField(max_length=100, null=True, blank=True, verbose_name="最高收盘价月份")
    objects = models.Manager()

    class Meta:
        db_table = "tbl_d_au_td_close"
        verbose_name = "黄金收盘价"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.id
