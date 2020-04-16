<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->

    <div class="data">
      <div class="chart" ref="chart"></div>
    </div>
    <!-- <div class="add">提交</div> -->
  </div>
</template>

<script>
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";

export default {
  data() {
    return {
      headson: ["系统参数设置", "有关系统的参数设置"],
      data: {
        // value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value4: "",
        input: "",
        value5: "100",
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          }
        ]
      }
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      var chart = this.$refs.chart;
      console.log(chart);
      this.myChart = this.$echarts.init(chart);
      var option = {
        title: {
          text: "危机干预综合信息"
        },
        color: ["#3398DB"],
        legend: {
          data: ["销量"]
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
            data: ["潜在风险评估", "自杀倾向评估", "访谈评估", "生活事件动态"],
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
            name: "2015",
            type: "bar",
            barWidth: "100",
            data: [10, 52, 200, 334, 390]
          }
        ]
      };
   
      this.myChart.setOption(option);
      this.myChart.resize();
      var that = this
      this.myChart.on("click", function(params) {
        console.log(params);
        if (params.name == "潜在风险评估") {
            // that.$router.push('/crisis/asses/danger')
        } else if (params.name == "自杀倾向评估") {
                        // that.$router.push('/crisis/asses/diebefore')

        } else if (params.name == "鉴别评估") {
                        // that.$router.push('/crisis/asses/check')

        } else {
                                // that.$router.push('/crisis/asses/lifeThing')

        }

        // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
      });
    }
  },

  components: {
    headson: headson,
    pagination: pagination
  }
};
</script>

<style scoped lang="scss">
.work {
  width: 90%;
  margin: 0 auto;
  span {
    display: inline-block;
    float: right;
    width: 60px;
    height: 20px;
    background-color: #ffffff;
    font-size: 12px;
    text-align: center;
    line-height: 15px;
    border-radius: 5px;
    border: 1px solid #9f9a9b;
    cursor: pointer;
    i {
      font-size: 20px;
      position: relative;
      top: 3px;
    }
  }
  span:nth-child(1) {
    margin-left: 20px;
  }
}
.pages {
  margin: 0 50px;

  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  // float: right;
  height: 100px;
}

.data {
  min-height: 640px;
  border: 1px solid #e6e6e8;
  margin: 0 50px;
  margin-top: 30px;
  background-color: #ffffff;
  .chart {
    width: 1000px;
    margin: auto auto;
    height: 500px;
  }
}
.add,
.complete {
  width: 310px;
  height: 25px;
  margin: 0 auto;
  text-align: center;
  line-height: 25px;
  position: relative;
  top: 20px;
  color: gray;
  border: 1px solid #dfd7d7;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>