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

    <!--    显示所有数据表格-->
    <el-table :data="gold_data_list"
              border stripe
              highlight-current-row
              height="600"
    >
      <el-table-column type="index" width="50" label="编号"/>
      <el-table-column prop="year_number" label="年份"/>
      <el-table-column prop="frequency" label="净值"/>
    </el-table>

    <!--    分页-->
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20,30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

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
      refresh_date: '2022-03-30 10:00:00'
    }
  },
  created() {
    this.dataList()
  },

  methods: {
    dataList() {
      axios({
        method: 'get',
        url: this.baseLink.baseURL + '/gold/yearly_data',
        params: {
          currentPage: this.current_page,
          pageSize: this.page_size
        }
      }).then(response => {
        this.gold_data_list = response.data.results
        this.total = response.data.count

      }).catch(response => {
        this.$message.error('error')
      })
    },
    handleSizeChange(page_size) {
      this.page_size = page_size
      this.dataList()

    },
    handleCurrentChange(current_page) {
      this.current_page = current_page
      this.dataList()
    }

  }

}

</script>
