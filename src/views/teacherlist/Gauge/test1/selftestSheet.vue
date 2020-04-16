<template>
  <div class="main">
    <!-- 头部 -->

    <el-tabs tab-position="center" style="height: 200px;">
      <el-tab-pane label="自有量表">
        <div class="work">
          <span class="del" @click="handleDelete">
            删除
            <i class="iconfont icon-trash"></i>
          </span>
        </div>
        <div class="data">
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 20px"
            :cell-style="{width:'80px',height:'30px'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="1" label="序号（？）"></el-table-column>
            <el-table-column prop="2" label="量表名称（？）"></el-table-column>
            <el-table-column prop="3" label="简介（？）"></el-table-column>
            <el-table-column prop="4" label="指导语（？）"></el-table-column>
            <el-table-column prop="5" label="完成（？）"></el-table-column>

            <!-- <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click.stop="handleEdit(scope.$index, scope.row)"
                >测题</el-button>
                <el-button size="mini" @click.stop="show(scope.$index, scope.row)">
                  <span class="iconfont icon-qrcode"></span>
                </el-button>
              </template>
            </el-table-column>-->
          </el-table>

          <!-- <div class="add" @click="addnumber">新增</div> -->
          <el-dialog
            title="量表二维码"
            :visible.sync="dialogFormVisible"
            @opened="useqrcode"
            width="500px"
          >
            <!-- <div class="tilt"><img src="../../../../assets/images/erweima.png" alt=""></div> -->
            <canvas id="canvas" ref="canvas" style="margin-left:150px"></canvas>
          </el-dialog>
          <el-dialog
            title="症状自评量表(SCL-90)"
            :visible.sync="dialogFormVisible1"
            :style="{'height':'500px'}"
          >
            <table class="personinfo">
              <tr>
                <th>#</th>
                <th>题目</th>
                <th>备选</th>
              </tr>

              <tr v-for="(item,index) in timu" :key="index">
                <td align="center">{{index+1}}</td>
                <td>{{item}}</td>
                <td>从无/轻度/中度/偏重/严重</td>
              </tr>
            </table>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
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
        <div class="add" @click="addnumber">新增</div>
      </el-tab-pane>
      <el-tab-pane label="问题">
        <div class="work">
          <span>上传</span>
          <span>修改</span>
          <span class="del" @click="handleDelete">
            删除
            <i class="iconfont icon-trash"></i>
          </span>
        </div>
        <div class="data">
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 20px"
            :cell-style="{width:'80px',height:'30px'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="1" label="序号（？）"></el-table-column>
            <el-table-column prop="2" label="类型（？）"></el-table-column>
            <el-table-column prop="3" label="问题（？）"></el-table-column>
            <el-table-column prop="4" label="备选答案（？）"></el-table-column>
            <el-table-column prop="5" label="备选答案得分（？）"></el-table-column>
          </el-table>
        </div>
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
        <div class="add" @click="addnumber">新增</div>
      </el-tab-pane>
      <el-tab-pane label="因子">
        <div class="work">
          <span>修改</span>
          <span class="del" @click="handleDelete">
            删除
            <i class="iconfont icon-trash"></i>
          </span>
        </div>
        <div class="data">
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 20px"
            :cell-style="{width:'80px',height:'30px'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="1" label="序号（？）"></el-table-column>
            <el-table-column prop="2" label="因子名称（？）"></el-table-column>
            <el-table-column prop="3" label="题号（？）"></el-table-column>
            <el-table-column prop="4" label="运算（？）"></el-table-column>
            <el-table-column prop="5" label="运算值（？）"></el-table-column>
          </el-table>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="pageCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10,20,30,40,50,60]"
            :page-size="10"
            layout="sizes, prev, pager, next"
            :total="page.countpage"
          ></el-pagination>
        </div>
        <div class="add" @click="addnumber">新增</div>
      </el-tab-pane>
      <el-tab-pane label="解释">
        <div class="work">
          <span>修改</span>
          <span class="del" @click="handleDelete">
            删除
            <i class="iconfont icon-trash"></i>
          </span>
        </div>
        <div class="data">
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 20px"
            :cell-style="{width:'80px',height:'30px'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="1" label="序号（？）"></el-table-column>
            <el-table-column prop="2" label="解释内容（？）"></el-table-column>
            <el-table-column prop="3" label="所属因子（？）"></el-table-column>
            <el-table-column prop="4" label="分数起止（？）"></el-table-column>
            <el-table-column prop="5" label="状态（？）"></el-table-column>
          </el-table>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="pageCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10,20,30,40,50,60]"
            :page-size="10"
            layout="sizes, prev, pager, next"
            :total="page.countpage"
          ></el-pagination>
        </div>
        <div class="add" @click="addnumber">新增</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import headson from "../../../../components/headson";
import timu from "../../../../vendor/item";
import QRCode from "qrcode";
export default {
  data() {
    return {
      select: "",
      timu: "",
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
      headson: ["系统量表", "自由量表制作和管理"],
      tableData: [
        {
          1: "1",
          2: "UCLA 孤独量表",
          3: "UCLA 孤独量表（UCLA Lonelin.",
          4: "下面描述了人们生活中..",
          5: "√"
        },
        {
          1: "1",
          2: "UCLA 孤独量表",
          3: "UCLA 孤独量表（UCLA Lonelin.",
          4: "下面描述了人们生活中..",
          5: "√"
        }
      ],
      multipleSelection: [],
      // 页码
      page: {
        currentpage: 1,
        countpage: 10,
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
    show() {
      // 按钮事件 传值
      this.dialogFormVisible = true;
      console.log(1);
    },
    //动态生成二维码
    useqrcode() {
      //对话框打开生成二维码生成的二维码内容，可以添加变量
      var canvas = document.getElementById("canvas");
      console.log(1);

      QRCode.toCanvas(canvas, "http://psy.hxxlcloud.com/mpsycholo/ ", function(
        error
      ) {
        if (error) console.error(error);
        console.log("QRCode success!");
      });
    },
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
      this.dialogFormVisible1 = true;
      this.form1.id = row.id;
      this.form1.name = row.name;
      this.form1.unit_name = row.unit_name;
      this.timu = timu;
      console.log(timu);
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
.canvas {
  margin: 0 auto;
}
.tilt {
  text-align: center;
}
.tr {
  height: 40px;
}
.personinfo {
  border-collapse: separate;
  border-spacing: 2px;
  td {
    width: 250px;
    height: 30px;
  }
  td:nth-child(odd) {
    width: 200px;
    color: #169bd5;
  }
  tr:nth-child(odd) {
    background-color: rgb(237, 242, 252);
  }
  tr:nth-child(even) {
  }
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
  overflow: hidden;
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
      // top: 3px;
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
      width: 320px;
      .el-select {
        width: 100px;
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