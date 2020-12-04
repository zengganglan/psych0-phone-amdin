<template>
  <div class="main">
    <!-- 头部 -->
    <!-- <headson :headson="headson"></headson> -->
    <!-- 搜索栏 -->

    <div class="data" id="calendar">
      <table  class="trs">
        <tbody>
          <tr>
            <td width="20" align="right" valign="top">■</td>
            <td>
              说明：
              <br />1、请详尽和真实的填写下面所有信息，特别是联系方式，以便及时与您取得联系；
              <br />2、由于可用咨询时间变化很大，请在预约后等待接待人员与您核实具体咨询时间；
              <br />3、心理咨询可能需要持续几周或者更长时间，请事先做好充分的准备。
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <hr />
            </td>
          </tr>

          <tr>
            <td align="right">■</td>
            <td>您现在最需要接受帮助的主要问题是什么？</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <textarea
                name="question"
                id="question"
                class="text"
                style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 37px;"
                v-model="form.problem"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td align="right">■</td>
            <td>在近半年里，是否发生了对您有重大影响的事（如亲友的死亡、法律诉讼、失恋等）？</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <textarea
                name="event1"
                id="event1"
                class="text"
                style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 37px;"
                v-model="form.last_exp"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td align="right">■</td>
            <td>在您的成长经历中，是否有对您来说有特殊意义的事情？</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <textarea
                name="event2"
                class="text"
                id="event2"
                style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 37px;"
                v-model="form.grow_exp"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td align="right">■</td>
            <td>您希望心理咨询能够帮助您达到什么样的目标？</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <textarea
                name="purpose"
                class="text"
                id="purpose"
                style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 37px;"
                v-model="form.target"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td align="right">■</td>
            <td>其他您认为对咨询可能有帮助的事情：</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <textarea
                name="other"
                class="text"
                id="other"
                style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 37px;"
                v-model="form.other"
              ></textarea>
            </td>
          </tr>
          <!-- <tr>
              <td align="right">■</td>
              <td>请输入最方便联系到您的手机号码：</td>
            </tr>
            <tr>
              <td></td>
              <td><input name="mobile" type="text" class="text" size="30" value="15698455656" pattern="^1(3[0-9]|4[5-9]|5[0-9]|66|7[0-8]|8[0-9]|9[8-9])\d{8}$" required=""></td>
            </tr>
          -->
          <tr>
            <td align="right">■</td>
            <td>请点击选择您要预约的咨询师和咨询时间：</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <br />
              <!-- <input type="button" class="button" id="btn-select" value="点击选择咨询师和咨询时间" @click='addnumber'>
                <div id="msg">{{timecontent}}</div>
                <input type="hidden" name="consultant" id="consultant">
                <input type="hidden" name="consultantname" id="consultantname">
                <input type="hidden" name="yydate" id="yydate">
                <input type="hidden" name="yytime" id="yytime">
              <input type="hidden" name="room" id="room">-->
              <div class="dayevent">
                <span ref="toop" class="toop">提示:{{title}}</span>
                <!-- <full-calendar
                  :events="monthData"
                  class="test-fc"
                  :config="config"
                  ref="calendar"
                  first-day="1"
                  locale="fr"
                  @event-selected="eventClick"
                  @day-click="dayClick"
                  @event-mouseover="eventMouseover"
                  @event-mouseout="eventmouseout"
                  @view-render="viewrender"
                ></full-calendar> -->
                 <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeDate"
        v-on:isToday="clickToday"
        :markDate="arr"
      ></Calendar>

                 <div class="box">
        <div class="calendarbox">
          <!-- 接口定制只有预约时段可预约 -->
          <h3 style="backgroundColor:#008000">可预约时段</h3>
          <div class="times">
 <el-table
        ref="singleTable"
        :data="monthData['case1']"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column property="title" label="选择咨询主题"></el-table-column>
       

       
      </el-table>
            <!-- <p v-for="(item,index) in monthData['case1']" :key="index">{{item['title']}} </p> -->
          </div>
        </div>
        <!-- <div class="calendarbox">
          <h3 style="backgroundColor:#169BD5">已预约时段</h3>
          <div class="times">
            <p v-for="(item,index) in monthData['case2']" :key="index">{{item['title']}}</p>
          </div>
        </div>
       
        <div class="calendarbox">
          <h3 style="backgroundColor:#FF0000">正在咨询时段</h3>
          <div class="times">
            <p v-for="(item,index) in monthData['case4']" :key="index">{{item['title']}}</p>
          </div>
        </div> -->
                 </div>
              </div>
                        <div class="add" @click="makesure">提交预约</div>

            </td>
          </tr>

          <tr>
            <td colspan="2">
              <br />
              <hr />
              <br />
            </td>
          </tr>
          <!-- <tr>
              <td></td>
              <td>
                <input type="submit" value="提 交" class="button">
                <input type="reset" value="重 填" class="button">
                <input type="hidden" name="act" value="add">
              </td>
          </tr>-->
        </tbody>
      </table>
    </div>
    <!--点击更多触发事件@event-LimitClick='eventLimitClick'
    -->

    <!--只显示空闲时段 -->
    <!-- <ul id="msg">
      <li style="color:#19be6b;" title="学生段可预约此时段，管理员段点击后可以手动添加预约（即指定）">◼ 没有预约，空闲时段</li>
      <li style="color:#2d8cf0;" title="管理员点击后可以进行回复、确认、删除等处理">◼ 有人预约，尚未处理</li>
      <li style="color:#ff9900;" title="管理员已经接受的预约，等待学生端再次确认">◼ 有人预约，教师确认</li>
      <li style="color:#7C2E9B;" title="该时段已经添加了咨询记录，可以查看或者修改">◼ 开始咨询</li>
    </ul>-->
    <!-- <el-dialog title="咨询时间添加" :visible.sync="dialogFormVisible" width='70%'>
    
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="makesure()">确 定</el-button>
      </div>
    </el-dialog>-->
    <el-dialog title="咨询时间编辑" :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="沙盘组名称" :label-width="formLabelWidth">
          <el-input v-model="form1.name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input v-model="form1.unit_name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editsure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";
