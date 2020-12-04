<template>
  <div class="content">
    <div id="print">
      <!-- <input type="button" value="打 印" title="打印" onclick="javascript:self.print()" />
      <input type="button" id="btn-word" value="另存为Word" @click="ex()"/> -->
    </div>
    <!-- 个人信息 -->
    <div id="word-content">
      <h1 style="text-align:center">中学管理系统平台版心理档案</h1>
      <h2>学生个人信息</h2>
      <div id="english">Report of Psychological Test</div>
      <div class="info">
        <ul>
          <li>姓名：{{basedetail.name}}</li>
          <li>出生：{{basedetail.birth_date}}</li>
          <li>性别：{{basedetail.sex==1? '男':'女'}}</li>
          <li>电话：{{basedetail.phone}}</li>
        </ul>
      </div>

      <div class="pagebreak"></div>
      <!-- <h2>学生扩展信息</h2>
      <table class="tb_stat0" style="width:100%">
        <tbody>
          <tr>
            <th>#</th>
            <th>问题</th>
            <th>答案</th>
         </tr>
          <tr>
            <td>1</td>
            <td class="text-left">民族</td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td class="text-left">父亲年龄</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td class="text-left">父亲职业</td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td class="text-left">如果父亲不在世，请问发生在___岁时。（父亲健在的不填写）</td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td class="text-left">母亲年龄</td>
            <td></td>
          </tr>
          <tr>
            <td>6</td>
            <td class="text-left">母亲职业</td>
            <td></td>
          </tr>
          <tr>
            <td>7</td>
            <td class="text-left">如果母亲不在世，请问发生在___岁时。（母亲健在的不填写）</td>
            <td></td>
          </tr>
          <tr>
            <td>8</td>
            <td class="text-left">父母婚姻状况</td>
            <td></td>
          </tr>
          <tr>
            <td>9</td>
            <td class="text-left">如果父母离异的话，请问发生在___岁时。（父母未离异的不填写）</td>
            <td></td>
          </tr>
          <tr>
            <td>10</td>
            <td class="text-left">是否有寄养经历</td>
            <td></td>
          </tr>
          <tr>
            <td>11</td>
            <td class="text-left">寄养时的年龄（无寄养经历的不填写）</td>
            <td></td>
          </tr>
          <tr>
            <td>12</td>
            <td class="text-left">生源类型</td>
            <td></td>
          </tr>
          <tr>
            <td>13</td>
            <td class="text-left">独生子女</td>
            <td></td>
          </tr>
          <tr>
            <td>14</td>
            <td class="text-left">家庭经济状况</td>
            <td></td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <!-- 量表测试 -->
    <div>
      <h2>测试结果记录</h2>
        <el-table
        :data="scaledata"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="scale_name" label="量表名称"></el-table-column>
        <el-table-column prop="stu_name" label="学生"></el-table-column>
        <el-table-column prop="start_test_time" label="测试时间"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="times" label="耗时"></el-table-column>
        <el-table-column prop="valid" label="有效"></el-table-column>
      
      </el-table>
      <!-- <div align="center">
        <b>量表：同学关系问卷</b> 【
        <a href="test_report.asp?id=11002684&amp;key=0111116681104166" target="_blank">测试报告</a>】
      </div>
      <fieldset>
        <legend>测试结果</legend>
        <table class="tb_stat">
          <tbody>
            <tr>
              <th>因子</th>
              <td v-for="(item,key,index) in detail['result']" :key="index">{{item['count']}}</td>
            </tr>
            <tr>
              <td>得分</td>
              <td v-for="(item,key,index) in detail['result']" :key="index">{{item['score']}}</td>
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
        <div
          v-for="(item,key,index) in detail['result']"
          :key="index"
        >【{{item['desc']['factor']}}】{{item['desc']['calc']['explain']}}。</div>
        <br />【交际交友】在和同学之间的交际和你的交友方面，你常常顺其自然，不拒绝别人的主动交往，自己也不太主动和别的同学交往；被动的交友模式可能会错过很多交好朋友的机会，可以尝试主动与他人打交道，积极参加集体活动和主动寻求他人帮助都是不错的办法。
        <br />【待人接物】你在待人接物上表现为多面性，有时候能够很好地应对身边人、事，有时候你又表现出厌烦和冷淡并随着情绪的变化而变化；你需要学会控制自己的情绪，不要因为自己情绪的变化而影响到你对周围人和事的态度，这样会让他们感到莫名其妙，对他们也是不公平的。
        <br />【与异性交往】在和异性交往中，你存在比较严重的困扰，在异性面前你常常表现出拘谨、腼腆和及其不自然，应该说你缺乏和异性同学交往的经验。与异性的正常交往对于人格的发展和完善来说都是非常重要的，你可以从异性朋友的身上学到不同的思维方式，开阔眼界。你可能对异性交往有一些误解或者是缺乏这方面的技巧，你需要找到原因，然后对症下药。多参加集体活动，或者与异性朋友讨论学习问题等，可以使你有机会与异性朋友相处，希望你勇敢地迈出第一步。
        <br />【总分】总的说来，你在和你的同学、朋友的交往过程中常常出现困扰和迷茫，也许你并不希望这样，但在你的学习和生活中确实因为和他们相处不太好而影响自己。（当然，我们的测量结果仅作参考！）也许你也想真诚地与人交往，但是方式方法上可能有些问题，你需要好好地反省一下，找准自己的问题所在，学习待人处事方面的技巧是很重要的。不要太斤斤计较，不要轻易打断别人说话，不要因为自己情绪的变化而改变对周围人的态度，以一颗真诚，宽容的心去对待他人。人际交往是人与人互动的结果，只要自己问心无愧，对结果也无须强求。
        <br />
      </fieldset>

      <fieldset style="line-height:150%;">
        <legend>原始选择</legend>
        <table class="t-end">
          <tbody>
            <tr>
              <td align="right">
                1．
                <span class="answer">1</span>
              </td>
              <td align="right">
                2．
                <span class="answer">1</span>
              </td>
              <td align="right">
                3．
                <span class="answer">1</span>
              </td>
              <td align="right">
                4．
                <span class="answer">1</span>
              </td>
              <td align="right">
                5．
                <span class="answer">1</span>
              </td>
              <td align="right">
                6．
                <span class="answer">2</span>
              </td>
              <td align="right">
                7．
                <span class="answer">2</span>
              </td>
              <td align="right">
                8．
                <span class="answer">1</span>
              </td>
              <td align="right">
                9．
                <span class="answer">1</span>
              </td>
              <td align="right">
                10．
                <span class="answer">2</span>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset> -->
    </div>
    <!-- 访谈记录 -->
   <!-- <div>
      <h2>访谈记录</h2>
       <el-table
        :data="coachdata"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="location" label="访谈位置"></el-table-column>
        <el-table-column prop="send_time" label="发送时间"></el-table-column>
        <el-table-column prop="times" label="访谈时段"></el-table-column>
        <el-table-column prop="name" label="访谈对象"></el-table-column>
        <el-table-column prop="counselor_name" label="咨询师"></el-table-column>
        <el-table-column prop="staus" label="访谈状态"></el-table-column>

       
      </el-table>
     </div> -->
    <!-- 咨询记录列表 -->
    <div>
      <h2>咨询记录</h2>

      <el-table
        :data="zixundata"
        border
        style="width: 100%; margin-top: 20px"
      >
       
     <el-table-column
      prop="problem"
      label="问题"
     >
    </el-table-column>
     <el-table-column
      prop="date"
      label="预约日期"

      >
    </el-table-column>
     
      <el-table-column
        prop="times"
        label="咨询时间"
        >
      </el-table-column>
      <el-table-column
        prop="case"
        label="问题类型"
       >
      </el-table-column>
      <el-table-column
        prop="proc_idea"
        label="处理意见"
        >
      </el-table-column>
     
     
       <el-table-column
        prop="dos"
        label="状态"
       >
      </el-table-column>
 
     </el-table>
    </div>

    <!-- 问题留言列表 -->
    <div>
          <h2>问题留言记录</h2>

      <el-table
        :data="messagedata"
        border 
        style="width: 100%; margin-top: 20px"
       
      >
       <el-table-column
      prop="theme"
      label="留言主题"
      >
    </el-table-column>
        <el-table-column
      prop="content"
      label="留言内容"
     >
    </el-table-column>
    
     
   
     <el-table-column
        prop="replys_count"
        label="回复数"
      >
      </el-table-column>
       <el-table-column
        prop="create_time"
        label="更新时间"
       >
      </el-table-column>
      
    
    </el-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { global } from "../../../global/global";

