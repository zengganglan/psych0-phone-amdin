<template>
  <div class="main">
    <!-- 头部 -->
    <!-- <headson :headson="headson"></headson> -->
    <!-- 搜索栏 -->
   <!-- id:35,43,12,29, 31,-->

    <!-- <div class="search">
      <ul>
        <li>
          <table class="tbs">
            <tr>
              <td>类型</td>
              <td>
                <el-select name v-model="form2.scale_type " id="type" clearable>
                  <el-option
                    v-for="(item, index) in editableTabs"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >{{item.name}}</el-option>
                </el-select>
              </td>
              <td>性别</td>
              <td>
                <el-select name v-model="form2.sex" id="type" clearable>
                  <el-option value="1" label="男"></el-option>
                  <el-option value="0" label="女"></el-option>
                </el-select>
              </td>
              <td>量表</td>
              <td>
                <el-select
                  clearable
                  filterable
                  remote
                  reserve-keyword
                  placeholder="选择量表再统计[ASLEC,MHT,scl90,EPQ,16pf]"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  v-model="form2.scale_id"
                  value-key
                  @change="selectcale"
                >
                  <el-option
                    v-for="(item, index) in roles"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>学号</td>
              <td>
                <el-input v-model="form2.job_num"></el-input>
              </td>
              <td>范围</td>
              <td>
                <div class="schoolcheck">
                  <schoolcheck ref="schoolcheck"></schoolcheck>
                </div>
              </td>
              <td>有效性</td>
              <td>
                <el-select name v-model="form2.valid" id="type" clearable>
                  <el-option value="1" label="有效"></el-option>
                  <el-option value="0" label="无效"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>自/普测</td>
              <td>
                <el-select name v-model="form2.test_type" id="type" clearable>
                  <el-option value="2" label="自测"></el-option>
                  <el-option value="1" label="普测"></el-option>
                </el-select>
              </td>
              <td>姓名</td>
              <td>
                <el-input v-model="form2.name"></el-input>
              </td>
              <td>时间</td>
              <td>
                <el-date-picker
                  style="width:220px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="times"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div> -->
    <!-- <div class="work">
      <span @click="showtable">查询</span>
      <span @click="goanswer">导出答题</span>
      <span @click="goscore">导出结果</span>
      <i class="del">
        <el-button
          size="mini"
          primary
          @click="go"
          style="border-radius: 5px;
    border: 1px solid #9f9a9b;height:20px;line-height:0px"
          :disabled="disabled"
        >团体报告</el-button>
      </i>
    </div> -->

    <div class="data">
      <!-- <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
    <el-tab-pane label="测试记录" name="first">
      
    </el-tab-pane>
    <el-tab-pane label="参测统计" name="second">
            <div class="chart" ref="chart"></div>

    </el-tab-pane>
    
      </el-tabs>-->
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        :cell-style="{width:'80px',height:'30px'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="scale_name" label="量表名称"></el-table-column>
        <el-table-column prop="stu_name" label="学生"></el-table-column>
        <el-table-column prop="job_num" label="学号"></el-table-column>
        <el-table-column prop="start_test_time" label="测试时间"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="times" label="耗时"></el-table-column>
        <el-table-column prop="valid" label="有效"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click.stop="handleEdit(scope.$index, scope.row)">数据统计</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="pageCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10,20,30,40,50,60]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.countpage"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- <div class="add" @click="addnumber">新增</div> -->
    <el-dialog title="预警触发编辑" :visible.sync="dialogFormVisible">
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
    <el-dialog title="预警触发编辑" :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="预警触发名称" :label-width="formLabelWidth">
          <el-input v-model="form1.name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="预警触发名称" :label-width="formLabelWidth">
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
import headson from "../../../../components/headson";
import moment from "moment";
import { stringify } from "querystring";
import schoolcheck from "../../../../components/schoolcheck";

