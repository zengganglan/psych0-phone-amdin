<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->
    <div class="search">
      <ul>
        <li>
          栏目：
          <select name v-model="Groupid" id="type">
            <option
              :value="item['id']"
              v-for="(item,index) in  $store.state.columns"
              :key="index"
              selected="selected"
            >{{item['name']}}</option>
          </select>
        </li>
        <li>
          <span>发布者：</span>
          <input type="text" value id="person">
          <!-- 点击搜索开始出现table表格 -->
          <i class="iconfont icon-sousuo" @click="showtable()"></i>
          <span class="iconfont icon-wenhao"></span>
        </li>
      </ul>
    </div>
    <div class="body">
      <div class="work">
        <span
          class="del iconfont icon-daochu1"
          @click="handleDelAll"
          :class="{ btnactive: isbtnActive }"
        >删除</span>
        <span class="dev" @click="Reading" :class="{ btnactive: isbtnActive }">阅读情况</span>
      </div>
      <div class="datas">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="文章主题" width="120">
            <template slot-scope="scope">
              <router-link to>{{ scope.row.theme }}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="栏目类型" width="120"></el-table-column>
          <el-table-column prop="job_num" label="发布者工号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="username" label="发布者" show-overflow-tooltip></el-table-column>
          <el-table-column prop="create_time" label="发表日期" show-overflow-tooltip></el-table-column>
          <el-table-column label="允许评论">
            <template slot-scope="scope">
              <span class="el-icon-close" v-if="scope.row.comment==1" style="color:red"></span>
              <span class="el-icon-check" v-else style="color:green"></span>
            </template>
          </el-table-column>
          <el-table-column prop="b" label="置顶">
            <template slot-scope="scope">
              <span class="el-icon-close" v-if="scope.row.topping==1" style="color:red"></span>
              <span class="el-icon-check" v-else style="color:green"></span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="修改文章" :visible.sync="dialogFormVisible" @opened="getEle" width="900px">
          <el-form :model="form">
            <el-form-item label="类别" :label-width="formLabelWidth">
              <el-select v-model="form.value" placeholder="请选择">
                <el-option
                  v-for="item in $store.state.columns"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="主题" :label-width="formLabelWidth">
              <el-input placeholder="请输入密码" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="摘要" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea"></el-input>
            </el-form-item>

            <el-form-item label="内容" :label-width="formLabelWidth">
              <!-- <vue-editor v-model="form.htmlForEditor"></vue-editor> -->
              <div id="editorElement" style="{width: 500px}" ref="editorElement"></div>
            </el-form-item>
            <!-- <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input placeholder=""  show-password></el-input>

            </el-form-item>-->
            <el-form-item label="设置" :label-width="formLabelWidth">
              <el-checkbox-group v-model="form.type">
                <el-checkbox-button label="允许评论或回复" name="type"></el-checkbox-button>&nbsp;&nbsp;
                <el-checkbox-button label="应栏目内置顶/推荐文章" name="type"></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <!-- <el-form-item label="日期" :label-width="formLabelWidth">
              <el-input type="date" v-model="form.date"></el-input>
            </el-form-item>
            <el-form-item label="点击" :label-width="formLabelWidth">
              <el-input placeholder="必须输入整数数字" v-model="form.clicks" style="width: 150px;"></el-input>
            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitcontent">提交</el-button>
          </div>
        </el-dialog>
        <!-- 阅读情况 不同的人 不同的文章每一个数据的显示 -->
        <el-dialog title="阅读情况" :visible.sync="dialogTableVisible">
          <el-table :data="gridData">
            <el-table-column property="theme" label="文章主题" width="150"></el-table-column>
            <el-table-column property="theme" label="文章主题" width="150"></el-table-column>
            <el-table-column property="name" label="栏目类型" width="150"></el-table-column>
            <el-table-column property="visit_count" label="访问量" width="150"></el-table-column>
            <el-table-column property="comment_count" label="评论量" width="200"></el-table-column>
            <el-table-column property="last_visit_time" label="最后访问时间"></el-table-column>
          </el-table>
        </el-dialog>

        <!-- Form -->
        <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
      </div>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40,50,60]"
          :page-size="page.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.countpage"
        ></el-pagination>
      </div>
    </div>
    <!-- <div v-if="tableflag">

      <router-link class="add" to="/admin/addAdmin" tag="div">新增</router-link>
    </div>-->
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import headson from "../../../components/headson";
import schoolcheck from "../../../components/schoolcheck";
import tables from "../../../components/table";
import pagination from "../../../components/pagination";
import { global } from "../../../global/global";
import E from "wangeditor";
export default {
  data() {
    return {
      isbtnActive: false,

      // 组别id
      Groupid: "",
      group: "",
      // 编辑
      index1: "",
      // 头部组件信息
      headson: ["文章列表", "获取文章列表信息"],
      //增加数据
      addflag: false,
      values: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        select: ""
      },
      // 页码
      page: {
        currentPage: 1,
        countpage: 0,
        pagesize: 10,
        flag: false
      },
      tableData: [],
      multipleSelection: [],
      //   修改对话框
      dialogFormVisible: false,
      dialogTableVisible: false,

      form: {
        value: "",
        title: "",
        textarea: "",
        editorContent: "<h1>Some initial content</h1>",
        type: ""
      },
      gridData: [],
      formLabelWidth: "120px",
      editor: "",
      id: ""
    };
  },
  mounted() {},
  created() {
    this.getList(this.page.currentPage, this.page.pagesize);
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList(currentPage, pagesize) {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      that.axios
        .post("/api/v1/admin/article/list", {
          page: currentPage,
          size: pagesize
        })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            that.tableData = res["data"]["data"]["list"];
            that.page.countpage = res["data"]["data"]["total"];
          } else {
            that.$message(res["data"]["msg"]);
          }
        });
    },
    // 分页·
    handleSizeChange(val) {
      this.page.pagesize = val;
      this.getList(this.page.currentPage, this.page.pagesize);
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getList(this.page.currentPage, this.page.pagesize);
    },
    // 操作
    handleEdit(index, row) {
      var that = this;
      console.log(index, row);
      var id = row["id"];
      that.id = id;
      this.dialogFormVisible = true;
    },
    // 对话框打开时
    getEle() {
      var that = this;
      if (!that.editor) {
        console.log(that.editor);
        let editorElement = this.$refs.editorElement;
        this.editor = new E(editorElement);
        this.editor.customConfig.onchange = html => {
          that.form.editorContent = html;
          console.log(html);
        };
        this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
        // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
        this.editor.customConfig.uploadImgServer = "<%=path%>/Img/upload"; //上传URL
        this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
        this.editor.customConfig.uploadImgMaxLength = 5;
        this.editor.customConfig.uploadFileName = "myFileName";
        this.editor.customConfig.uploadImgHooks = {
          customInsert: function(insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
            // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            var url = result.data;
            insertImg(url);
            // result 必须是一个 JSON 格式字符串！！！否则报错
          }
        };
        this.editor.create();
      }
      that.axios
        .post("/api/v1/admin/article/detail?id=" + that.id)
        .then(function(res) {
          var data = res["data"]["data"];
          that.form.title = data["theme"];
          that.form.textarea = data["abstract"];
          that.form.editorContent = data["content"];
          that.form.value = data["column_id"];
          var comment = data["comment"];
          var topping = data["topping"];
          that.form.type = [];
          if (comment == 1) {
            that.form.type.push("允许评论或回复");
          }
          if (topping == 1) {
            that.form.type.push("应栏目内置顶/推荐文章");
          }
          console.log(data);

          that.editor.txt.html(that.form.editorContent);
        });
    },
    Reading(index, row) {
      console.log(index, row);
      this.dialogTableVisible = true;
    },
    //   全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length > 0) {
        this.isbtnActive = true;
      } else {
        this.isbtnActive = false;
      }
    },
    submitcontent() {
      this.dialogFormVisible = false;
      console.log(this.form);
      var comment;
      var topping;
      var that = this;
      if (this.form.value && this.form.title) {
        comment = this.form.type.indexOf("允许评论或回复");
        topping = this.form.type.indexOf("应栏目内置顶/推荐文章");
        if (comment !== -1) {
          comment = 1;
        } else {
          comment = 0;
        }
        if (topping !== -1) {
          // 纯在
          topping = 1;
        } else {
          //  不存在没选
          topping = 0;
        }
        this.axios
          .post("/api/v1/admin/article/edit", {
            id: that.id,
            column_id: this.form.value,
            theme: this.form.title,
            abstract: this.form.textarea,
            content: this.form.editorContent,
            comment: comment,
            topping: topping
          })
          .then(function(res) {
            if (res["data"]["code"] == 0) {
              that.$message("编辑文章成功");
              that.getList(that.page.currentPage, that.page.pagesize);
            } else {
              that.$message(res["data"]["msg"]);
            }
          });
      } else {
        this.$message("类型或者主题不能为空");
      }
    },
    // 全选删除
    handleDelAll() {
      var ids = [];
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.map(item => {
          ids.push(item.id);
        });
      } else {
        this.$message("请至少选择一个删除文件");
        return;
      }
      var that = this;
      that
        .$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          //  点击确定开始删除
          console.log(ids);

          that.axios
            .post("/api/v1/admin/article/delete", { id: ids })
            .then(function(res) {
              console.log(res);
              if (res["data"]["code"] == 0) {
                that.getList(that.page.currentPage, that.page.pagesize);
                that.$message("删除成功");
              } else {
                that.$message(res["data"]["msg"]);
              }
            })
            .catch(err => {
              that.$message(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 搜索功能
    showtable() {
      //子组件树形控件的开关

      // 搜索开始获取表单value提交信息到后台，后台返回数据渲染
      console.log(1);
    },

    // 根据选中状态查看阅读情况
    Reading() {
      this.multipleSelection;
      var arr = [];
      if (this.multipleSelection.length > 0) {
        this.dialogTableVisible = true;
        this.multipleSelection.map(item => {
          arr.push(item["id"]);
        });
      } else {
        this.$message("请至少选择一项");
        return;
      }
      var that = this;
      this.axios
        .post("/api/v1/admin/article/visit/detail", {
          id: arr
        })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            that.gridData = res["data"]["data"];
          }
        });
    }
  },
  components: {
    headson: headson,
    schoolcheck: schoolcheck

    // VueEditor: VueEditor
  }
};
</script>

