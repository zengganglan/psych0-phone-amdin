<template>
  <div class="main">
    <!-- 头部 -->
    <!-- <headson :headson="headson"></headson> -->
    <!-- 搜索栏 -->
    <div class="search">
      <!-- <span>关键字</span>
      <input type="text">
      <i data-v-30c34ff0 class="iconfont icon-sousuo"></i>-->
    </div>
    <!-- <div class="work">
                <span class="del" @click="handleDelete">
          删除
          <i class="iconfont icon-trash"></i>
        </span>
    </div>-->
    <div class="data">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column property="sort" width="120mmmm" label="序号"></el-table-column> -->

        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="scale_name" label="量表名称"></el-table-column>
        <el-table-column prop="stu_name" label="学生"></el-table-column>
        <el-table-column prop="start_test_time" label="测试时间"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="times" label="耗时"></el-table-column>
        <el-table-column prop="valid" label="有效"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click.stop="handleEdit(scope.$index, scope.row)">查看</el-button>
            <!-- <el-button
          size="mini"
          type="danger"
            @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
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
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.countpage"
        ></el-pagination>
      </div>
    </div>
    <!-- <div class="add" @click="addnumber">新增</div> -->
    <el-dialog title="沙盘添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="沙盘组名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input v-model="form.unit_name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="makesure()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="沙盘编辑" :visible.sync="dialogFormVisible1">
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
import moment from "moment";
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        name: "",
        unit_name: ""
      },
      form1: {
        id: "",
        name: "",
        unit_name: ""
      },
      formLabelWidth: "120px",
      // 头部组件信息
      headson: ["测试记录", "根据自己兴趣测试一下量表"],
      tableData: [],
      tableData3: [
        {
          a: "1",
          b: "2015-12-3",
          c: "ucla孤独量表",
          d: "普测....",
          e: "无效...."
        },
        {
          a: "1",
          b: "2015-12-3",
          c: "ucla孤独量表",
          d: "普测....",
          e: "处理中...."
        },
        {
          a: "1",
          b: "2015-12-3",
          c: "ucla孤独量表",
          d: "普测....",
          e: "查看结果...."
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
      currentRow: null
    };
  },
  created() {
    this.getlist(this.page.currentpage, this.page.pagesize);
  },
  methods: {
    getlist(currentpage, pagesize) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;

      this.axios
        .post("/api/v1/scale/getScaleTestResult", {
          page: currentpage,
          size: pagesize
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
                console.log(year);
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

              if (item.sex - 0 == 0) {
                item.sex = "女";
              } else {
                item.sex = "男";
              }
              if (item.valid - 0 == 1) {
                item.valid = "有效";
              } else {
                item.valid = "无效";
              }
              if (item.type - 0 == 2) {
                item.type = "自测";
              } else {
                item.type = "普查";
              }
            });
          }
          if (that.tableData.length == 0) {
            this.$message("没有待测量表");
          }
          console.log(res);
        });
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
      //   this.$router.push({path:"/data/game/gamedetail",query:{id:id,name:name}})
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
      // this.dialogFormVisible1 = true;
      this.form1.id = row.id;
      this.form1.name = row.name;
      this.form1.unit_name = row.unit_name;
      console.log(row);
      if (row.is_visible == 1) {
        this.$router.push({
          path: "/Evaluation/caleresult",
          query: { 
            id: row.id
          }
        });
      } else {
        this.$message("该量表结果不可见，请联系管理员");
      } // 检查是否可见
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
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
    handleDelAll() {}
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
  span {
  }
  input {
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
  margin: 0 0px;
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