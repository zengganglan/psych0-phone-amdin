
<template>
  <div class="content">
    <table class="tb_title">
      <tbody>
        <tr>
          <th rowspan="2">测试记录记录查看</th>
          <td class="label">姓名：</td>
          <td>{{ detail['name']}}</td>
          <td class="label">学号：</td>
          <td>{{detail['job_num']}}</td>
        </tr>
        <tr>
          <td class="label">性别：</td>
          <td>{{detail['sex']==1? '男' : '女'}}</td>
          <td class="label">手机：</td>
          <!-- <td>{{detail['phone']}}</td> -->
        </tr>
      </tbody>
    </table>
    <div align="center">
      <b>量表：同学关系问卷</b> 【
      <a href="#" target  style="color:blue">测试报告</a>】
    </div>
    <fieldset>
      <legend>测试结果</legend>
      <table class="tb_stat">
        <tbody>
          <tr>
            <th>因子</th>
            <td v-for="(item,key,index) in facname" :key="index">{{item}}</td>
          </tr>
          <tr>
            <td>得分</td>
            <td v-for="(item,key,index) in score" :key="index">{{item}}</td>
          </tr>
        </tbody>
      </table>
    </fieldset>
    <fieldset>
      <legend>
        量表剖析图 【
        <span @click="print(1)">饼图</span>
        <span @click="print(2)">折线图</span>
        <span @click="print(3)">柱形图</span>】
      </legend>
      <div class="chart" ref="chart"></div>
    </fieldset>
    <fieldset style="line-height:150%;">
      <legend>结果解释</legend>
      <div v-for="(item,key,index) in factors" :key="index">
        <span
          v-if="item['desc']"
        >【{{item['desc']['factor']['name']}}】{{item['desc']['calc']['explain']}}。</span>
      </div>
      <!-- <br />【交际交友】在和同学之间的交际和你的交友方面，你常常顺其自然，不拒绝别人的主动交往，自己也不太主动和别的同学交往；被动的交友模式可能会错过很多交好朋友的机会，可以尝试主动与他人打交道，积极参加集体活动和主动寻求他人帮助都是不错的办法。
      <br />【待人接物】你在待人接物上表现为多面性，有时候能够很好地应对身边人、事，有时候你又表现出厌烦和冷淡并随着情绪的变化而变化；你需要学会控制自己的情绪，不要因为自己情绪的变化而影响到你对周围人和事的态度，这样会让他们感到莫名其妙，对他们也是不公平的。
      <br />【与异性交往】在和异性交往中，你存在比较严重的困扰，在异性面前你常常表现出拘谨、腼腆和及其不自然，应该说你缺乏和异性同学交往的经验。与异性的正常交往对于人格的发展和完善来说都是非常重要的，你可以从异性朋友的身上学到不同的思维方式，开阔眼界。你可能对异性交往有一些误解或者是缺乏这方面的技巧，你需要找到原因，然后对症下药。多参加集体活动，或者与异性朋友讨论学习问题等，可以使你有机会与异性朋友相处，希望你勇敢地迈出第一步。
      <br />【总分】总的说来，你在和你的同学、朋友的交往过程中常常出现困扰和迷茫，也许你并不希望这样，但在你的学习和生活中确实因为和他们相处不太好而影响自己。（当然，我们的测量结果仅作参考！）也许你也想真诚地与人交往，但是方式方法上可能有些问题，你需要好好地反省一下，找准自己的问题所在，学习待人处事方面的技巧是很重要的。不要太斤斤计较，不要轻易打断别人说话，不要因为自己情绪的变化而改变对周围人的态度，以一颗真诚，宽容的心去对待他人。人际交往是人与人互动的结果，只要自己问心无愧，对结果也无须强求。
      <br />-->
    </fieldset>

    <fieldset style="line-height:150%;">
      <legend>原始选择</legend>

      <el-row>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-for="(item,index) in answers" :key="index">
          <div class="grid-content bg-purple">
            {{index+1}}．[
            <span class="answer" v-if="item.length>=0">
              <i v-for="(item1,index1) in item" :key="index1">{{item1}},</i>
            </span>
            <span class="answer" v-else>{{item}}</span>]
          </div>
        </el-col>
      </el-row>
    </fieldset>
    <div class="buttom">
      <!-- <el-button @click="submit()">提交</el-button> -->
      <el-button type="primary" @click="return1()">返回</el-button>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import $ from "jquery";
