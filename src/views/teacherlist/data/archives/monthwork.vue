<template>
  <div class="main">
    <headson :headson="headson"></headson>
    <!-- tab栏目 -->
    <div class="tab">
      <ul>
        <li
          v-for="(item,index) in tabls"
          :class="{tabactive:tabindex-1==index}"
          :key="index"
          @click="tab(index)"
        >{{item}}</li>
      </ul>
    </div>
    <ul class="data">
      <li class="data1" v-show="tabindex==1">
        <div class="chart" ref="chart"></div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="700px" >
          <div class="detail" ref="detaildata"></div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </li>
      <li class="data2" v-show="tabindex==2">
            <div class="chart2" ref="chart2"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import headson from "../../../../components/headson";
export default {
  data() {
    return {
      dialogVisible: false,
      headson: ["咨询中心月报表", "咨询中心咨询情况统计记录"],
      // 切导航行栏 
      tabls: ["总体情况统计", "咨询情况汇总"],
      tabindex: 1
    };
  },
  mounted() {
    this.draw();
    
  },
  methods: {
    //导航栏切换
    tab(index) {
      console.log(index);
      this.tabindex = index - 0 + 1;
      if (this.tabindex==2) {
          this.chart2()
      }
    },
    draw() {
      var chart = this.$refs.chart;
      this.myChart = this.$echarts.init(chart);
      var that = this;
      var option = {
        title: {
          text: "总体情况统计",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["访谈统计", "个案追踪", "会商", "咨询记录统计"]
        },
        series: [
          {
            name: "比例",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "访谈统计" },
              { value: 310, name: "个案追踪" },
              { value: 234, name: "会商" },
              { value: 135, name: "咨询记录统计" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.myChart.setOption(option);
      this.myChart.resize();
      this.myChart.on("click", function(params) {
        console.log(params);
        that.dialogVisible = true;
     
           setTimeout(function(){
                that.getdata()
        },500)
      });
    },
    // 对应列模块下下的表格
    getdata() {
      var a = this.$refs.detaildata;
      console.log(a)
      this.myChart = this.$echarts.init(a);
      var seriesLabel = {
        normal: {
          show: true,
          textBorderColor: "fff",
          textBorderWidth: 2
        }
       };
     var option = {
        color: ["#3398DB"],
         title: {
          text: "总体情况统计",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["学业问题", "恋爱关系", "人际交往", "职业发展", "情绪问题", "身体躯病", "师生关系"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            label: seriesLabel,
            barWidth: "50%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };
      this.myChart.setOption(option);
      this.myChart.resize();
    },
    // 咨询情况统计
    chart2(){
      var b = this.$refs.chart2;
      this.myChart = this.$echarts.init(b);
      var that = this;
      var option = {
        title: {
          text: "咨询中心情况统计",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["大一", "大二", "大三", "大四"]
        },
        series: [
          {
            name: "比例",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "大一" },
              { value: 310, name: "大二" },
              { value: 234, name: "大三" },
              { value: 135, name: "大四" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.myChart.setOption(option);
      this.myChart.resize();
    }

  },
  components: {
    headson: headson
  }
};
</script>

<style lang="scss" scoped>
.tabactive {
  color: #6998fb;
  border-bottom: 10px solid #6998fb;
}
.main {
  .tab {
    width: 100%;
    height: 100px;
    color: #bfbfc0;
    font-size: 12px;

    background-color: #fbfbfb;
    border: 1px solid #eff2f9;
    box-shadow: #eff2f9 1px 1px 20px;
    ul {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;

      li {
        float: left;
        text-align: center;
        width: 200px;
        line-height: 100px;
        width: 174px;
        margin: 0 70px;
        font-size: 20px;
      }
    }
  }
}
.data {
  border: 1px solid #e6e6e8;
  margin: 0 50px;
  margin-top: 30px;
  background-color: #ffffff;
  > li {
    width: 100%;
    min-height: 640px;
  }
  .chart{
     height: 640px;
    width: 100%;
  }
  .chart2{
    height: 640px;
    width:500px;
    margin: 0 auto;
  }
  //   .chart {
  //     width: 1000px;
  //     margin: auto auto;
  //     height: 500px;
  //   }
}
.detail{
    height: 300px;
    width: 700px;
}
</style>