<style lang="scss" scoped>
.icon-wenhao {
  color: #169bd5;
  font-size: 25px;
}
.tabactive {
  color: #169bd5;
}
.icheck {
  height: 20px;
  width: 15px;
  cursor: pointer;
  position: relative;
  top: 5px;
}

// table高亮显示
.heightcolor {
  background-color: #f8f8fa;
}
a {
  color: #169bd5;
}
.pages {
  margin: 0 50px;

  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  // float: right;
  height: 100px;
}
.main {
  .search {
    height: 80px;
    margin: 0 auto;
    background-color: #fafafc;
    border: 1px solid #eff2f9;
    box-shadow: #eff2f9 1px 1px 20px;
    ul {
      width: 100%;
      display: flex;
      padding-top: 25px;
      justify-content: center;

      li:nth-child(1) {
        float: left;
        margin-left: 50px;
        margin-right: 100px;
        width: 300px;

        #type {
          height: 34px;
          outline: none;
          width: 200px;
          outline: none;
          border: none;

          border: 2px solid #e2e2e2;
        }
        .icon-sousuo {
          display: inline-block;
          font-size: 32px;
          vertical-align: middle;
          background-color: #169bd5;
          height: 32px;
          line-height: 32px;
          color: #ffffff;
          position: relative;
          left: -5px;
        }
      }
      li:nth-child(2) {
        width: 500px;
        float: left;
        margin-left: 50px;
        #person {
          height: 32px;
          outline: none;
          width: 200px;
          outline: none;
          border: none;

          border: 2px solid #e2e2e2;
        }
        .icon-sousuo {
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
    }
  }
  .body {
    // overflow: hidden;
    margin-top: 10px;
    background-color: #f9f9fb;

    .work {
      width: 90%;
      margin: 0 auto;
      height: 20px;
      margin-top: 30px;

      span {
        display: inline-block;
        float: right;
        width: 70px;
        height: 20px;
        background-color: #ffffff;
        color: #b1b1b1;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        border-radius: 5px;
        border: 1px solid #e1e1e3;
        cursor: pointer;
      }
      span:nth-child(1) {
        margin-left: 20px;
      }
      .div {
        margin-right: 20px;
      }
    }
    .datas {
      margin: 0 auto;
      min-height: 640px;
      border: 1px solid #e6e6e8;
      margin: 0 50px;
      margin-top: 30px;
      background-color: #ffffff;
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
}

.heightcolor {
  background-color: #f8f8fa;
}
.btnactive {
  background-color: #c6e2ff !important
  ;
}
</style>



