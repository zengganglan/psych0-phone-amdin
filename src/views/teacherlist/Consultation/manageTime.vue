<template>
  <div class="main">
    <!-- 头部 -->
    <!-- <headson :headson="headson"></headson> -->
    <!-- 搜索栏 -->
    <div class="search">
      <ul>
          <!-- <li>
           <el-input placeholder="请输入咨询师星期几等关键字"  v-model="formLabelWidth" class="input-with-select" >
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </li>     -->
      </ul>
    </div>
    <!-- <div class="work">
      <span class="del" @click="handleDelete">
        删除
        <i class="iconfont icon-trash"></i>
      </span>
    </div> -->
    <div class="data">
      <el-table :data="tableData" border style="width: 100%; margin-top: 20px">
        <el-table-column type="selection" width="30"></el-table-column>
        <!-- <el-table-column prop="id" label="序号" width="30"></el-table-column> -->
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="times" label="时间段"></el-table-column>
        <el-table-column prop="name" label="咨询师"></el-table-column>
        <el-table-column prop="funcname" label="所在功能室"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="pageCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10,20,30,40,50,60]"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="page.countpage"
        ></el-pagination>
      </div>
    </div>
    <div class="add" @click="addnumber">新增</div>
    <el-dialog title="新增预约安排" :visible.sync="dialogFormVisible" width="98%">
      <el-form :model="form">
        <ul>
          <li class="q q1" v-if="step==1">
            <el-form-item label="选择日期" :label-width="formLabelWidth">
              <el-date-picker
                :picker-options="pickerOptions1"
                v-model="date"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </li>
          <li class="q q2" v-if="step==2">
            <el-form-item label="咨询师" :label-width="formLabelWidth">
              <el-select
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词搜索咨询师"
                :remote-method="remoteMethod"
                :loading="loading"
                v-model="form.counselor"
                @change="changevalue"
                value-key
              >
                <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="form.remarks" autocomplete="off" style="width: 210px;"></el-input>
            </el-form-item>
          </li>
          <li class="q q3" v-if="step==3">
            <el-form-item label="时间起" :label-width="formLabelWidth">
              <el-input
                v-model="form.start_time"
                autocomplete="off"
                style="width: 120px;"
                type="time"
              ></el-input>
              <el-card
                class="box-card"
                style="width: 150px; display:inline-block;position:absolute;top:-30px;right:10px;height:190px;overflow-Y: scroll"
              >
                <!-- <div slot="header" class="clearfix" style="padding:0px">
    <span >卡片名称</span>
                </div>-->
                <div
                  style="color:gray;border-bottom:1px solid #DCDFE6;text-algin:center"
                >已用时段（不能冲突）:</div>

                <div
                  v-for="(item,index) in freetime"
                  :key="index"
                  class="text item"
                >{{' ' + item['times'] }}</div>
              </el-card>
            </el-form-item>
            <el-form-item label="时间止" :label-width="formLabelWidth">
              <el-input
                v-model="form.end_time"
                autocomplete="off"
                style="width: 120px;"
                type="time"
              ></el-input>
            </el-form-item>
          </li>
          <li class="q q4" v-if="step==4">
            <el-form-item label="咨询室" :label-width="formLabelWidth">
              <el-select placeholder="请选择" v-model="form.func_id" value-key>
                <el-option v-for="item in funcs" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </li>
        </ul>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="retu()">上一步</el-button>
        <el-button type="primary" @click="next()" v-if="step!==4">下一步</el-button>
        <el-button type="primary" @click="makesure()" v-else>确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="咨询时间编辑" :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="星期" :label-width="formLabelWidth">
          <el-input v-model="form1.name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="时间起" :label-width="formLabelWidth">
          <el-input v-model="form1.unit_name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="时间止" :label-width="formLabelWidth">
          <el-input v-model="form1.unit_name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="咨询师" :label-width="formLabelWidth">
          <el-select v-model="form1.unit_name" placeholder="请选择" value-key>
            <el-option
              v-for="item in funcs"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form1.unit_name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editsure">确 定</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";
import moment from "moment";

