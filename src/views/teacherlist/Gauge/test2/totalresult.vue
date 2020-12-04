<template>
  <div>
    <article class="am-container content">
      <div class="inner">
        <h1>
          <small>中学心理管理系统</small>
          <br />
          {{name}}测试结果报告
        </h1>
        <h2 id="autocjs-heading-0" class="autocjs-heading">
          一、测试工具
          <a
            class="autocjs-anchor autocjs-hide"
            aria-hidden="true"
            id="autocjs-anchor-0"
            href="#autocjs-heading-0"
            aria-label="一、测试工具"
          ></a>
        </h2>
        <section>
          <p>{{intro}}</p>
          <p>该量表主要测查测试群体在{{factor.length}}个因子上的情况，{{factor.length}}个因子各自的定义如下：</p>
          <p
            v-for="(item,index) in factor"
            :key="index"
          >（1）{{item.name}}。该因子主要反映{{item.specification}}。</p>
        </section>
        <h2 id="autocjs-heading-1" class="autocjs-heading">
          二、测试时间
          <a
            class="autocjs-anchor autocjs-hide"
            aria-hidden="true"
            id="autocjs-anchor-1"
            href="#autocjs-heading-1"
            aria-label="二、测试时间"
          ></a>
        </h2>
        <p>{{times.min}}～{{times.max}}</p>
        <h2 id="autocjs-heading-2" class="autocjs-heading">
          三、测试群体
          <a
            class="autocjs-anchor autocjs-hide"
            aria-hidden="true"
            id="autocjs-anchor-2"
            href="#autocjs-heading-2"
            aria-label="三、测试群体"
          ></a>
        </h2>
        <section>
          <ul>
            <li>人数： 本次测评采用网络测评的方式，实测人数{{scalelist.length}}人。</li>
            <li>性别： 男性{{sexs.b}}人，女性{{sexs.a}}人。</li>
            <!-- <li>
              年龄：
              最大年龄：39，最小年龄：4，平均年龄：21.14。
            </li> -->
             <li>
              年龄：
              最大年龄：{{ages.max}}，最小年龄：{{ages.min}}，平均年龄：{{ages.aver}}。
            </li>
          
          
          </ul>
          <h2 id="autocjs-heading-3" class="autocjs-heading">
            <!-- 四、总体的测试结果 -->
            <a
              class="autocjs-anchor autocjs-hide"
              aria-hidden="true"
              id="autocjs-anchor-3"
              href="#autocjs-heading-3"
              aria-label="四、总体的测试结果"
            ></a>
          </h2>
          <section>
            <!-- <h3 id="autocjs-heading-4" class="autocjs-heading">
              1．总分和十个因子得分的平均数
              <a
                class="autocjs-anchor autocjs-hide"
                aria-hidden="true"
                id="autocjs-anchor-4"
                href="#autocjs-heading-4"
                aria-label="1．总分和十个因子得分的平均数"
              ></a>
            </h3>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="date" label="序号" width="180"></el-table-column>
              <el-table-column prop="name" label="因子" width="180"></el-table-column>
              <el-table-column prop="address" label="平均数"></el-table-column>
              <el-table-column prop="address" label="标准差"></el-table-column>
            </el-table> -->

            <!-- <div id="chart-641894" class="chart" style="width: 100%; height: 300px; overflow-x: auto; overflow-y: hidden; margin: 0px auto; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" data-src="/Scripts/chart.js?c=errorbar&amp;h=300&amp;x=躯体化,强迫症状,人际关系敏感,抑郁,焦虑,敌对,恐怖,偏执,精神病性,其它,总分&amp;v={M:[1.61,1.86,1.72,1.75,1.59,1.70,1.49,1.73,1.61,1.64,1.68],SD:[0.68,0.69,0.61,0.65,0.62,0.70,0.88,0.68,0.69,0.51,0.63]}" _echarts_instance_="ec_1576745798251"><div style="position: relative; overflow: hidden; width: 874px; height: 300px; padding: 0px; margin: 0px; border-width: 0px;"><canvas data-zr-dom-id="zr_0" width="874" height="300" style="position: absolute; left: 0px; top: 0px; width: 874px; height: 300px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div></div></div> -->
            <!-- <echartscom :chartData="option" autoresize /> -->
            <!-- <div class="chart" ref="chart" id="chart-00"></div>
            <h3 id="autocjs-heading-5" class="autocjs-heading">
              2．阳性检测情况
              <a
                class="autocjs-anchor autocjs-hide"
                aria-hidden="true"
                id="autocjs-anchor-5"
                href="#autocjs-heading-5"
                aria-label="2．阳性检测情况"
              ></a>
            </h3>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="date" label="序号" width="180"></el-table-column>
              <el-table-column prop="name" label="因子" width="180"></el-table-column>
              <el-table-column prop="address" label="平均数"></el-table-column>
              <el-table-column prop="address" label="标准差"></el-table-column>
            </el-table>
            <p class="am-text-sm">注：3＞因子分≥2.5为轻度症状；4＞因子分≥3为中度症状；因子分≥4为重度症状。</p> -->
            <h3 id="autocjs-heading-6" class="autocjs-heading">
              3．具体分析
              <a
                class="autocjs-anchor autocjs-hide"
                aria-hidden="true"
                id="autocjs-anchor-6"
                href="#autocjs-heading-6"
                aria-label="3．具体分析"
              ></a>
            </h3>

             <div  v-for="(item,index) in factor"
            :key="index">
               <h4 id="autocjs-heading-7" class="autocjs-heading">
              【{{item['name']}}】
              <a
                class="autocjs-anchor autocjs-hide"
                aria-hidden="true"
                id="autocjs-anchor-7"
                href="#autocjs-heading-7"
                aria-label="【躯体化】"
              ></a>
            </h4>
            <p class="am-article-lead">{{item.specification}}。</p>
            <div v-for="(item1,index1) in item['fct_cal']"
            :key="index1">
              在测查群体中，有
              <span class="underline">{{item1.count || 0}}</span>人是{{item1.name}}，所占比例为
              <span class="underline">{{item1.persent || 0}}%</span>；
            </div>
            <!-- <div class="chart" ref="chart1'" id='chart-001'></div> -->

            <!-- <div
             v-for="(item,index) in {{item.specification}}"
            :key="index"
              class="test chart"
              :id="'chart'+index1"
            >
             
              <echartscom
                :chartData="item1"
                v-bind:index="index1"
                autoresize
                v-on:childByValue="childByValues"
              />
            </div> -->
            <div  class="test chart"
              :id="'chart'+index">
                <echartscom
                :chartData="item.fct_cal"
                v-bind:index="index"
                autoresize
                v-on:childByValue="childByValues"
              />
            </div>
            <!-- 建议和对策
            {{}} -->
             </div>
            <!-- <h4 id="autocjs-heading-8" class="autocjs-heading">
              【强迫症状】
              <a
                class="autocjs-anchor autocjs-hide"
                aria-hidden="true"
                id="autocjs-anchor-8"
                href="#autocjs-heading-8"
                aria-label="【强迫症状】"
              ></a>
            </h4>
            <p
              class="am-article-lead"
            >它与临床上强迫表现的症状定义基本相同。主要指那种明知没有必要，但无法摆脱的无意义的思想、冲动、行为等表现，还有一些比较一般的感知障碍（如“脑子空了”，“记忆力不行”等）。</p>
            <p>
              在测查群体中，有
              <span class="underline">12</span>人是正常的，所占比例为
              <span class="underline">85.71%</span>；有
              <span class="underline">1</span>人存在轻度症状，所占比例为
              <span class="underline">7.14%</span>；有
              <span class="underline">1</span>人可能存在中、重度问题，所占比例为
              <span class="underline">7.14%</span>。
            </p> -->
            <!-- v=12,1,1是传的y轴数据 x是x轴数据 -->
            <div
              id="chart-555425"
              class="chart"
              style="width: 100%; height: 300px; overflow-x: auto; overflow-y: hidden; margin: 0px auto; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;"
              data-src="/Scripts/chart.js?c=pie&amp;h=300&amp;x=正常|轻度|中重度&amp;v=12,1,1"
              _echarts_instance_="ec_1576745798249"
            >
              <div
                style="position: relative; overflow: hidden; width: 874px; height: 300px; padding: 0px; margin: 0px; border-width: 0px;"
              >
                <canvas
                  data-zr-dom-id="zr_0"
                  width="874"
                  height="300"
                  style="position: absolute; left: 0px; top: 0px; width: 874px; height: 300px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"
                ></canvas>
              </div>
              <div></div>
            </div>
          </section>

          <!-- <h2 id="autocjs-heading-27" class="autocjs-heading">
         建议与对策
            <a
              class="autocjs-anchor autocjs-hide"
              aria-hidden="true"
              id="autocjs-anchor-27"
              href="#autocjs-heading-27"
              aria-label="八、建议与对策"
            ></a>
          </h2>
          <section>
            <h3 id="autocjs-heading-28" class="autocjs-heading">
              1．普及心理卫生知识和心理保健知识，传授心理保健技能。
              <a
                class="autocjs-anchor autocjs-hide"
                aria-hidden="true"
                id="autocjs-anchor-28"
                href="#autocjs-heading-28"
                aria-label="1．普及心理卫生知识和心理保健知识，传授心理保健技能。"
              ></a>
            </h3>
            <p>（1）充分利用院报、橱窗栏、广播、网站，宣传、普及心理健康知识，提高大学生心理保健的意识，增长心理健康的知识。报刊、电视、广播电台是对学生认知及周围学习发生较大影响作用的社会信息传播媒介，所以我们要充分利用这块教育阵地。</p>
            <p>（2）根据大学生共有的心理问题，及时举办各种专题讲座或群体学生心理辅导。</p>
            <p>（3）开展个别咨询，通过面谈、信函、电话、网上在线交流等形式开展个别学生咨询。</p>
            <p>（4）加大开设《大学生心理健康教育》等类似选修课，采用以课堂教学为主，辅以座谈、案例分析、心理电影、团体训练等形式，进行大学生心理健康教育。针对不同年级学生心理问题的类型、重点不同，开设不同的课程，在尽可能大的范围内重视大学生心理因素对其产生的影响。</p>
            <p>（5）加大心理健康咨询机构宣传力度，目的在于使大学生了解该机构的性质和功能，以增强对消除心理困惑的求助渠道的认识。</p>
            <h3 id="autocjs-heading-29" class="autocjs-heading">
              2．积极开展心理训练，提高心理自我调节能力。
              <a
                class="autocjs-anchor autocjs-hide"
                aria-hidden="true"
                id="autocjs-anchor-29"
                href="#autocjs-heading-29"
                aria-label="2．积极开展心理训练，提高心理自我调节能力。"
              ></a>
            </h3>
            <p>一些大学生个性懦弱、缺乏自信、孤僻内向、独立生活能力较差，因而他们的心理素质相对较低，人际交往不协调的状况较多。针对这一现状，可以组织其进行多次的心理素质训练。</p>
            <h3 id="autocjs-heading-30" class="autocjs-heading">
              3．积极开展对曾有心理问题的学生的追访工作。
              <a
                class="autocjs-anchor autocjs-hide"
                aria-hidden="true"
                id="autocjs-anchor-30"
                href="#autocjs-heading-30"
                aria-label="3．积极开展对曾有心理问题的学生的追访工作。"
              ></a>
            </h3>
            <p>对心理健康普查中存有心理问题的学生进行追访，目的是了解他们通过心理咨询后心理的发展变化如何，了解他们在解决内心苦恼、困惑时采用的具体方法和依靠的资源，以提高心理咨询水平。</p>
          </section> -->
        </section>
      </div>
    </article>
    <div class="footer">
      <el-button type="primary" onclick="javascript:window.print()">打印</el-button>
      <el-button type="success">
        <div id="btn-word" @click="ex()">导出</div>
      </el-button>
    </div>
  </div>