import $ from "jquery";
// import saveAs from "../../../assets/js/FileSaver" ,报错这个依耐必须npm包才正确，如下;
import saveAs from 'file-saver'
// jquery和saveAs是下面两种插件【wordexport，htmldocx2】的共同依耐包，所以必须引入，不同的是htmldocx2可以对cavas进行解析
// 第1种插件使用
import wordexport from  "../../../assets/js/jquery.wordexport";
// 第2种插件使用。虽然依耐save和htmldoc,但是这个地方不用引入
//html-docx-js是htmldocx2的依耐包
// html-docx-js这个包只能在node环境使用，不适合vue-cli.，但是可以把打包代码引过来放到本地文件去引用这个依耐
import htmldocx2 from  "../../../assets/js/htmldocx";
// 注，如果在外面使用 注意jquery 要初始化 不然不会响应
	// $("#btn-word").click(function(event) {
  //   $('.content').wordExport('生成文档')   
  // });

// 第一种html2docx插件的使用
$(function(){
      console.log(111111111)

  $('#btn-word').on('click',function(){$('.content').html2docx('文档')})
})

//第二种 wordexport插件的使用
// jQuery(document).ready(function($) {
//      console.log(12)

// 	$("#btn-word").click(function(event) {
//     $('.content').wordExport('生成文档')   
// 	});
// });


