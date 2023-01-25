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
    >
      <el-table-column type="index" width="50" label="编号"/>
      <el-table-column prop="month_number" label="月份"/>
      <el-table-column prop="current_sum_mapping" label="今年净值"/>
      <el-table-column prop="history_average_mapping" label="历史年均净值(总月净值/总年数)"/>
      <el-table-column prop="history_sum_mapping" label="历史总净值"/>
    </el-table>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      gold_data_list: [],
      currentPage: 1,
      total: 1,
      pageSize: 10,
      refresh_date: '2022-03-30 10:00:00',
      current_year: '2022'

    }
  },
  created() {
    this.dataList()
  },

  methods: {
    dataList() {
      axios({
        method: 'get',
        url: this.baseLink.baseURL + '/gold/monthly_data'
      }).then(response => {
        this.gold_data_list = response.data

      }).catch(response => {
        this.$message.error('error')
      })
    }

  }

}

</script>
