<template>
  <div class="main">
    <!-- 头部 -->
    <!-- <headson :headson="headson"></headson> -->
    <!-- 搜索栏 -->
    <div class="search">
      <!-- <span>关键字</span>
      <input type="text">
      <i data-v-30c34ff0 class="iconfont icon-sousuo"></i> -->
    </div>
     <!-- <div class="work">
                <span class="del" @click="handleDelete">
          删除
          <i class="iconfont icon-trash"></i>
        </span>
      </div> -->
    <div class="data">
      
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
         :default-sort = "{prop: 'date', order: 'descending'}"
           @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column property="sort" width="120mmmm" label="序号"></el-table-column> -->
          <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
        <el-table-column prop="view_name" label="友好名称"></el-table-column>
        <el-table-column prop="short_name" label="英文简称"></el-table-column>
                <el-table-column prop="type_name" label="量表类别"></el-table-column>

        <el-table-column prop="topic_count" label="题数"></el-table-column>
        <el-table-column label="适用年龄">
          <template slot-scope="scope">
            <span>{{scope.row.min_age+" — "+scope.row.max_age}}</span>
          </template>
        </el-table-column>
         <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click.stop="handleEdit(scope.$index, scope.row)">测试</el-button>
      
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
     </div>    </div>
        
 

  </div>
</template>

<script>
// import '../../../assets/excel/新时代智慧党建渠道价格表11.19(3).xlsx'
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";

export default {
  data() {
    return {
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
      // 头部组件信息
      headson: ["我的自测","根据自己兴趣测试一下量表"],
      tableData: [],
      tableData3:[  ],
      multipleSelection: [],
      // 页码
      page: {
        currentpage: 1,
        countpage: 0,
        pagesize: '10',
        flag: false
      },
     currentRow: null
    };
  },
  created() {
    this.getlist(this.page.currentpage,this.page.pagesize);

  },
  methods: {
    getlist(currentpage,pagesize) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that= this     
      this.axios.post('/api/v1/scale/getScaleList',{page:currentpage,size:pagesize}).then(function(res){
          if (res['data'].code==0) {
            var data = res['data']['data']['list']             
              that.page.countpage=res['data']['data']['count']
              that.tableData=data
          }
           if (that.tableData.length==0) {
         this.$message('没有待测量表') 
       }
          console.log(res)
      })
     
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
      console.log(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      var id = val["id"]
      var name = val['name']
      console.log(val)
      // 点击的当前数据// 跳转路由传参// 根据参数查询当前这个人的所有ar报告
    //   this.$router.push({path:"/data/game/gamedetail",query:{id:id,name:name}})
      //获取参数方法:      this.$route.query.id;
    },
       // 分页·
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page.pagesize=val
            this.getlist(this.page.currentpage,this.page.pagesize);

      },
      pageCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page.currentpage=val
            this.getlist(this.page.currentpage,this.page.pagesize);

      },
       handleEdit(index, row) {
      
        this.$router.push({path:'/test',query:{scaleid:row.id,name:row.view_name}})
        
      },
     
       handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      addnumber(){
       this.dialogFormVisible = true
      },
   
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
          top:3px
        }
      }
      span:nth-child(1) {
        margin-left: 20px;
      }
    }
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