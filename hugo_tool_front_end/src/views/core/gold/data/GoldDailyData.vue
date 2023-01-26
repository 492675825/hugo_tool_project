<template>
  <div class="app-container">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <router-link to="/daily_data"><b>日数据</b></router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/monthly_data"><b>月数据</b></router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/yearly_data"><b>年数据</b></router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/min_max_close"><b>收盘价</b></router-link>
      </el-menu-item>
    </el-menu>
    <!--    显示更新时间-->
    <span style="float: right;font-size: small;margin-top: 10px;margin-bottom: 10px;">最近更新: {{
      refresh_date
    }}</span>

    <el-button size="mini" style="margin-top: 10px;margin-bottom: 10px" icon="el-icon-download">
      <a :href="export_excel()">导出</a>
    </el-button>

    <!--    显示所有数据表格-->
    <el-table
      :data="gold_data_list"
      border
      stripe
      :default-sort="{prop: 'version_date', order: 'descending'}"
      highlight-current-row
    >
      <el-table-column type="index" width="50" label="编号" />
      <el-table-column prop="version_date" label="交易日期" />
      <el-table-column prop="item" label="产品类别" />
      <el-table-column prop="open" label="开盘价" />
      <el-table-column prop="high" label="最高价" />
      <el-table-column prop="low" label="最低价" />
      <el-table-column prop="close" label="收盘价" />
      <el-table-column prop="up_or_down" label="涨幅" />
      <el-table-column prop="mapping" label="标记" />
    </el-table>

    <!--    分页-->
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20,30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      gold_data_list: [],
      current_page: 1,
      total: 1,
      page_size: 10,
      refresh_date: '2022-03-30 10:00:00',
      param_01: 'full'
    }
  },
  created() {
    this.getPage()
  },

  methods: {
    getPage() {
      axios({
        method: 'get',
        url: this.baseLink.baseURL + '/gold/daily_data',
        params: {
          currentPage: this.current_page,
          pageSize: this.page_size
        }
      }).then(response => {
        this.gold_data_list = response.data.results
        this.total = response.data.count
        this.refresh_date = response.data.results[0].refresh_date
      }).catch(response => {
        this.$message.error('error')
      })
    },
    handleSizeChange(page_size) {
      this.page_size = page_size
      this.getPage()
    },
    handleCurrentChange(current_page) {
      this.current_page = current_page
      this.getPage()
    },
    export_excel() {
      if (this.param_01 === 'full') {
        return this.baseLink.baseURL + '/gold/daily_download/full'
      } else {
        return this.baseLink.baseURL + '/gold/daily_download/' + this.param_01
      }
    }
  }
}
</script>