export default {
  data() {
    return {
      step: 1,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      loading: false,
      select:"",
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      roles: "",
      funcs: "",
      counselorname: "",
      form: {
        counselor: "",
        func_id: "",
        start_time: "",
        end_time: "",
        remarks: ""
      },
      freetime: [],
      date: "",
      form1: {
        id: "",
        name: "",
        unit_name: ""
      },
      formLabelWidth: "70px",
      // 头部组件信息
      headson: ["咨询时间管理", "设置咨询时间"],
      tableData: [],
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
    this.getlist(this.page.currentpage, this.page.pagesize);
    this.changeobj(this.tableData);
    this.getfunc();
  },
  methods: {
    getlist(currentpage, pagesize) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/admin/counsel/list", {
          page: currentpage,
          size: pagesize
        })
        .then(function(res) {
          if (res["data"].code == 0) {
            that.page.countpage = res["data"]["data"]["total"];
            var data = res["data"]["data"]["list"];
            data.map((item, index) => {
              item["date"] = moment(item["start_time"]).format("YYYY-MM-DD");
              item["times"] =
                moment(item["start_time"]).format("HH:mm:ss") +
                "至" +
                moment(item["end_time"]).format("HH:mm:ss");
            });
            console.log(data);
            that.tableData = res["data"]["data"]["list"];
          }
        });
    },
    getfunc() {
      var that = this;
      this.axios.post("/api/v1/admin/func/selectList").then(function(res) {
        if (res["data"]["code"] == 0) {
          that.funcs = res["data"]["data"];
        }
      });
    },
    remoteMethod(query) {
      var that = this;
      this.axios
        .get("/api/v1/tools/selectUserList?key=" + query)
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.roles = res["data"]["data"];
          }
        });
    },
    changeobj(data) {
      // 数据前提是相同的数据排在一起（不太科学） 这样做是记录他们数据出现次数[3, 0, 0, 1, 1, 1, 1]因为使用element的合并数据行和列当前方法
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
      //
      //  列号为0 行号是偶数0 2 4 的位置开始合并相应的行数和列数  进行合并 合并是列号合并一列 行合并两行
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]; //合并的行依次从处理完的数组里获取
        // 合并的列 判断_row是否》0 大于0表示列合并一列 否则为0表示被合并了，不在合并数据不在显示，为1正常显示
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
      // this.getlist(this.page.currentpage, this.page.pagesize);
    },
    pageCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentpage = val;
      // this.getlist(this.page.currentpage, this.page.pagesize);
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
            // that.getlist(that.page.currentpage, that.page.pagesize);
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
            // that.getlist(that.page.currentpage, that.page.pagesize);
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
      // 判断选择功能室当天同样时间段有没有被使用
      var timearrs = [];
      var funcs = [];
      var that = this;
      if (this.date && this.form.counselor) {
        var year = moment(this.date).year();
        var month = moment(this.date).month() + 1;
        this.axios
          .post("/api/v1/admin/counsel/monthList", {
            year: year,
            month: month
          })
          .then(function(res) {
            var data = res["data"]["data"];
            data.map((item, index) => {
              //  不能根据名字匹配，因为名字可以一致、根据id匹配
              //判断选中的那一天在冲突的时间内是否被使用
              var dates = moment(item["start_time"]).format("YYYY-MM-DD");
              if (dates == that.date) {
                var obj = {};
                obj["start_time"] = item["start_time"];
                obj["end_time"] = item["end_time"];
                obj["func_id"] = item["func_id"];
                // 功能室id
                var times =
                  moment(item["start_time"]).format("HH:mm:ss") +
                  "至" +
                  moment(item["end_time"]).format("HH:mm:ss");
                obj["times"] = times;
                timearrs.push(obj);
              }
            });
            // 把所有同一天的不同时间段数据找出来找到和当前选中时间点有冲突的时间段。在冲突时间段匹配和当前选中功能室是否被占用
            timearrs.find((item, index) => {
              var start = moment(item["start_time"]).format("HH:mm"); //结束时间小于=它
              var end = moment(item["end_time"]).format("HH:mm"); //开始时间大于=它
              var a = that.compareTime(start, that.form.end_time); //true
              var b = that.compareTime(that.form.start_time, end); //true
              if (!a && !b) {
                //找到时间段冲突的数据
                funcs.push(item);
              }
            });
            // 在冲突的数据中匹配功能室是否被占用-
            var a = funcs.find((item, index) => {
              return item["func_id"] == that.form.func_id;
            });
            if (a) {
              that.$message("此功能室在选择的使用时间点已被占用");
              return;
            } else {
              // console.log(1213455455555555)
              that.dialogFormVisible = false;
              var d1 = new Date(that.date);
              var d2 = new Date(that.date);
              var _t1 = that.form.start_time.split(":");
              var _t2 = that.form.end_time.split(":");
              d1.setHours(_t1[0], _t1[1]);
              that.form.start_time = moment(d1).format("YYYY-MM-DD HH:mm:ss");
              d2.setHours(_t2[0], _t2[1]);
              that.form.end_time = moment(d2).format("YYYY-MM-DD HH:mm:ss");
              that.axios
                .post("/api/v1/admin/counsel/addTheme", that.form)
                .then(function(res) {
                  if (res["data"]["code"] == 0) {
                    that.$message("增加成功");
                    that.getlist(that.page.currentpage, that.page.pagesize);
                  } else {
                    that.$message(res["data"]["msg"]);
                  }
                });
            }
          });
      }
    },
    compareTime(_time1, _time2) {
      //时间大小比较函数,时间一 8:00-8:40,和时间二 8:30-9:20
      // 比较每个时间1的开始和时间2的结束时间结束
      var date = new Date();
      var _t1 = _time1.split(":");
      var _t2 = _time2.split(":");
      return date.setHours(_t1[0], _t1[1]) >= date.setHours(_t2[0], _t2[1]);
    },
    judgeConfig(userStartTime, userEndTime) {
      //时间大小比较函数
      var timeArr = [];
      if (timeArr.length == 0) {
        timeArr.push([userStartTime, userEndTime]);
      }
      for (var i = 0; i < timeArr.length; i++) {
        var confi1 = this.compareTime(userStartTime, timeArr[i][0]);
        var confi2 = this.compareTime(userStartTime, timeArr[i][1]);
        var confi3 = this.compareTime(userEndTime, timeArr[i][0]);
        var confi4 = this.compareTime(userEndTime, timeArr[i][1]);
        if ((confi1 && !confi2) || (confi3 && !confi4)) {
          console.log("时间冲突了");
        } else {
          timeArr.push([userStartTime, userEndTime]);
        }
      }
    },

    changevalue(a) {
      var that = this;
      that.roles.map((item, index) => {
        if (item["id"] == a) {
          that.counselorname = item["name"];
        }
      });
    },
    retu() {
      this.step--;
      if (this.step <= 1) {
        this.step = 1;
        // 按钮变灰
      }
      console.log(this.step);
      this.show(this.step);
    },
    next() {
      this.step++;
      if (this.step > 4) {
        this.step = 4;
        // 按钮变灰出现确定按钮
      }
      this.show(this.step);
    },
    show(step) {
      var that = this;
      if (step == 1) {

      } else if (step == 2) {
        //检测时间不能不为空
        if (!this.date) {
          that.$message('请填日期')
           that.step = 1;
         }
      } else if (step == 3) {
        console.log(this.date, this.form.counselor);
        // 根据咨询师和选中日期月历表晒选当天以被使用的数据段显示界面
        if (this.date && this.form.counselor) {
          var year = moment(this.date).year();
          var month = moment(this.date).month() + 1;
          this.axios
            .post("/api/v1/admin/counsel/monthList", {
              year: year,
              month: month
            })
            .then(function(res) {
              that.freetime = [];
              var data = res["data"]["data"];
              data.map((item, index) => {
                var dates = moment(item["start_time"]).format("YYYY-MM-DD");
                // bug 根据咨询师名字判断但是名字可以一致。加id字段
                if (
                  dates == that.date &&
                  item["counselor"] == that.form.counselor
                ) {
                  var obj = {};
                  obj["start_time"] = item["start_time"];
                  obj["end_time"] = item["end_time"];
                  var times =
                    moment(item["start_time"]).format("HH:mm:ss") +
                    "至" +
                    moment(item["end_time"]).format("HH:mm:ss");
                  obj["times"] = times;
                  that.freetime.push(obj);
                }
              });
            });
        }else{
        that.$message('请必填日期和咨询师')
          that.step = 2;
        }
      } else {
        //step=4
        if (this.form.start_time && this.form.end_time) {
            // 检查选中时段有没有被占用
        that.freetime.find((item, index) => {
          var start = moment(item["start_time"]).format("HH:mm"); //结束时间小于=它
          var end = moment(item["end_time"]).format("HH:mm"); //开始时间大于=它
          var a = that.compareTime(start, that.form.end_time); //true
          var b = that.compareTime(that.form.start_time, end); //true
          console.log(a, b);
          if (!a && !b) {
            that.$message("和已使用时间段冲突");
            that.step = 3;
          }
        });
        }else{
           that.step = 3;
          that.$message('请必填开始时间和结束时间')
        }
      
      }
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
  // min-height: 640px;
  border: 1px solid #e6e6e8;
  margin: 0 10px;
  margin-top: 30px;
  background-color: #ffffff;
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