export default {
  data() {
    return {
      disabled: true,
      activeName: "first",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      loading: false,
      roles: "",
      form: {
        name: "",
        unit_name: ""
      },
      form1: {
        id: "",
        name: "",
        unit_name: "",
        scale_id: ""
      },
      times: "",
      form2: {
        scale_id: "",
        scale_type: "",
        test_type: "",
        job_num: "",
        valid: "",
        name: "",
        start_time: "",
        unit_group_id: "",
        expire_time: ""
      },
      formLabelWidth: "100px",
      // 头部组件信息
      headson: ["测试结果", "测试结果数据查看"],
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
      pos: "",
      // 举例筛选
      eglist: [
        [
          { 1: { caleid: 2 } },
          { 2: { caleid: 4 } },
          { 3: { caleid: 6 } },
          { 4: { caleid: 8 } }
        ],
        [
          { 1: { caleid: 3 } },
          { 2: { caleid: 5 } },
          { 3: { caleid: 6 } },
          { 4: { caleid: 8 } }
        ]
      ],
      factor: [
        { id: 1, cales: [{ id: 2 }, { id: 3 }] },
        { id: 2, cales: [{ id: 4 }, { id: 5 }] },
        { id: 3, cales: [{ id: 6 }, { id: 7 }] },
        { id: 4, cales: [{ id: 8 }, { id: 9 }] }
      ],
      editableTabs: []
    };
  },
  created() {
    this.getlist(this.page.currentpage, this.page.pagesize);

    // this.changeobj(this.tableData);
  },
  mounted() {
    // this.draw()
    this.remoteMethod("");
    // this.mouse()
    this.gettype();
  },
  methods: {
    gettype() {
      var that = this;
      this.axios.get("/api/v1/tools/selectScaleTypeList").then(res => {
        if (res["data"]["code"] == 0) {
          that.editableTabs = res["data"]["data"];
          that.editableTabs.map((item, index) => {
            item.id = item.id + "";
          });
          that.activeName = that.editableTabs[0]["id"];
          that.getlist(that.page.currentpage, that.page.pagesize);
        }
      });
    },
    // 模拟计算
    mouse() {
      this.eglist.map(item => {
        // 每一个人答题卡
        console.log(item);
        item.map(item1 => {
          console.log(item1);
          // 得到因子ID{1:{caleid:2}} key因子
          for (var key in item1) {
            //循环每一个因子
            var factorid = key;
            var scale = item1[key]["caleid"];
            console.log(scale);
            var obj = this.factor.find(item2 => {
              return item2.id == factorid;
              //  console.log(item2)
            });
            console.log(obj);
            //这个循环匹配因子id和结算id.拿着这两值去因子里面匹配
          }

          // 每个答题卡的每一个因子的计算ID
        });
      });
    },
    gostatistic() {
      this.go(1);
    },
    goscore() {
      this.go(2);
    },
    goanswer() {
      this.go(3);
    },
    go(type) {
      // 只有固定几个量表选中同时有人就可以解锁去统计分析
      console.log(this.multipleSelection);
      var id = [];
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.map(item => {
          id.push(item["id"]);
        });
      } else {
        this.$message("请确定选中了选项");
      }

      var that = this;
      this.axios
        .post("/api/v1/admin/scale/getTestResultSet", { ids: id })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            var obj = JSON.stringify(res["data"]["data"]);
            localStorage.setItem("scalesobj", obj);
          } else {
            that.$message(res["data"]["msg"]);
          }
        });

      if (type == 1) {
        // 统计[答题选项答案]
        let routeUrl = that.$router.resolve({
          path: "/Gauge/statistic",
          query: { id: 96 }
        });
        window.open(routeUrl.href, "_blank");
      } else if (type == 2) {
        // 导出答题[因子分数]
        let routeUrl = that.$router.resolve({
          path: "/Gauge/answer_score",
          query: { id: 96 }
        });
        window.open(routeUrl.href, "_blank");
      } else if (type == 3) {
        // 导出结果[选项分数/选项答案]
        let routeUrl = that.$router.resolve({
          path: "/Gauge/test_export_answer",
          query: { id: 96 }
        });
        window.open(routeUrl.href, "_blank");
      } else {
        // 团体报告
        let routeUrl = that.$router.resolve({
          path: "/Gauge/totalresult"
        });
        window.open(routeUrl.href, "_blank");
        //     that.$router.push({
        //   path: "/Gauge/totalresult"
        // });
      }
    },
    remoteMethod(query) {
      console.log(query);
      var that = this;
      this.axios
        .get("/api/v1/system/scale/getSelectScaleList?key=" + query)
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.roles = res["data"]["data"];
          }
        });
    },
    selectcale() {
      //   <!-- id:12,29, 31,35,43,-->
      var id = this.form2.scale_id;
      this.showtable();
      var ids = [12, 29, 31, 35, 43];
      var arr = [];
      var sca = ids.find(item => {
        return item == id;
      });
      if (sca) {
        //  解锁统计按钮可以选择
        this.disabled = false;
      } else {
        this.disabled = true;

        this.$message("请选择[scl90,EPQ,16pf,ASLEC,MHT]固定量表进行统计");
      }
      //  var a = [{scale_id:12},{scale_id:12},{scale_id:12}]
    },
    // 搜索功能
    showtable() {
      //子组件树形控件的开关
      this.$refs.schoolcheck.treeflag = false;
      // 是名字
      this.$refs.schoolcheck.newvalue;
      // 搜索开始获取表单value提交信息到后台，后台返回数据渲染
      this.form2.unit_group_id = this.$refs.schoolcheck.item.id - 0;
      console.log(this.times);
      var obj = {};
      if (this.times) {
        this.form2["start_time"] = this.times[0];
        this.form2["expire_time"] = this.times[1];
      }
      for (var key in this.form2) {
        if (this.form2[key]) {
          obj[key] = this.form2[key];
        }
      }
      console.log(this.form2, obj);
      this.getlist(this.page.currentpage, this.page.pagesize, obj);
    },
    formatDuring(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24));
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (mss % (1000 * 60)) / 1000;
      return hours + " : " + minutes + " : " + seconds;
    },
    getlist(currentpage, pagesize, w, id) {
      // 获得列表数据
      // console.log(w)
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      if (!id) {
        id = "";
      }
      var that = this;
      this.axios
        .post("/api/v1/admin/scale/getTestResultList", {
          page: currentpage,
          size: pagesize,
          w: w
        })
        .then(function(res) {
          if (res["data"].code == 0) {
            that.page.countpage = res["data"]["data"]["total"];
            that.tableData = res["data"]["data"]["list"];
            that.tableData.map((item, index) => {
              if (item["birth_date"]) {
                var a = new Date().getTime() - new Date(item["birth_date"]);
                var hours = a / 1000 / 60 / 60;
                var year = Math.floor(hours / (24 * 30 * 12));
                // console.log(year);
                item["age"] = year;
              } else {
                item["age"] = "null";
              }
              var mm =
                new Date(item["end_test_time"]).valueOf() -
                new Date(item["start_test_time"]).valueOf();

              var msTime = moment.duration(mm);
              var hours = moment.duration(msTime).hours(); //转为小时，值为1
              var mins = moment.duration(msTime).minutes(); //转为分钟，值为20
              var second = moment.duration(msTime).seconds(); //转为秒，值为0
              item["times"] = hours + ":" + mins + ":" + second;

              if (item.sex == 0) {
                item.sex = "女";
              } else {
                item.sex = "男";
              }
              if (item.valid - 0 == 1) {
                item.valid = "有效";
              } else {
                item.valid = "无效";
              }
              if (item.type == 2) {
                item.type = "自测";
              } else {
                item.type = "普查";
              }
            });
          }
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
      //   this.dialogFormVisible1 = true;
      //   this.form1.id = row.id;
      //   this.form1.name = row.name;
      //   this.form1.unit_name = row.unit_name19;
      if (index == 0) {
        this.$router.push({
          path: "/Gauge/resultdetail",
          query: { id: 19 }
        });
      }
      this.$router.push({
        path: "/Gauge/resultdetail",
        query: { id: row.id }
      });
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
    tabClick(tab, event) {
      console.log(tab, event);
    },
    handleDelAll() {},
    changevalue() {},
    cellStyle() {
      return;
    },
    draw() {
      var chart = this.$refs.chart;
      console.log(chart);
      this.myChart = this.$echarts.init(chart);
      var option = {
        title: {
          text: "参测统计信息"
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
          left: "15%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: [
          {
            type: "category",
            data: [
              "zonghe",
              "潜在风险评估",
              "自杀倾向评估",
              "访谈评估",
              "生活事件动态"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        xAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "2015",
            type: "bar",
            barWidth: "30",
            data: [10, 52, 200, 334, 390]
          }
        ]
      };

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
  },

  components: {
    headson: headson,
    schoolcheck: schoolcheck
  }
};
</script>

<style scoped lang="scss">
.tbs {
  tr {
    td {
      padding: 10px;
      position: relative;
      .schoolcheck {
        position: absolute;
        width: 87%;
        top: 10px;
        // // left: 88px;
        // height: 100%;
        z-index: 3;
      }
    }
  }
}

.tr {
  height: 40px;
}
.luru {
  border-left: 8px solid #679afa;
  margin: 0 50px;
  color: #679afa;
  padding-left: 10px;
  font-size: 20px;
  margin-top: 40px;
}
.work {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  span {
    display: inline-block;
    margin-right: 20px;
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
  i {
    position: relative;
    top: -2px;
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
    // flex-wrap: wrap;
    li {
      tr {
        td:nth-child(even) {
          padding-right: 20px;
        }
      }
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
.chart {
  height: 600px;
  width: 1000px;
}
</style>