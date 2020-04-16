<template>
  <div class="main">
    <!-- 头部 -->
    <!-- <headson :headson="headson"></headson> -->
    <!-- 搜索栏 -->
    <div class="search">
            <!-- <span class="iconfont icon-filter" @click="searchchange">筛选</span> -->

      <ul v-if="searchflag">
        <li>
              <span class="el-icon-circle-close" @click="closesearch"></span>
          范围：
          <select name v-model="formLabelWidth" id="type">
            <option
              :value="item['id']"
              v-for="(item,index) in $store.state.adminGroup"
              :key="index"
              selected="selected"
            >{{item['title']}}</option>
          </select>
        </li>
        <li>
          分类：
          <select name v-model="formLabelWidth" id="type">
            <option
              :value="item['id']"
              v-for="(item,index) in $store.state.adminGroup"
              :key="index"
              selected="selected"
            >{{item['title']}}</option>
          </select>
        </li>
        <li>
          <span>学生信息:</span>
          <input type="text">
          <i data-v-30c34ff0 class="iconfont icon-sousuo"></i>
        </li>
      </ul>
    </div>
    <!-- <div class="work">
    
      <span class="del" @click="handleDelete">
        删除
        <i class="iconfont icon-trash"></i>
      </span>
    </div> -->
    <div class="data">
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        :cell-style="{width:'80px',height:'30px'}"
        @selection-change="handleSelectionChange"
      >
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
      prop="name"
      label="访谈对象"
     >
    </el-table-column>
        <el-table-column
      prop="counselor_name"
      label="咨询师"
     >
    </el-table-column>
     <el-table-column
      prop="staus"
      label="处理状态"
     >
    </el-table-column>
      <el-table-column
      prop="proc_idea"
      label="处理意见"
     >
    </el-table-column>
  
 <!-- <el-table-column label="操作" width="160">
     
      <template slot-scope="scope">
        <el-button  size="mini" disabled v-if="scope.row['dos']===0">处理</el-button>
        <el-button
          size="mini"
          @click.stop="handleEdit(scope.$index, scope.row)" v-else-if="scope.row['dos']===2">处理</el-button>
        <el-button
          size="mini"
          type="danger"
          @click.stop="handleEdit(scope.$index, scope.row)" v-else>修改</el-button>
      </template>
    </el-table-column>      -->
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
    <el-dialog title="新增访谈" :visible.sync="dialogFormVisible" >
      <el-form :model="form">
          <el-form-item label="星期" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="请选择"  @change="changevalue" value-key>
        <el-option
          v-for="item in this.$store.state.sandgroups"
          :key="item.id"
          :label="item.name"
          :value="item.name"
         
        ></el-option>
      </el-select>
        </el-form-item>
        <el-form-item label="时间起" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 210px;" type='time'></el-input>
        </el-form-item>
        <el-form-item label="时间止" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 210px;"  type='time'></el-input>
        </el-form-item>
        <el-form-item label="咨询师" :label-width="formLabelWidth">
<el-select v-model="form.name" placeholder="请选择"  @change="changevalue" value-key>
        <el-option
          v-for="item in this.$store.state.sandgroups"
          :key="item.id"
          :label="item.name"
          :value="item.name"
         
        ></el-option>
      </el-select>        </el-form-item>
         <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.unit_name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="makesure()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="访谈记录" :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form1.name" autocomplete="off" style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth">
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

export default {
  data() {
    return {
            searchflag:false,
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
      headson: ["访谈记录管理",'记录管理'],
      tableData: [
        {
          id: "张三（12334）",
          name: "李静（456787）",
          amount1: "2013-3-4 12:00-2013-3-10 12:00",
          amount2: "未处理",
        
        },
          {
          id: "初三2班",
          name: "李静（456787）",
          amount1: "2013-3-4 12:00-2013-3-10 12:00",
          amount2: "无需干预",
        
        },
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
    this.getlist(this.page.currentpage,this.page.pagesize);
    this.changeobj(this.tableData);
  },
  methods: {
    getlist(currentpage, pagesize) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/admin/coach/list", {
          page: currentpage,
          size: pagesize
        })
        .then(function(res) {
          if (res["data"].code == 0) {
            that.page.countpage = res["data"]["data"]["total"];
            that.tableData = res["data"]["data"]["list"];
            var server_time= res["data"]["data"]["server_time"]
             that.tableData.map((item,index)=>{
             item['times']=item['start_time']+'—'+item['end_time']
             var a = new Date(item['start_time']).getTime()
             var b = new Date(item['end_time']).getTime()
             var c = new Date(server_time).getTime()
             switch (
               item['proc_idea']-0
             ) {
               case 0:
                 item['proc_idea']='无'
                 break;
               case 1:
                 item['proc_idea']='无须干预'
                 break;
               case 2:
                 item['proc_idea']='预约面询'
                 break;
               case 3:
                 item['proc_idea']='危机干预'
                 break;
               case 4:
                 item['proc_idea']='联系领导'
                 break;
               case 5:
                 item['proc_idea']='跟踪随访'
                 break;
             
              
             }
             if(c<a && a<=b){
               item['staus']='未开始'
                item['dos']=0
             }else if(c>b && b>=a){
                if (item['feedback_time']) {
                   item['staus']='结束已处理'
                    item['dos']=1
                }else{
                    item['staus']='结束未处理'
                     item['dos']=2
                }
             } else{
                if(a<=c && c<=b){
                     if (item['feedback_time']) {
                   item['staus']='正在进行已处理'
                    item['dos']=1
                 }
                }else{
                  item['staus']='正在进行未处理'
                   item['dos']=2
                }
               
             }
          })
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
      console.log(row)
      this.dialogFormVisible1 = true;
      this.form1.id = row.id;
      this.form1.name = row.name;
      this.form1.unit_name = row.unit_name;
      this.$router.push({path:'/Consultation/historydetail',query:{id:row.id}})
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
        .post("/api/v1/admin/coach/delete", { id: id })
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
    changevalue(){

    },
     searchchange(){
      this.searchflag=true
    },
    closesearch(){
      this.searchflag=false
    },
    cellStyle(){
        return
    }
  },

  components: {
    headson: headson,
    pagination: pagination
  }
};
</script>

<style scoped lang="scss">
.tr{
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
   height: 30px;
    line-height: 30px;
    // height: 80px;
    font-size: 14px;
    margin: 0 auto;
    background-color: #fafafc;
    border: 1px solid #eff2f9;
    box-shadow: #eff2f9 1px 1px 20px;
    text-align: right;
    position: relative;
     .icon-filter{
       color: #169bd5;
       margin-right: 5px;
    }
  ul {
    padding: 5px;
      position: absolute;
      padding-top: 25px;
      right: 5px;
      z-index: 99999;
      background-color: #ffffff;
      border: 1px solid #99a9bf;
    li {
       height: 50px;
        text-align:left;
    }
     li:nth-child(1) {
        position: relative;
        .el-icon-circle-close{
          position: absolute;
          right: 0;
          top:-20px;
          font-size: 20px;
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
</style>