<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <div class="body">
      <div class="work">
        <span class="Refresh">刷新</span>
        <span class="returnBack">返回</span>
      </div>
      <div class="datas">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column type="index" width="50"></el-table-column>

          <el-table-column label="标题" width="120">
            <template slot-scope="scope">
              <router-link to>{{scope.row.date}}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="120">
            <template slot-scope="scope">
              <router-link to>{{scope.row.name}}</router-link>
            </template>
          </el-table-column>
          <el-table-column property="address" label="打开次数"></el-table-column>
          <el-table-column property="address" label="时长"></el-table-column>
          <el-table-column property="address" label="最近访问时间"></el-table-column>
        </el-table>
      </div>
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
</template>

<script>
import headson from "../../../components/headson";

export default {
  data() {
    return {
         // 页码
      page: {
        currentPage: 1,
        countpage: "",
        pagesize: 1,
        flag: false,
        offset: 0,
        size: "20"
      },
      // 头部组件信息
      headson: ["阅读情况", "获取阅读情况"],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentRow: null
    };
  },
  methods: {
    handleCurrentChange(val) {
      //   点击一行触发的事件
      this.currentRow = val;
      console.log(val);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
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
    height: 640px;
    border: 1px solid #e6e6e8;
    margin: 0 50px;
    margin-top: 30px;
    background-color: #ffffff;
  }
}
</style>