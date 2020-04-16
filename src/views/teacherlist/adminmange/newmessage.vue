<template>
  <div>
    <div class="contain">
      <div class="top">
        <i class="iconfont icon-angle-left" @click="goback"></i>
        <span>站内消息</span>
      </div>
       <el-tabs
                    v-model="activeName2"
                    type="card"
                    :hidden="false"
                  >
                    <el-tab-pane label="收件箱" name="first">
                      <div class="mesg">
                        <el-select
                          v-model="filter"
                          slot="prepend"
                          placeholder="请选择"
                          size="large"
                          @change="change"
                        >
                          <el-option label="系统消息" value="1"></el-option>
                          <el-option label="用户消息" value="2"></el-option>
                        </el-select>
                        <div class="work">
                         <el-button
                              size="mini"                           
                              @click.stop="del"
                            >删除邮件</el-button>
                          
                          <el-button
                              size="mini"
                              type="danger"
                              @click.stop="read"
                            >标记阅读</el-button>
                          
                        </div>
                      </div>
                      <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                      >
 <el-table-column type="selection" width="55"></el-table-column>                         <el-table-column label="日期" width="120">
                          <template slot-scope="scope"><span style="font-size:12px;color:#409EFF">[{{scope.row.read}}]</span>{{ scope.row.create_time }}</template>
                        </el-table-column>
                        <el-table-column label="姓名" >
                          <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column prop="title" label="标题" width="120"></el-table-column>
                        <!-- <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column> -->
                      </el-table>
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
                    </el-tab-pane>
                    <el-tab-pane label="发件箱" name="second">
              
                      <div class="work">
                       
                      </div>
                      <el-table
                        ref="multipleTable"
                        :data="tableData1"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange1"
                      >
                        <el-table-column label="日期" width="120">
                          <template slot-scope="scope">{{ scope.row.create_time }}</template>
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                        <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
                        <!-- <el-table-column label="操作" width="160">
                          <template slot-scope="scope">
                            <el-button
                              size="mini"
                              type="danger"
                              @click.stop="readSend(scope.row)"
                            >标记阅读</el-button>
                          </template>
                        </el-table-column> -->
                      </el-table>
                      <div class="pages">
                        <el-pagination
                          @size-change="handleSizeChange1"
                          @current-change="handleCurrentChange1"
                          :current-page="page1.currentPage"
                          :page-sizes="[10, 20, 30, 40,50,60]"
                          :page-size="page1.pagesize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="page1.countpage"
                        ></el-pagination>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="撰写" name="third">
                      <span class="send" @click="sendmsg">发送</span>
                      <div>
                        接收者：
                        <el-input v-model="nameId" placeholder="输入接受者的ID,多人用逗号分隔"></el-input>
                      </div>
                      <div>
                        标题：
                        <el-input v-model="title" placeholder="请输入标题"></el-input>
                      </div>

                      <div>
                        内容：
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
      // 站内消息
      activeName2: "first",
     // 站内消息
      activeName2: "first",
      tableData3: [],
      tableData1: [],
      // 页码
      page: {
        currentpage: 1,
        countpage: 0,
        pagesize: 20,
        flag: false
      },
      multipleSelection: [],
      // 页码
      page1: {
        currentpage: 1,
        countpage: 0,
        pagesize: 20,
        flag: false
      },
      multipleSelection1: [],
      //  发送消息
      nameId: "",
      title: "",
      textarea: "",
      filter: ""
    };
  },
  created(){
    this.getmesage(this.page.currentpage, this.page.pagesize);
    this.sendmessage(this.page1.currentpage, this.page1.pagesize);
  },
  methods: {
     getmesage(currentpage, pagesize) {
      var that = this;
      this.axios
        .post("/api/v1/mail/list?filter=" + this.filter, {
          page: currentpage,
          size: pagesize
        })
        .then(function(res) {
         var data = res["data"]["data"]["list"];
          data.map((item,index)=>{
             if (item['view_time']) {
                item['read']='已读'
             }else{
               item['read']='未读'
             }
           })
            that.tableData3=data
          that.page.countpage = res["data"]["data"]["total"];
        });
    },
    sendmessage(currentpage, pagesize) {
      var that = this;
      this.axios
        .post("/api/v1/admin/mail/list", {
          page: currentpage,
          size: pagesize
        })
        .then(function(res) {
          that.tableData1 = res["data"]["data"]["list"];
          that.page1.countpage = res["data"]["data"]["total"];
        });
    },
    change() {
      this.getmesage(this.page.currentpage, this.page.pagesize);
    },
    goback() {
      this.$router.go(-1);
    },
    //站内消息
    handleClick(tab, event) {
      console.log(tab, event);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
      console.log(this.multipleSelection);
    },
 
     //站内消息
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.getmesage(this.page.currentpage, this.page.pagesize);

    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
      this.sendmessage(this.page.currentpage, this.page.pagesize);

    },
    // 分页·
    handleSizeChange(val) {
      this.page.pagesize = val;
      this.getmesage(this.page.currentpage, this.page.pagesize);
    },
    handleCurrentChange(val) {
      this.page.currentpage = val;
      this.getmesage(this.page.currentpage, this.page.pagesize);
    },
    // 分页·
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.page1.pagesize = val;
      this.sendmessage(this.page1.currentpage, this.page1.pagesize);

    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.page1.currentpage = val;
      this.sendmessage(this.page1.currentpage, this.page1.pagesize);

    },
    sendmsg() {
      var that = this;
      this.axios
        .post("/api/v1/admin/mail/send", {
          receiver: this.nameId,
          title: this.title,
          content: this.textarea
        })
        .then(res => {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("发送成功");
            that.getmesage(that.page.currentpage, that.page.pagesize);
            that.sendmessage(that.page1.currentpage, that.page1.pagesize);
          }else{
            that.$message(res["data"]["msg"]);  

          }
        });
    },
    del() {
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
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
          this.axios
            .post("/api/v1/mail/delete", { id: ids })
            .then(function(res) {
              console.log(res);
              if (res["data"]["code"] == 0) {
                that.getmesage(that.page.currentpage, that.page.pagesize);
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
    read() {
      var ids = [];
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.map(item => {
          ids.push(item.id);
        });
      } else {
        this.$message("请至少选择一个阅读文件");
        return;
      }
      var that = this;
      this.axios
        .post("/api/v1/mail/read", { id: ids })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.getmesage(that.page.currentpage, that.page.pagesize);
            that.$message("已阅读");
          } else {
            that.$message(res["data"]["msg"]);
          }
        })
        .catch(err => {
          that.$message(err);
        });
    },
    readSend(row) {
      var id = row.id;
      var that = this;
      this.axios
        .get("/api/v1/admin/mail/read?id=" + id)
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.getmesage(that.page.currentpage, that.page.pagesize);
            that.$message("已阅读");
          } else {
            that.$message(res["data"]["msg"]);
          }
        })
        .catch(err => {
          that.$message(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.send {
  display: inline-block;
  height: 20px;
  width: 60px;
  background-color: #38b03f;
  border-radius: 20px;
  text-align: center;
  color: white;
  font-size: 14px;
}
.top {
  text-align: center;
  height: 50px;
  line-height: 50px;
  padding: 0 5px;
  background-color: #d8dcdd;
  i {
    position: absolute;
    left: 10px;
    font-size: 25px;
  }
}
.contain {
  .mesg {
    .work {
      float: right;
      span,
      i {
        background-color: #9e9ea8;
        color: #fff;
        padding: 3px;
        font-size: 12px;
        border-radius: 5px;
      }
    }
  }
}
</style>