export default {
  data() {
    return {
      option:"",
      type: 1,
      detail: "",
      id: this.$route.query.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
      newsinfo: {}, // 新闻对象
      tableData: [
      ],
      alldata:[],
      messagedata:[],
      zixundata:[],
      coachdata:[],
      scaledata:[],
      basedetail:{}
    };
  },
  created() {
    // console.log(this.$route.query.useid)
    // this.getNewsInfo();
    // console.log(this.$route.matched);
    this.alldata=JSON.parse(localStorage.getItem('alldata'))
    var checked=  JSON.parse(localStorage.getItem('checked'))    
    // 把选中条目的留言，咨询 访谈 测评筛选出来
    var checkeddata=[]
    checked.map((item,index)=>{
      this.alldata.map((item1,index1)=>{
         if (item==item1.idnumber) {
           checkeddata.push(item1)
         }
      })
    })
    var that = this
    console.log(checkeddata)
     checkeddata.map((item2,index2)=>{
         if (item2.types==1) {
            that.messagedata.push(item2)
         }else if (item2.types==2) {
              that. zixundata.push(item2)
         
         }else if (item2.types==3) {
                       that.coachdata.push(item2)

         }else{
            that.scaledata.push(item2)

         }
     })
     that.coachdata.map((item,index)=>{
             if(item.type==1){
               item.type='团辅'
             }else{
               item.type='个人'
             }
             item['times']=item['start_time']+'—'+item['end_time']
             var a = new Date(item['start_time']).getTime()
             var b = new Date(item['end_time']).getTime()
             var c = new Date().getTime()
             if(c<a && a<=b){
               item['staus']='未开始'
             }else if(c>b && b>=a){
               item['staus']='已结束'
             } else{
               console.log(a,b,c)
                item['staus']='正在进行'
             }
          })
            that.zixundata.map((item,index)=>{
              item["times"] =
                moment(item["start_time"]).format("HH:mm:ss") +
                "至" +
                moment(item["end_time"]).format("HH:mm:ss")
              item['date']=moment(item["start_time"]).format("YYYY-MM-DD")
               var sta = item["trace_type"]-0;
              switch (sta) {
                case 0:
                  item["case"]='无需关注';
                  break;
                case 1:
                  item["case"]='学业问题';
                  break;

                case 2:
                  item["case"]='恋爱关系';
                  break;
                case 3:
                  item["case"]='人际交往';
                  break;
                case 4:
                  item["case"]='职业发展';
                  break;
                case 5:
                  item["case"]='情绪问题';
                  break;
                case 6:
                  item["case"]='躯体疾病';
                  break;
              }
              if (sta==0) {
                  item['dos']='未处理'
              }else{
                item['dos']='已处理'
              }
           
            })
     console.log(that.alldata, that.messagedata,checked)

  },
  mounted() {
             this.baseinfo(this.$route.query.useid) 
// 做每个量表答题卡echart图标需要
    // this.getlist();
    // this.print(this.type);
    //  var option=this.option
    // $('.chart').each(function(){
    //   $(this).data('option',option)
    //   console.log($(this), $(this).data('option'))
    //         console.log( $(this).data('option'))

    // })
  },
  beforeCreated() {

    // this.getlist();
    //  console.log(this.$route.query.id)
  },
  methods: {
    ex() {
      console.log( $('.content'),this.option)
      // $('.content').wordExport('生成文档')
      // bug这个地方不起作用
      $('.content').html2docx('个人档案',this.option)
    },
    getNewsInfo() {
      // 获取新闻详情
      this.$http.get("/api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取新闻失败！");
        }
      });
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
          params: { id: 19 }
        })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            that.detail = res["data"]["data"];
          }
        });
    },
    draw() {
      var chart = this.$refs.chart;
      // console.log(chart);
      if (this.myChart) {
        this.myChart.clear();
      }
      this.myChart = this.$echarts.init(chart);
      // var option;
      var option1 = {
        title: {
          text: "剖析图"
        },
        color: ["#3398DB"],
        tooltip: {},
        legend: {
          x: "center",
          data: ["销量"]
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "言语（sales）", max: 6500 },
            { name: "交际（Administration）", max: 16000 },
            { name: "待人（Information Techology）", max: 30000 },
            { name: "交谈（Customer Support）", max: 38000 },
            { name: "交际（Development）", max: 52000 },
            { name: "市场（Marketing）", max: 25000 }
          ]
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配（Allocated Budget）",
                label: {
                  normal: {
                    show: true,
                    formatter: function(params) {
                      return params.value;
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      var option2 = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        tooltip: {},
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
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
          // axisPointer: {
          //   // 坐标轴指示器，坐标轴触发有效
          //   type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          // }
               formatter: function (params, ticket, callback) {
            console.log(params);
            var showHtm="";
                            var name = params[0].name

            for(var i=0;i<params.length;i++){
                //x轴名称
                var name = params.name
                //名称
                var text = params[i][3];
                //值
                var value = params[i][2];
                showHtm+= text+ '--' + name + ' 得分：' + value+'<br>'
            }
            return showHtm;
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
      if (this.type == 1) {
        this.option = option1;
      } else if (this.type == 2) {
        this.option = option2;
      } else {
        this.option = option3;
      }
      this.myChart.setOption(this.option);
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
      
    },
     baseinfo(id) {
      console.log(id);
      var that = this;
      that.axios
        .get("/api/v1/user/viewDetails")
        .then(function(res) {
          console.log(res);
          var detail = res["data"]["data"]
        
          // that.values.sex = detail.sex;
          detail["except"] = detail.auth_group_id;
          detail["birth_day"] = detail.birth_date;
          console.log(detail);
          that.basedetail = detail;
        });
    },
  }
  //   components: {
  //     // 用来注册子组件的节点
  //     "comment-box": comment
  //   }
};
</script>

<style scoped lang='scss'>
h2 {
  font-size: 20px;
  border-bottom: 4px double #000000;
  color: #009999;
  text-align: center;
  margin-top: 20px;
}
#print {
  background: #99ff99;
  padding: 3px;
  border: 1px solid #009999;
}
.chart {
  width: 100%;
  margin: auto auto;
  height: 400px;
}
table.tb_stat0 th,
table.tb_stat0 td {
  border: 1px solid #000;
  padding: 3px;
  text-align: center;
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
</style>