// import saveAs from "../../../assets/js/FileSaver" ,报错这个依耐必须npm包才正确，如下;
import saveAs from "file-saver";
// 第2种插件使用
//htmldocx是htmldocx2的依耐包
// import htmldocx from "html-docx-js";
import htmldocx2 from "../../../../assets/js/htmldocx";
export default {
  data() {
    return {
      case_data: {
        check_basic: "",
        check_sps: "",
        check_type: "",
        trace_basic: "",
        trace_sps: "",
        trace_type: ""
      },
      user_ext: {
        nation: "",
        father_age: "",
        father_job: "",
        father_die_age: "",
        mother_age: "",
        mother_job: "",
        mother_die_age: "",
        parent_marriage_status: "",
        parent_divorced_age: "",
        foster_flag: "",
        foster_age: "",
        stu_type: "",
        only_child: "",
        economy: ""
      },
      factors: "",
      answers: "",
      facname: [],
      score: [],
      user: {
        name: "",
        sex: "",
        job_num: "",
        phone: "",
        unit_group_name: "",
        address: ""
      },
      checkid: "",
      check: [
        { id: 0, name: "无需关注" },
        { id: 1, name: "学业问题" },
        { id: 2, name: "恋爱关系" },
        { id: 3, name: "人际交往" },
        { id: 4, name: "职业发展" },
        { id: 5, name: "情绪问题" },
        { id: 6, name: "躯体疾病" }
      ],
      type: 1,
      detail: "",
      option: ""
    };
  },
  mounted() {
    this.getlist();

    var option = this.option;
    console.log(option);
    //  this.getlist();

    //  $('.chart').data('option',option)
    // console.log( $('.chart').data('option'))
    //  $("#chart" + index).data("option", option);
  },
  beforeCreated() {
    // this.getlist();
    //  console.log(this.$route.query.id)
  },
  methods: {
    exportss() {
      // 导出
      $(".content").html2docx("统计分析文档");
    },
    print(type) {
      if (type == 1) {
        this.type = 1;
      } else if (type == 2) {
        this.type = 2;
      } else {
        this.type = 3;
      }
      this.draw();
    },
    getlist() {
      var that = this;
      this.axios
        .get("/api/v1/admin/scale/getTestResultDetail", {
          params: { id: this.$route.query.id }
        })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            that.detail = res["data"]["data"];
            that.factors = res["data"]["data"]["result"];
            that.answers = res["data"]["data"]["answer"];
            console.log(
              res["data"]["data"]["result"],
              that.factors,
              that.answers
            );
            var facname = [];
            var score = [];
            for (var key in that.factors) {
              if (that.factors[key]["calc"].length > 0) {
                that.facname.push(that.factors[key]["desc"]["factor"]["name"]);
                that.score.push(that.factors[key]["score"]);
              }
              // 没有对应的结算区间找不到他的因子
            }
            that.print(that.type);

            console.log(that.facname, that.score);
          }
        });
    },

    return1() {
      this.$router.go(-1);
    },
    draw() {
      var chart = this.$refs.chart;
      // console.log(chart);
      if (this.myChart) {
        this.myChart.clear();
      }
      console.log(this.facname, this.score);

      this.myChart = this.$echarts.init(chart);
      var option;
      var option1 = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}{c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: this.facnanme
        },

        series: [
          {
            name: "得分：",

            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },

            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.score
          }
        ]
      };
      var option2 = {
        xAxis: {
          type: "category",
          data: this.facname
        },
        yAxis: {
          type: "value"
        },
        tooltip: {},
        series: [
          {
            data: this.score,
            type: "line"
          }
        ]
      };
      var option3 = {
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
          bottom: "7%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.facname,
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
            name: "分数",
            type: "bar",
            barWidth: "100",
            data: this.score
          }
        ]
      };
      if (this.type == 1) {
        option = option1;
      } else if (this.type == 2) {
        option = option2;
      } else {
        option = option3;
      }
      $(".chart").data("option", option);
      console.log($(".chart").data("option"));

      this.option = option;
      this.myChart.setOption(option);
      this.myChart.resize();
      var that = this;

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
  }
};
</script>

<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.chart {
  width: 100%;
  margin: auto auto;
  height: 400px;
}
.tb_title {
  margin-bottom: 5px;
  border-collapse: collapse;
  width: 100%;
  .label {
    text-align: right;
    background: #f1f1f1;
  }
  td,
  th {
    padding: 5px;
    border: 1px solid #ccc;
  }
}
fieldset {
  margin-bottom: 20px;
  border: 0;
  border-bottom: 1px dashed #ccc;
  padding: 10px 10px;
  font-size: 14px;
  legend {
    border-left: 3px solid #499ad1;
    font-size: 16px;
    font-weight: normal;
    color: #499ad1;
    padding-left: 15px;
    height: 25px;
    line-height: 25px;
    span {
      font-size: 14px;
      cursor: pointer;
    }
  }
  .tb_stat {
    border-spacing: 10px;
    width: 100%;

    // border-bottom: 1px solid #ccc;

    td,
    th {
      padding-top: 10px;
      vertical-align: top;
      border: 1px solid #666;
      padding: 3px;
      text-align: center;
      input[type="radio"] {
        vertical-align: middle;
      }
    }
  }
  input {
    height: 20px;
  }
}
.t-end {
  width: 100%;
  .answer {
    color: #69f;
    /* font-weight: bold; */
  }
}
.buttom {
  text-align: center;
}
</style>