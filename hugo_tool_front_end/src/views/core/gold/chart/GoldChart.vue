<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              交易日期
            </div>
            <div class="card-panel-num">{{this.version_date}}</div>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              收盘价
            </div>
            <count-to :start-val="0" :end-val=this.close_price :duration="3200" :decimals="2" class="card-panel-num"/>
          </div>
        </div>


      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              涨幅
            </div>
            <count-to :start-val="0" :end-val=this.up_down :duration="3200" :decimals="2" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="shopping" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              标记
            </div>
            <count-to :start-val="0" :end-val="this.mapping" :duration="3200" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="24">
        <el-card shadow="always">
          <div id="line" style="width:100%;height: 300px; margin-bottom: 40px"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="24">
        <el-card shadow="always">
          <div id="bar" style="width:100%;height: 300px;margin-bottom: 40px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>


</template>

<script>
  import CountTo from 'vue-count-to'
  import axios from 'axios'
  import echarts from 'echarts'
  import 'echarts/theme/macarons.js'

  export default {
    data() {
      return {
        card_data_list: [],
        version_date: "",
        close_price: 0.00,
        up_down: 0.00,
        mapping: 0,
        line_version_date: [],
        line_current_mapping: [],
        line_history_avg_mapping: [],
        bar_year_number: [],
        bar_max_earning_rate: [],
        bat_average_earning_rate: [],


      }
    },
    created() {
      this.card_data()
      // this.line_data()
    },
    mounted() {
      this.line_data()
      this.bar_data()
    },
    components: {
      CountTo
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      },
      //4张卡片
      card_data() {
        axios({
          url: "http://localhost:8110/admin/core/gold/chart_card",
          method: "get"
        }).then(res => {
          this.card_data_list = res.data.data
          this.version_date = this.card_data_list[0].versionDate
          this.close_price = parseFloat(this.card_data_list[0].close)
          this.up_down = parseFloat(this.card_data_list[0].upOrDown)
          this.mapping = parseFloat(this.card_data_list[0].mapping)
        }).catch(res => {
          this.$message.error("error")
        })
      },
      line_data() {
        axios({
          url: "http://localhost:8110/admin/core/gold/line_data",
          method: "get"
        }).then(res => {
          this.line_data_list = res.data.data
          let version_date_list = []
          for (let i = 0; i < this.line_data_list.length; i = i + 1) {
            version_date_list.push(this.line_data_list[i].monthNumber)
          }
          this.line_version_date = version_date_list
          let current_sum_mapping_list = []
          for (let i = 0; i < this.line_data_list.length; i++) {
            current_sum_mapping_list.push(this.line_data_list[i].currentSumMapping)
          }
          this.line_current_mapping = current_sum_mapping_list
          let his_avg_sum_mapping_list = []
          for (let i = 0; i < this.line_data_list.length; i++) {
            his_avg_sum_mapping_list.push(this.line_data_list[i].historyAverageMapping)
          }
          this.line_history_avg_mapping = his_avg_sum_mapping_list
          console.log("version_date:" + version_date_list)
          console.log("current_mapping:" + current_sum_mapping_list)
          console.log("historyAverageMapping:" + his_avg_sum_mapping_list)
          var myChart = this.$echarts.init(
            document.getElementById('line'), 'macarons'
          );
          var option = {
            title: {
              text: "月净值",
              x: 'left',
              y: 'top'
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0)",
              trigger: 'item'
              // show:true
            },
            legend: {
              orient: "horizontal"
            },
            toolbox: {

              orient: "horizontal",
              x: "right",
              y: "top",
              color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],

            },
            xAxis: {
              data: this.line_version_date,
              axisLabel: {
                interval: 0
              }
            },

            yAxis: {},
            series: [
              {
                name: "今年净值",
                type: 'line',
                data: this.line_current_mapping
              },
              {
                name: "历史月平均净值",
                type: 'line',
                data: this.line_history_avg_mapping
              },
            ]
          };
          myChart.setOption(option)
        }).catch(res => {
          this.$message.error("error")
        })
      },
      bar_data() {
        axios({
          url: "http://localhost:8110/admin/core/gold/charts/bar",
          method: "get"
        }).then(res => {
          const bar_list = res.data.data
          for (let i = 0; i < bar_list.length; i++) {
           this.bar_year_number.push(bar_list[i].yearNumber)
          }
          for(let i = 0;i <bar_list.length;i=i+1){
            this.bar_max_earning_rate.push(bar_list[i].maxEarningRate.toFixed(4))  //toFixed保留小数点后几位
          }
          for(let i = 0;i <bar_list.length;i=i+1){
            this.bat_average_earning_rate.push(bar_list[i].averageEarningRate.toFixed(4))
          }

          var myChart = this.$echarts.init(
            document.getElementById('bar'), 'macarons'
          );
          var option = {
            title: {
              text: "最大收益率",
              x: 'left',
              y: 'top'
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0)",
              trigger: 'item'
              // show:true
            },
            legend: {
              orient: "horizontal"
            },
            toolbox: {

              orient: "horizontal",
              x: "right",
              y: "top",
              color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],

            },
            xAxis: {
              data: this.bar_year_number,
              axisLabel: {
                interval: 0
              }
            },

            yAxis: {},
            series: [
              {
                name: "最大收益率",
                type: 'bar',
                data: this.bar_max_earning_rate
              },
              {
                name: "历史年平均最大收益率",
                type: 'line',
                data: this.bat_average_earning_rate
              },
            ]
          };
          myChart.setOption(option)
        }).catch(res => {
          this.$message.error("error")
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>