</template>

<script>
import echartscom from "@/components/echartscom.vue";
import $ from "jquery";
// import saveAs from "../../../assets/js/FileSaver" ,报错这个依耐必须npm包才正确，如下;
import saveAs from "file-saver";
// 第2种插件使用
//htmldocx是htmldocx2的依耐包
import htmldocx from "html-docx-js";
import htmldocx2 from "../../../../assets/js/htmldocx";
import { log } from "util";
import moment from "moment";

// $(function(){
//   $('#btn-word').on('click',function(){
//     $('.content').html2docx('文档')
//     console.log(111111111)
//     })
// })

export default {
  data() {
    return {
      msg: {
        chartData1: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" }
        ],
        chartData2: [
          { value: 2, name: "直接访问" },
          { value: 1, name: "邮件营销" },
          { value: 3, name: "联盟广告" },
          { value: 4, name: "视频广告" },
          { value: 123, name: "搜索引擎" }
        ]
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      myChart: "",
      option: "",
      // 量表信息
      factor: "",
      fct_cal: "",
      scalelist: "",
      name: "",
      intro: "",
      age:{max:"",min:"",aver:""},
      sexs:{a:0,b:0},
      time:[],
      times:{min:"",max:{}},
      ages:[]
    };
  },
  created() {
    // 有可能答案没保存全不是完整的json数据 或者只返回一个list字段
    var scalesobj = JSON.parse(localStorage.getItem("scalesobj"));
    this.factor = scalesobj["fct"];
    this.fct_cal = scalesobj["fct_cal"];
    this.scalelist = scalesobj["list"];
    this.name = scalesobj["list"][0]["scale_name"];
    this.intro = scalesobj["list"][0]["intro"];
    // 1计算每个因子的平均数，总人数某因子分数中和/人数
    // 2计算某因子的各个计算区间所占人数。
    var arr = [];
    var ages=[]
    this.factor.map((item, index) => {
      item["fct_cal"] = [];
      this.fct_cal.map((item1, index1) => {
      
        if (item.id == item1.factor_id) {
          item["fct_cal"].push(item1);
          return item;
        }
      });
    });
    // console.log(this.scalelist,this.factor)
    // 匹配结算区间id和答题卡的计算id
    var that =this
    var result;
      that.scalelist.map((item2, index2) => {  
         if (item2["birth_date"]) {
              var a = new Date().getTime() - new Date(item2["birth_date"]);
              var hours = a / 1000 / 60 / 60;
              var year = Math.floor(hours / (24 * 30 * 12));
              console.log(year);
             ages.push(year)
            } else {
             ages.push(0)

            }
            that.time.push(item2['start_test_time'])
              console.log(item2.sex)
              if (item2.sex == 0) {
                // item2.sex = "女";
                console.log(item2.sex)
                that.sexs['a']+=1
            } else {
                // item2.sex = "男";
                                console.log(item2.sex)

                 that.sexs['b']+=1

            }
        var sex = item2['sex']//判断
        var testime=item2['start_test_time']//测试时间
        console.log(item2)
          var result = JSON.parse(item2["result"]);
            for(var key in result){
              // 每个人的每个因子的一个计算区间
              var scaleid=result[key]['calc'][0]//因子的结算ID
              console.log(scaleid)
              // 得到每一个因子的结算ID同时找到因子ID
              if (scaleid) {
                var obj=that.factor.find((item1,index1)=>{
                           return item1.id==key
                })//找到因子id
                console.log(that.factor)
                var fcrcale= obj['fct_cal']
                
              //  循环这个因子的结算区间
                fcrcale.map((item3,index3)=>{
                     if (item3.id==scaleid) {
                          if (item3['count']) {
                            item3['count']=item3['count']+1
                            item3['persent']=(item3['count']/ that.scalelist.length* 100).toFixed(2)-0
                          }else{
                             item3['count']=1
                             item3['persent']=(item3['count']/ that.scalelist.length* 100).toFixed(2)-0

                          }
                     }
                })
                console.log(fcrcale)
                that.factor.map((item1,index1)=>{
                          if (item1.id==key) {
                             item1['fct_cal']=fcrcale
                          }
                })
              }
            }
          console.log( that.factor)
          //  循环每个人答题卡因子分数。看每个因子结算id是对哪一个
        });
     console.log(ages,that.time,that.sexs)
     var max = Math.max.apply(Math,ages);
     var min = Math.min.apply(Math,ages);
     var sum=0;
    //  ages=JSON.parse(JSON.stringify(ages))
     ages.map(item=>{
        sum += item;
        console.log(item)
     })
    var aver  = sum / ages.length;
    that.ages.min=min
    that.ages.max=max
    that.ages.aver=aver
    // 时间
    var maxtime=moment.max(that.time.map(a => moment(a))).format('YYYY-MM-DD');
    var mintime=moment.min(that.time.map(a => moment(a))).format('YYYY-MM-DD');
         console.log(maxtime,mintime)
        //  that.times.
        that.times.min=mintime
        that.times.max=maxtime

  },
  mounted() {
    // this.draw();
    $("#chart-00").data("option", this.option);
    // this.draw1();
    // $('.chart').each(function(){
    //     $(this).data('option',option)
    //     console.log($(this), $(this).data('option'))
    //           console.log( $(this).data('option'))

    //   })
  },
  methods: {
    childByValues(childValue, index) {
      //childValue就是子组件传过来的值
      // console.log(childValue, index)
      $("#chart" + index).data("option", childValue);
    },
    ex() {
      // $('.content').wordExport('生成文档')
      $(".content").html2docx("统计分析文档");
    },
    draw() {
      var chart = this.$refs.chart;
      //   console.log(chart);
      //   if (this.myChart) {
      //     this.myChart.clear();
      //   }
      this.myChart = this.$echarts.init(chart);
      console.log(this.myChart);
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
      this.option = option3;

      this.myChart.setOption(option3);
      this.myChart.resize();
      var that = this;
      //   this.myChart.on("click", function(params) {
      //     console.log(params);
      //     if (params.name == "潜在风险评估") {
      //       // that.$router.push('/crisis/asses/danger')
      //     } else if (params.name == "自杀倾向评估") {
      //       // that.$router.push('/crisis/asses/diebefore')
      //     } else if (params.name == "鉴别评估") {
      //       // that.$router.push('/crisis/asses/check')
      //     } else {
      //       // that.$router.push('/crisis/asses/lifeThing')
      //     }

      //     // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
      //   });
    }
  },
  components: {
    echartscom
  }
};
</script>

<style lang="scss" scoped>
.charttest{
  padding-left: 20%;
  margin-top: 50px;
}
.footer {
  background: rgba(157, 186, 255, 0.8);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px;
}
h2 {
  font-size: 20px;
  margin-top: 25px;
}
h3,
h4 {
  margin-top: 20px;
}
h1 {
  color: cornflowerblue;
  margin-top: 30px;
  text-align: center;
  font-size: 22px;
  small {
    font-weight: 400;
  }
}
section {
  p {
    font-size: 14px;
    line-height: 23px;
    margin-top: 7px;
  }
}
.chart {
  width: 100%;
  margin: auto auto;
  height: 400px;
}
.el-button {
  color: #fff;
  border: none;
}
</style>