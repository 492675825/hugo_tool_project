from django.db import models

# Create your models here.
class cctv_world_news(models.Model):
    """
    央视新闻（国际）
    """
    # version_date,title,brief,keyword,url
    id = models.BigAutoField(null=False, blank=False, primary_key=True, verbose_name="编号")
    version_date = models.CharField(max_length=50, null=True, blank=True, verbose_name="新闻日期")
    title = models.CharField(max_length=1000, null=True, blank=True, verbose_name="标题")
    brief = models.CharField(max_length=1000, null=True, blank=True, verbose_name="概要")
    keyword = models.CharField(max_length=1000, null=True, blank=True, verbose_name="关键词")
    url = models.CharField(max_length=1000, null=True, blank=True, verbose_name="网页连接")
    refresh_date = models.CharField(max_length=100, null=True, blank=True, verbose_name="入库时间")
    news_type = models.CharField(max_length=100, null=True, blank=True, verbose_name="新闻类别")
    objects = models.Manager()

    class Meta:
        db_table = 'tbl_d_news_cctv_world'
        verbose_name = '央视国际新闻'
        verbose_name_plural = verbose_name

    def __str__(self):
        self.title


class cctv_china_news(models.Model):
    """
    央视新闻(国内)
    """
    # version_date,title,brief,keyword,url
    id = models.BigAutoField(null=False, blank=False, primary_key=True, verbose_name="编号")
    version_date = models.CharField(max_length=50, null=True, blank=True, verbose_name="新闻日期")
    title = models.CharField(max_length=1000, null=True, blank=True, verbose_name="标题")
    brief = models.CharField(max_length=1000, null=True, blank=True, verbose_name="概要")
    keyword = models.CharField(max_length=1000, null=True, blank=True, verbose_name="关键词")
    url = models.CharField(max_length=1000, null=True, blank=True, verbose_name="网页连接")
    refresh_date = models.CharField(max_length=100, null=True, blank=True, verbose_name="入库时间")
    news_type = models.CharField(max_length=100, null=True, blank=True, verbose_name="新闻类别")
    objects = models.Manager()

    class Meta:
        db_table = 'tbl_d_news_cctv_china'
        verbose_name = '央视国内新闻'
        verbose_name_plural = verbose_name

    def __str__(self):
        self.title


class cctv_union_news(models.Model):
    """
    央视新闻(合并)
    """
    # version_date,title,brief,keyword,url
    version_date = models.CharField(max_length=50, null=True, blank=True, verbose_name="新闻日期")
    title = models.CharField(max_length=1000, null=True, blank=True, verbose_name="标题")
    brief = models.CharField(max_length=1000, null=True, blank=True, verbose_name="概要")
    keyword = models.CharField(max_length=1000, null=True, blank=True, verbose_name="关键词")
    url = models.CharField(max_length=1000, null=True, blank=True, verbose_name="网页连接")
    refresh_date = models.CharField(max_length=100, null=True, blank=True, verbose_name="入库时间")
    news_type = models.CharField(max_length=100, null=True, blank=True, verbose_name="新闻类别")
    unique_key = models.CharField(primary_key=True, max_length=100, null=False, blank=False, verbose_name="主键")
    objects = models.Manager()

    class Meta:
        db_table = 'tbl_d_news_cctv_union_all'
        verbose_name = '央视新闻合并'
        verbose_name_plural = verbose_name

    def __str__(self):
        self.title


class cctv_economy_news(models.Model):
    # version_date,title,brief,keyword,url
    """
    央视新闻（财经）
    """
    id = models.BigAutoField(null=False, blank=False, primary_key=True, verbose_name="编号")
    version_date = models.CharField(max_length=50, null=True, blank=True, verbose_name="新闻日期")
    title = models.CharField(max_length=1000, null=True, blank=True, verbose_name="标题")
    brief = models.CharField(max_length=1000, null=True, blank=True, verbose_name="概要")
    keyword = models.CharField(max_length=1000, null=True, blank=True, verbose_name="关键词")
    url = models.CharField(max_length=1000, null=True, blank=True, verbose_name="网页连接")
    refresh_date = models.CharField(max_length=100, null=True, blank=True, verbose_name="入库时间")
    news_type = models.CharField(max_length=100, null=True, blank=True, verbose_name="新闻类别")
    objects = models.Manager()

    class Meta:
        db_table = 'tbl_d_news_cctv_economy'
        verbose_name = '央视经济新闻'
        verbose_name_plural = verbose_name

    def __str__(self):
        self.title
