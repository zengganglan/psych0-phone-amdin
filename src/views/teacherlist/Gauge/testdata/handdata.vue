<template>
  <div class="main">
    <!-- 头部 -->
    <!-- 搜索栏 -->
    <div class="search">
      <ul>
        <li>
          <table>
            <tr>
              <td>量表：</td>
              <td>
                <el-select name v-model="formLabelWidth" id="type">
                  <el-option value>认识自我</el-option>
                  <el-option value>心理健康</el-option>
                  <el-option value>自由量表</el-option>
                  <el-option value>人际关系</el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>类型：</td>
              <td>
                <el-select name v-model="formLabelWidth" id="type">
                  <el-option value>认识自我</el-option>
                  <el-option value>心理健康</el-option>
                  <el-option value>自由量表</el-option>
                  <el-option value>人际关系</el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>关键字：</td>

              <td>
                <el-input
                  placeholder="请输入学号，名字，性别"
                  v-model="formLabelWidth"
                  class="input-with-select"
                >
                  <el-select v-model="formLabelWidth" slot="prepend" placeholder="请选择">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="异常" value="2"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
    <div class="work">
      <!-- <excel-box :thead="this.thead" :filterVal="this.filterVal"  :tableData3="this.tableData3"></excel-box> -->
      <span class="del" @click="handleDelete">
        删除
        <i class="iconfont icon-trash"></i>
      </span>
    </div>

    <div class="data">
      <table>
        <tr>
          <td>1，选题内容</td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" name id value>
            <span>选项一</span>
          </td>
          <td>
            <input type="checkbox" name id value>
            <span>选项二</span>
          </td>
        </tr>
        <tr>
          <td>2，选题内容</td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" name id value>
            <span>选项一</span>
          </td>
          <td>
            <input type="checkbox" name id value>
            <span>选项二</span>
          </td>
        </tr>
        <tr>
          <td>3，选题内容</td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" name id value>
            <span>选项一</span>
          </td>
          <td>
            <input type="checkbox" name id value>
            <span>选项二</span>
          </td>
        </tr>
      </table>
      <div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="pageCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10,20,30,40,50,60]"
            :page-size="10"
            layout=" sizes, prev, pager, next"
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
      formLabelWidth: "100px",
      // 头部组件信息
      headson: ["录入测试量表", "用户测试数据"],
      tableData: [
        {
          1: "1",
          2: "2017081",
          3: "翟宇轩",
          4: "男",
          5: "心理健康诊断测验",
          6: "1分22秒",
          7: "2017/3/34",
          8: "自测",
          9: "有效"
        },
        {
          1: "2",
          2: "10002",
          3: "孟凡",
          4: "男",
          5: "心理健康诊断测验",
          6: "1分22秒",
          7: "2017/3/33",
          8: "自测",
          9: "有效"
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
  mounted() {},
  methods: {
    getlist(currentpage, pagesize) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      // this.axios
      //   .post("/api/v1/admin/sand/group/list", {
      //     page: currentpage,
      //     size: pagesize
      //   })
      //   .then(function(res) {
      //     if (res["data"].code == 0) {
      //       that.page.countpage = res["data"]["data"]["total"];
      //       that.tableData = res["data"]["data"]["list"];
      //     }
      //     console.log(res);
      //   });
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
      //   this.form1.unit_name = row.unit_name;
      if (index == 0) {
        this.$router.push({
          path: "/liangbiao"
        });
      }
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
    cellStyle() {
      return;
    }
  },

  components: {
    headson: headson
  }
};
</script>

<style scoped lang="scss">
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
  margin-left: 10px;
  ul {
    width: 100%;
    display: flex;
    padding-top: 25px;
    // justify-content: center;
    // flex-wrap: wrap;
    li {
      tr {
        margin-top: 10px;
        height: 50px;
        td:nth-child(odd) {
          width: 80px;
        }
        td:nth-child(even) {
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
  table {
    width: 100%;
    tr:nth-child(odd) {
      height: 50px;
    }
    tr:nth-child(even) {
      background-color: #edf2fc;
      height: 30px;
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
.chart {
  height: 600px;
  width: 1000px;
}
</style>