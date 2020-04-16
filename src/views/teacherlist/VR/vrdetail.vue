<template>
  <div class="main">
        <headson :headson="headson"></headson>

    <div class="search">
      <span>关键字</span>
      <input type="text">
      <i data-v-30c34ff0 class="iconfont icon-sousuo"></i>
       
    </div>
    <div class="data">
      <div class="work">
        <span class="export" @click="handleDownload" :class="{ btnactive: isbtnActive }">
          导出
          <i class="iconfont icon-daochu1"></i>
        </span>
        <!-- <excel-box :thead="this.thead" :filterVal="this.filterVal"  :tableData3="this.tableData3"></excel-box> -->
        <span class="del" @click="handleDelAll" :class="{ btnactive: isbtnActive }">
          删除
          <i class="iconfont icon-trash"></i>
        </span>
         <a href=javascript:history.back()>返回</a>
      </div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
           <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <!-- <el-table-column prop="name" label="序号" sortable width="180" column-key="date"></el-table-column> -->
        <el-table-column prop="upload_time" label="上传时间" width="180"></el-table-column>
        <el-table-column prop="vr_name" label="文件名"></el-table-column>
        <el-table-column prop="name" label="上传者"></el-table-column>
                <el-table-column prop="job_num" label="上传者工号"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
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
                
    <div class="add" @click="addnumber">新增</div>
     <el-dialog title="上传文件" :visible.sync="dialogFormVisible" width='600px'>
      <el-upload
        class="upload-demo"
        action="/api/v1/admin/vr/report/upload"
        :headers='{"X-Token":this.$store.state.token}'
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        ref="upload"
        :before-upload="beforeAvatarUpload"
        :on-success="success"
        :on-error="error"
        :on-progress="progress"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <div slot="tip" class="el-upload__tip">只能上传word文件，且不超过500kb</div>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件</el-button>
      </el-upload>

      <!-- <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import pagination from "../../../components/pagination";
import headson from "../../../components/headson";

export default {
  data() {
    return {
                  isbtnActive: false,

       headson: ["VR组内文件"],

       fileList: [
       
      ],
        dialogFormVisible :false,
        dialogFormVisible1:false,
          form: {
           name:"",
           unit_name:""
        },
         form1: {
            id:"",
           name:"",
           unit_name:""
        },
        formLabelWidth: '120px',
      tableData: [],
      // 页码
      page: {
        currentpage: 1,
        countpage: 0,
        pagesize: 20,
        flag: false
      },
        multipleSelection: []
    };
  },
  created() {
    this.getlist(this.page.currentpage, this.page.pagesize);
  },
  methods: {
        handleSelectionChange(val) {
        this.multipleSelection = val;
 if (val.length > 0) {
        this.isbtnActive = true;
      } else {
        this.isbtnActive = false;
      }        },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
 
    handleDelete(index, row) {
      console.log(index, row);
    },
    getlist(currentpage, pagesize) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this
      this.axios.post('/api/v1/admin/vr/report/list',{
            page: currentpage,
            size: pagesize,
            group_id:this.$route.query.id
      }).then(function(res){
        console.log(res)
        if (res['data']['code']==0) {
            that.tableData=res['data']['data']['list']
            that.page.countpage=res['data']['data']['total']
        }else{
          that.$message(res['data']['msg'])
        }
      })
     
    },
     // 分页·
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
          this.page.pagesize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
          this.page.currentpage = val;

      },
    // 导出excel表格功能---写成全局方法点击传参调用
    handleDownload(index, row) {
      var id = []
          if (row) {
              id.push(row.id)
          }else{
              if (this.multipleSelection.length!==0) {
                 this.multipleSelection.map((item)=>{
                  id.push((item['id']))
              }) 
              }else{
                  this.$message('请确定选中了选项')
              }
              
          }
     let config = {
        timeout: 5000,
        //添加请求头
        headers: {
          "Content-Type": "application/octet-stream"
        },
        responseType: 'arraybuffer'
        }
        var that= this
        for (var i = 0; i < id.length; i++) {
       this.axios
            .post("/api/v1/admin/vr/report/download/"+ id[i] ,{
              id:id
            }, config)
            .then(function(res) {
                 let blob = new Blob([res.data], {
               type: `application/msword`
              })
              let objectUrl = URL.createObjectURL(blob)
              window.location.href = objectUrl;
             
            });
        }
          
        
    },
    handleDelAll(){
                 var ids=[]
        if (this.multipleSelection.length!==0) {
            this.multipleSelection.map(item=>{
              ids.push(item.id)
            })
        }else{
            this.$message('请至少选择一个删除文件')
            return;
        }
        var that=this
         this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
          this.axios.post('/api/v1/admin/vr/report/delete',{id:ids}).then(function(res){
                  console.log(res)
                  if (res['data']['code']==0) {
                      that.getlist(that.page.currentpage, that.page.pagesize)
                      that.$message('删除成功')
                  }else{
                      that.$message(res['data']['msg'])
                  }
       }).catch(err=>{
           that.$message(err)
       })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 新增
     addnumber() {
      this.dialogFormVisible = true;
    },
    beforeAvatarUpload(file) {
      let Xls = file.name.split(".");
     console.log(file)
      if (Xls[1] === "docx" || Xls[1] === "doc") {
        return file;
      } else {
        this.$message.error("上传文件只能是 word文档");
        //   返回false停止上传
      }
      return false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    progress(event, file, fileList) {
      console.log(event, file, fileList);
    },
    error(err) {
      //   this.$message(err)
    },
    success(response, file, fileList){
           var that = this
          let cache_path = response["data"]["upload_path"];
          let suffix = response["data"]["suffix"];
          let save_name = file.name;
          console.log(save_name)
          that.axios.post('/api/v1/admin/vr/report/add',{
            group_id:this.$route.query.id,
            save_name:save_name,
            cache_path:cache_path
          }).then(res=>{
            console.log(res)
             if (res['data']['code']==0) {
                that.getlist(that.page.currentpage, that.page.pagesize)
                that.$message('增加文件成功')

            }else{
                that.$message(res['data']['msg'])
            }       
        
        })
    }
  },
    components: {
    headson: headson,
    pagination: pagination
  }
};
</script>

<style scoped lang="scss">
.pages{
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
  height: 640px;
  border: 1px solid #e6e6e8;
  margin: 0 50px;
  margin-top: 30px;
  background-color: #ffffff;
  position: relative;
  .work {
    position: absolute;
    top: -30px;
    right: 0;
    span,a{
      display: inline-block;
      float: right;
      width: 60px;
      height: 20px;
      background-color: #ffffff;
      font-size: 12px;
      text-align: center;
      line-height: 18px;
      border-radius: 5px;
      border: 1px solid #9f9a9b;
      cursor: pointer;
      margin-left: 10px;
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
.btnactive {
  background-color: #c6e2ff !important
  ;
}
</style>