# Generated by Django 3.2.16 on 2023-01-24 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='non_farm',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False, verbose_name='id')),
                ('version_date', models.CharField(blank=True, max_length=50, null=True, verbose_name='日期')),
                ('current_value', models.CharField(blank=True, max_length=20, null=True, verbose_name='当前值')),
                ('predict_value', models.CharField(blank=True, max_length=20, null=True, verbose_name='预测值')),
                ('previous_value', models.CharField(blank=True, max_length=20, null=True, verbose_name='上一期值')),
                ('refresh_date', models.CharField(blank=True, max_length=50, null=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name': '非农数据',
                'verbose_name_plural': '非农数据',
                'db_table': 'tbl_non_farm_data',
            },
        ),
    ]
