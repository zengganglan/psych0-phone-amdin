<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->
    <div class="search">
      <ul>
        <li>
          <!-- 学校组件 -->
          <span>书号：</span>
          <input type="text" value>
        </li>
       <li>
          <!-- 学校组件 -->
          <span>书名：</span>
          <input type="text" value>
        </li>
        <li>
          <span>作者：</span>
          <input type="text" value id="person">
          <!-- 点击搜索开始出现table表格 -->
          <i class="iconfont icon-sousuo" @click="showtable()"></i>
          <span class="iconfont icon-wenhao"></span>
        </li>
      </ul>
    </div>
    <div class="body" v-if="tableflag">
      <!-- <div class="work">
        <span class="del iconfont icon-daochu1">删除</span>
        <span class="dev">阅读情况</span>
      </div> -->
      <div class="datas">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="书号" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="ID" width="120"></el-table-column>
          <el-table-column prop="address" label="书名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="作者" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="出版社" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="出版日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="定价" show-overflow-tooltip></el-table-column>
 
        </el-table>

       


      </div>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
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

// import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
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
      // 搜索出现表格
      tableflag: false,
      // 页码
      page: {
        currentPage: 1,
        countpage: "",
        pagesize: 1,
        flag: false,
        offset: 0,
        size: "20"
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
    
   
   

    };
  },

  created() {
    this.getList();
    //      const tHeader = ["字段1", "字段2", "字段3", "字段4"];
    //     const filterVal = ["sort", "class", "name", "ID"];
    //     const list = this.tableData3;
    //  global.handleDownload(tHeader,filterVal,list)
  },
  mounted() {},
  methods: {
    // getList获取列表数据给tableData3赋值
    getList() {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      //   this.page.countpage = Math.ceil(
      //     this.tableData3.length / this.page.pagesize
      //   );
    },
    // 分页·
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 操作
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
    },
    Reading(index, row) {
      console.log(index, row);
      this.dialogTableVisible = true;
    },
    //   全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    submitcontent() {
      this.dialogFormVisible = false;
      console.log(this.form.htmlForEditor);
    },
    // 全选删除
    handleDelAll(){
       this.multipleSelection
    },

    // 搜索功能
    showtable() {
      //子组件树形控件的开关
      this.tableflag = true;
      // 搜索开始获取表单value提交信息到后台，后台返回数据渲染
      console.log(1);
    },

    //增加数据把填写的数据得到完成向后台提交数据
    complete() {
      this.addflag = false;
      console.log(this.values);
      this.$refs.tab.addnumber();
    },
    //编辑后确定
    queding(id) {
      // 点击确定提交数据到后台=>数据增加到tables，同时把addflag变为false和关闭打开的编辑框
      console.log(this.value1);
      this.addflag = false;
      this.index1 = "";
      console.log(this.values.select);
    },
    //编辑时取消
    cancle(id) {
      this.addflag = false;
      this.index1 = "";
      console.log("zg");
    },
    // 点击编辑出现文本框
    setting(id) {
      // this.settingflag.id=id
      // console.log(this.settingflag)
      console.log(id);
      this.index1 = id;
      console.log(this.values.select);
    },
    // 点击删除单条数据
    del(id) {},
    //点击删除选中的数据【在点击上一页下一页需要记录每页选择的数据，如果新数组没有且当页选择了就当进去，如果新数组有当页没选择就删除】
    handleDelAll() {
      var icheck = this.$refs.icheck;
      var newarr = [];
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked) {
          var value = icheck[i].value;
          console.log(value);
          newarr.push(value);
        }
      }
      //  把删除的标记值传给后台
      console.log(newarr);
    }
  },
  components: {
    headson: headson,
    schoolcheck: schoolcheck,

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
      input {
          height: 32px;
          outline: none;
          border: none;
          width: 150px;
          border: 2px solid #e2e2e2;
        }
      li:nth-child(1) {
        float: left;
        margin-left: 50px;
        margin-right: 150px;

       
      }
      li:nth-child(2) {
        float: left;
        margin-left: 50px;
        margin-right: 100px;
        width: 300px;

        #type {
          height: 32px;
          outline: none;
          width: 150px;
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
      li:nth-child(3) {
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
      height: 640px;
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
</style>