// import fullCalendar from 'vue-fullcalendar'
import { FullCalendar } from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.css";
import Calendar from "vue-calendar-component";

import moment from "moment";

export default {
  data() {
    return {
            arr: ["2019/6/2", "2019/6/3"],

      // 鼠标滑过显示内容
      title: "",
      Mouseoverflag: true,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        theme_id: "",
        problem: "",
        last_exp: "",
        grow_exp: "",
        target: "",
        other: ""
      },
      form1: {
        id: "",
        name: "",
        unit_name: ""
      },
      formLabelWidth: "100px",
      config: {
        locale: "zh-cn",
        header: {
          left: "month",
          center: "title",
          right: "today prev,next,prevYear,nextYear "
        },
        // allDaySlot : false,
        allDay: true,
        defaultView: "month",
        displayEventTime: false,
        eventLimit: 4,
        eventLimitText: "更多",
        allDayDefault: false,
        eventLimitClick: "popover"
      },
      monthData: [],
      timecontent: "",
      // 头部组件信息
      headson: ["心理咨询安排", "学生咨询预约"],
      multipleSelection: [],
      // 页码
      page: {
        currentpage: 1,
        countpage: 0,
        pagesize: "10",
        flag: false
      },
      currentRow: null,
      spanArr: [],
      pos: ""
    };
  },
  created() {
  var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    console.log(year);
    this.viewrender(year, month, day);  },
  methods: {
    abs() {},
  viewrender(year, month, day) {
      var that = this;
      that.monthData = { case1: [], case2: [], case3: [], case4: [] };
      this.axios
        .post("/api/v1/admin/counsel/monthList", {
          year: year,
          month: month
        })
        .then(function(res) {
          var data = res["data"]["data"];
          data.map((item, index) => {
            var dates = moment(item["start_time"]).get("date");
            if (day == dates) {
              console.log(dates);
              item["times"] =
                moment(item["start_time"]).format("HH:mm:ss") +
                "至" +
                moment(item["end_time"]).format("HH:mm:ss") +
                "， 咨询师：" +
                item["name"] +
                " ，功能室：" +
                item["funcname"];
              var obj = {};
                            obj["id"] = item["id"];

              obj["title"] = item["times"];
              obj["start"] = item["start_time"];
              obj["end"] = item["end_time"];
              var sta = item["status"];
              // 现在只有两个状态，1表示已被预约[如果是1看看是不是正在预约]。0表示空闲时段
                if (sta==1) {
                 var tt= moment().isBetween(item['start_time'], item['end_time'])
                 if (tt) {
                   sta=4
                 }
              }
              switch (sta-0) {
                case 0:

                  that.monthData["case1"].push(obj);
                  break;

                case 1:
                  that.monthData["case2"].push(obj);
                  break;
                case 3:
                  that.monthData["case3"].push(obj);
                  break;
                case 4:

                  that.monthData["case4"].push(obj);
                  break;
              }

            }
          });
        });
    },
 clickDay(data) {
      var that = this;
      setTimeout(function() {
        that.showflag = false;
      }, 800);
      console.log(data); //选中某天
      var year = moment(data).get("year");
      var month = moment(data).get("month") + 1;
      var day = moment(data).get("date");
      this.viewrender(year, month, day);
      // console.log(day);
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    },
    changeobj(data) {
      // 数据前提是相同的数据排在一起
      if (data == null) {
        return;
      }
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);

          // 记录循环每一次当前索引。第一次空数组第一个数据加1
          this.pos = 0;
        } else {
          if (data[i].id === data[i - 1].id) {
            // 如果后面跟前面相同的数据 就在上一次索引加一 索引不要去改变，以防几次重复记录增加1，把当前数据记录合并值为0 在前面的数据已经把他合并了
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            // 跟前面不同时直接合并记录直接为1 表示出现一次只合并一个相当于没合并
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
      console.log(this.spanArr);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //  列号为0 行号是偶数0 2 4 的位置开始合并相应的行数和列数  进行合并 合并是列号合并一列 行合并两行
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]; //从处理完的数组里获取
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col //相当于给给表格加上rowspan,colspan属性
        };
      }
    },

    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
      console.log(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(val);
      // 点击的当前数据// 跳转路由传参// 根据参数查询当前这个人的所有ar报告
           this.form.theme_id = val["id"];

      //获取参数方法:      this.$route.query.id;
    },
    // 分页·
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pagesize = val;
      this.getlist(this.page.currentpage, this.page.pagesize);
    },
    pageCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentpage = val;
      this.getlist(this.page.currentpage, this.page.pagesize);
    },
    handleEdit(index, row) {
      this.dialogFormVisible1 = true;
      this.form1.id = row.id;
      this.form1.name = row.name;
      this.form1.unit_name = row.unit_name;
    },
    editsure() {
      this.axios
        .post("/api/v1/admin/sand/group/edit", {
          id: this.form1.id,
          name: this.form1.name,
          unit_name: this.form1.unit_name
        })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("编辑成功");
            that.getlist(that.page.currentpage, that.page.pagesize);
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    handleDelete(index, row) {
      var id = [];
      if (row) {
        id.push(row.id);
      } else {
        if (this.multipleSelection.length !== 0) {
          this.multipleSelection.map(item => {
            id.push(item["id"]);
          });
        } else {
          this.$message("请确定选中了选项");
        }
      }
      var that = this;
      this.axios
        .post("/api/v1/admin/sand/group/delete", { id: id })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("删除成功");
            that.getlist(that.page.currentpage, that.page.pagesize);
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    addnumber() {
      this.dialogFormVisible = true;
    },
    makesure() {
      this.dialogFormVisible = false;
      var that = this;
      for (var key in this.form) {
        if (!this.form[key]) {
          this.$message("请填写完整详细基本问题信息和选择咨询时间主题");
          return;
        }
      }
      if (this.form.problem.length < 10 || this.form.problem.length > 1024) {
        this.$message("主要问题字数过少或者过多，在10个字到1024个区间");
        return;
      }
      console.log(this.form);
      this.axios
        .post("/api/v1/counsel/addAppointment", that.form)
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
              that.$message("增加成功");

          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    handleDelAll() {},
    changevalue() {},
    changeMonth(start, end, current) {
      // console.log("changeMonth", start, end, current);
    },
    eventClick(event, jsEvent, pos) {
      this.timecontent = event["content"];
      this.form.theme_id = event["id"];
      for (let index = 0; index < $(".test-fc .fc-title").length; index++) {
        $(".test-fc .fc-title")[index].style.color = "#fff";
      }
      jsEvent.target.style.color = "red";
    },
    dayClick(day, jsEvent) {
      // console.log("dayClick", day, jsEvent);
      // this.$router.push({path:'/Consultation/appointDetail'})
    },
    moreClick(day, events, jsEvent) {
      console.log("moreCLick", day, events, jsEvent);
    },
    eventMouseover(day, events, jsEvent) {
      // console.log(day, events, jsEvent)
      var that = this;
      if (that.Mouseoverflag) {
        this.$refs.toop.style.display = "block";
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop; //滚动条滚动的距离浏览器兼容
        this.$refs.toop.style.left = events.clientX + "px";
        this.$refs.toop.style.top = events.clientY + scrollTop + "px";
        this.title = day["title"];
        that.Mouseoverflag = false;
      }
    },
    eventmouseout() {
      this.Mouseoverflag = true;
      this.$refs.toop.style.display = "none";
    },
    eventLimitClick() {
      console.log("ssss");
    }
  },
  components: {
    headson: headson,
    pagination: pagination,
    "full-calendar": FullCalendar,
        Calendar: Calendar

  }
};
</script>

<style scoped lang="scss">
.box {
  // display: flex;
  // justify-content: space-around;
  // flex-wrap: wrap;
  .calendarbox {
    // width: 3rem;
    // margin-top: 10px;
    max-width: 410px;
    margin: auto;
    h3 {
      font-weight: 400;
      font-size: 15px;
      color: #ffffff;
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
    .times {
      min-height: 120px;
      font-size: 12px;
      border: 1px solid #9f9a9b;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
              border: 1px solid #9f9a9b;

      }
    }
  }
}
.trs {
  border-color: #ffffff;
  margin: 0 auto;
  textarea {
    color: #09c;
    width: 95%;
    background: #fff;
    border: 1px solid #cae7f7;
  }
  input.button {
    color: #fff;
    background: #025ea7;
    border: 1px solid #025ea7;
    cursor: pointer;
  }
}
#msg {
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: #09c;
  li {
    display: inline-block;
    margin-right: 10px;
  }
}
.red {
  background-color: blue;
}
.tr {
  height: 40px;
}

