<template>
  <div class="main">
    <!-- 头部 -->
    <!-- 搜索栏 -->
    <div class="search" v-if="!showflag">
      <ul>
        <li>
          <div>
            <el-input placeholder="请输入内容" v-model="formLabelWidth" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </li>
      </ul>
    </div>
    <div class="data" id="calendar" v-if="showflag" style="padding-top:30px">
      <!-- <full-calendar :events="monthData" class="test-fc"
                      :config="config"
                      ref="calendar"
                     first-day='1' locale="fr"
                     @event-selected="eventClick"
                     @day-click='dayClick'
                     @event-mouseover='eventMouseover'
      ></full-calendar>-->
      <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeDate"
        v-on:isToday="clickToday"
        :markDate="arr"
      ></Calendar>
    </div>
    <div v-else>
      <div class="box">
        <div class="calendarbox">
          <h3 style="backgroundColor:#008000">放松室</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
        <div class="calendarbox">
          <h3 style="backgroundColor:#169BD5">训练室</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
        <div class="calendarbox">
          <h3 style="backgroundColor:#FF9900">培训室</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
        <div class="calendarbox">
          <h3 style="backgroundColor:#FF0000">沙盘室</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
        <div class="calendarbox">
          <h3 style="backgroundColor:#999999">忙碌状态</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
        <div class="calendarbox">
          <h3 style="backgroundColor:#333333">开始咨询</h3>
          <div class="times">张老师 9:00-10:00</div>
        </div>
      </div>
      <div style="text-align: center;margin-top:10px">
          <el-button type="primary" plain @click="back()">返回</el-button>
                    <el-button type="primary" plain @click="back()">增加</el-button>

      </div>
    </div>
    <div>
      <!-- <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="pageCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10,20,30,40,50,60]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.countpage"
        ></el-pagination>
      </div>-->
    </div>
    <!-- <div class="add" @click="addnumber">新增预约</div> -->
    <el-dialog title="咨询时间添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="星期" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="请选择" @change="changevalue" value-key>
            <el-option
              v-for="item in this.$store.state.sandgroups"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间起" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 210px;" type="time"></el-input>
        </el-form-item>
        <el-form-item label="时间止" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 210px;" type="time"></el-input>
        </el-form-item>
        <el-form-item label="咨询师" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="请选择" @change="changevalue" value-key>
            <el-option
              v-for="item in this.$store.state.sandgroups"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.unit_name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="makesure()">确 定</el-button>
      </div>
    </el-dialog>
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

export default {
  data() {
    return {
      arr: ["2019/6/2", "2019/6/3"],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      showflag: true,
      form: {
        name: "",
        unit_name: ""
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
        defaultView: "month",
        displayEventTime: false
      },
      monthData: [
        {
          title: "08:30-10:00 吴璇", // 事件内容
          start: "2019-4-25", // 事件开始时间
          end: "", // 事件结束时间
          cssClass: "red" // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title: "08:30-10:00 徐媛",
          start: "2019-4-26",
          end: "",
          cssClass: "blue"
        },
        {
          title: "08:30-10:00 周磊",
          start: "2019-4-24",
          end: "",
          cssClass: "blue"
        },
        {
          title: "08:30-10:00 夏雪",
          start: "2019-4-26",
          end: "",
          cssClass: "blue"
        },
        {
          title: "08:30-10:00 小雨",
          start: "2019-4-20",
          end: "",
          cssClass: "blue"
        },
        {
          title: "08:30-10:00 任彦达",
          start: "2019-4-09",
          end: "",
          cssClass: "blue"
        }
      ],
      // 头部组件信息
      headson: ["访谈邀请安排", "邀请时间记录"],
      tableData: [
        {
          id: "1",
          a1: "周一",
          a2: "2:00-400",
          a3: "50"
        },
        {
          id: "1",
          a1: "周一",
          a2: "2:00-400",
          a3: "50"
        }
      ],
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
    // this.getlist(this.page.currentpage,this.page.pagesize);
    this.changeobj(this.tableData);
  },
  methods: {
    clickDay(data) {
      this.showflag = false;
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    },
    back(){
       this.showflag=true
    },
    getlist(currentpage, pagesize) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/admin/sand/group/list", {
          page: currentpage,
          size: pagesize
        })
        .then(function(res) {
          if (res["data"].code == 0) {
            that.page.countpage = res["data"]["data"]["total"];
            that.tableData = res["data"]["data"]["list"];
          }
          console.log(res);
        });
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
      var id = val["id"];
      var name = val["name"];
      console.log(val);
      // 点击的当前数据// 跳转路由传参// 根据参数查询当前这个人的所有ar报告
      this.$router.push({
        path: "/game/gamedetail",
        query: { id: id, name: name }
      });
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
      console.log(this.form);
      this.axios
        .post("/api/v1/admin/sand/group/add", {
          name: that.form.name,
          unit_name: that.form.unit_name
        })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("增加成功");
            that.getlist(that.page.currentpage, that.page.pagesize);
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    handleDelAll() {},
    changevalue() {},
    changeMonth(start, end, current) {
      console.log("changeMonth", start, end, current);
    },
    eventClick(event, jsEvent, pos) {
      console.log("eventClick", event, jsEvent, pos);
    },
    dayClick(day, jsEvent) {
      console.log("dayClick", day, jsEvent);
    },
    moreClick(day, events, jsEvent) {
      console.log("moreCLick", day, events, jsEvent);
    },
    eventMouseover() {
      console.log(1);
    }
  },

  components: {
    headson: headson,
    pagination: pagination,
    Calendar: Calendar
  }
};
</script>

<style scoped lang="scss">
.red {
  background-color: blue;
}
.tr {
  height: 40px;
}

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
.search {
  margin-top: 50px;
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
  margin: 0 10px;
  margin-top: 30px;
  background-color: #ffffff;
}
.box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .calendarbox {
    width: 1.8rem;
    margin-top: 10px;
    h3 {
      font-weight: 400;
      font-size: 15px;
      color: #ffffff;
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
    div {
      min-height: 120px;
      font-size: 12px;
      border: 1px solid #9f9a9b;
    }
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
  top: -20px;
  color: gray;
  border: 1px solid #dfd7d7;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>