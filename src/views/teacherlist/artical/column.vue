<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <div class="body">
      <div class="datas">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
        >
      
       <el-table-column label="序号" width="200">
            <template slot-scope="scope">
              <router-link to>{{scope.row.sort}}</router-link>
            </template>
          </el-table-column>

          <el-table-column label="栏目名称" width="200">
            <template slot-scope="scope">
              <router-link to>{{scope.row.name}}</router-link>
            </template>
          </el-table-column>
          <el-table-column property="desc" label="栏目描述"></el-table-column>
         
           <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="del(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
       <div>
      <div class="add" @click="dialogFormVisible1 = true">新增</div>
      <el-dialog title="栏目增加" :visible.sync="dialogFormVisible1">
  <el-form :model="form1">
    <el-form-item label="序号" :label-width="formLabelWidth" >
      <el-input v-model="form1.sort" autocomplete="off" style="width: 210px;"></el-input>
    </el-form-item>
    <el-form-item label="栏目名称" :label-width="formLabelWidth" >
      <el-input v-model="form1.name" autocomplete="off" style="width: 210px;"></el-input>
    </el-form-item>
     <el-form-item label="栏目描述" :label-width="formLabelWidth" >
      <el-input v-model="form1.desc" autocomplete="off" style="width: 210px;"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
    <el-button type="primary" @click='add()'>新增</el-button>
  </div>
</el-dialog>
  <el-dialog title="栏目编辑" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="序号" :label-width="formLabelWidth" >
      <el-input v-model="form.sort" autocomplete="off" style="width: 210px;"></el-input>
    </el-form-item>
    <el-form-item label="栏目名称" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off" style="width: 210px;"></el-input>
    </el-form-item>
     <el-form-item label="栏目描述" :label-width="formLabelWidth" >
      <el-input v-model="form.desc" autocomplete="off" style="width: 210px;"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click='editSure()'>保存</el-button>
  </div>
</el-dialog>
    </div>
  </div>
</template>

<script>
import headson from "../../../components/headson";

export default {
  data() {
    return {
        dialogFormVisible :false,
        dialogFormVisible1:false,
         form1: {
            name:"",
            desc:"",
            sort:""
        },
         form: {
            id:"",
           name:"",
            desc:"",
            sort:""
        },
        formLabelWidth: '120px',
         // 页码
      page: {
        currentPage: 1,
        countpage: 0,
        pagesize: 10,
        flag: false,
      },
      // 头部组件信息、在登录页和学生端显示
      headson: ["网站栏目列表", "栏目列表情况"],
      tableData: [],
      currentRow: null
    };
  },
  created(){
   this.getlist(this.page.currentPage,this.page.pagesize)
  },
  methods: {
    getlist(currentPage,pagesize){
      var that = this
         this.axios.post('/api/v1/admin/article/column/list',{
           page:currentPage,
           size:pagesize
         }).then(function(res){
           if (res['data']['code']==0) {
           that.page.countpage=res['data']['data']['total']
           that.tableData=res['data']['data']['list']
          //  2 20  (a-1)*20+1----
           that.tableData.map((item,index)=>{
             item['sort']=(currentPage-1)*pagesize+(index+1)
           })
           }else{
             that.$message(res['data']['msg'])
           }
         })
    },
    handleCurrentChange(val) {
      //   点击一行触发的事件
      this.currentRow = val;
      
      console.log(val);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
        this.page.pagesize=val
        this.getlist(this.page.currentPage,this.page.pagesize)

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage=val
      this.getlist(this.page.currentPage,this.page.pagesize)

    },
    del(index,row){
      var id = [];
      if (row) {
        id.push(row.id);
      }
      var that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
          this.axios
            .post("/api/v1/admin/article/column/delete", { id: id })
            .then(function(res) {
              console.log(res);
              if (res["data"]["code"] == 0) {
                that.$message("删除成功");
                that.getlist(that.page.currentPage, that.page.pagesize);
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
    handleEdit(index,row){
      this.dialogFormVisible = true
        this.form.id= row.id
        this.form.name=row.name
        this.form.desc=row.desc
        this.form.sort=row.sort

            },
    add(){
          this.dialogFormVisible1 = false
          var that = this
        //    最大值自增可编辑
        if (this.form1.name && this.form1.name.length>=4) {
             this.axios.post('/api/v1/admin/article/column/add',{
          name:this.form1.name,
          desc:this.form1.desc,
          sort:this.form1.sort
        }).then(function(res){
            if (res['data']['code']==0) {
              that.$message('增加成功')
              that.getlist(that.page.currentPage,that.page.pagesize)

             }else{
               that.$message(res['data']['msg'])
             }
        })
        }else{
          that.$message('请填栏目名称或者名称字符长度至少为4')
        }
      
    },
    editSure(){
      var that = this
      that.axios.post('/api/v1/admin/article/column/edit',{
          id:this.form.id,
          name:this.form.name,
          desc:this.form.desc,
          sort:this.form.sort
      }).then(function(res){
 if (res['data']['code']==0) {
              that.$message('编辑成功')
              that.getlist(that.page.currentPage,that.page.pagesize)

             }else{
               that.$message(res['data']['msg'])
             }        
      })
    }

  },
  components: {
    headson: headson
  }
};
</script>

<style scoped lang="scss">
a {
  color: #0e90d2;
}
.pages {
  margin: 0 50px;

  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  // float: right;
  height: 100px;
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
      width: 55px;
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
    // height: 640px;
    border: 1px solid #e6e6e8;
    margin: 0 50px;
    margin-top: 30px;
    background-color: #ffffff;
  }
}
  .add,
  .complete {
    width: 300px;
    height: 25px;
    margin: 0 auto;
    text-align: center;
    line-height: 25px;
    position: relative;
    color: gray;
    border: 1px solid #dfd7d7;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
  }
</style>