.work {
  width: 99%;
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
.search {
  margin-top: 50px;
  margin-left: 50px;
  ul {
    width: 100%;
    display: flex;
    padding-top: 25px;
    justify-content: center;
    li {
      width: 300px;
    }
  }

  input,
  select {
    height: 32px;
    width: 200px;
    outline: none;
    border: none;
    border: 2px solid #e2e2e2;
  }
  i {
    display: inline-block;
    font-size: 22px;
    vertical-align: middle;
    height: 32px;
    width: 30px;
    line-height: 32px;
    text-align: center;
    color: #bad6fc;
    position: relative;
    left: -5px;
    border: 2px solid #e2e2e2;
    border-left: none;
  }
}
.data {
  min-height: 640px;
  border: 1px solid #e6e6e8;
  margin: 0 5px;
  margin-top: 30px;
  background-color: #ffffff;
}
.toop {
  position: fixed;
  z-index: 999999;
  display: block;
  font-size: 14px;
  background-color: #f3fdf2;
  color: #b6e184;
  display: none;
  // left: 0;
}
.add,
.complete {
  width: 310px;
  height: 25px;
  margin: 15px auto;
  text-align: center;
  line-height: 25px;
  // position: relative;
  // top: 20px;
  color: rgb(53, 171, 240);
  border: 1px solid #dfd7d7;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>