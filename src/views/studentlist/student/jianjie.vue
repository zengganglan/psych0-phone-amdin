<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <div class="container">
      <div class="pa">
        <img src="../../../assets/images/School_Picture_22733.jpg" alt>
      </div>
      <div class="p0">中心简介</div>
      <div class="p1">
        我校心理健康中心于2015年建成，设计理念优秀，设施先进，由多个不同功能的功能室组成，满足解决来访学生的各种心理问题及心理需求的功能。 建校至今，已有87%的教师具备心理健康教育教师资格，其中3名教师获得南京市中小学心理咨询员资格，咨询师力量雄厚，有足够能力为众多学生提供心理上的帮助！
        <div class="jinji">
          <span>紧急联系方式:</span>
          <i>如有紧急状况请与025-66118399联系。</i>
        </div>
      </div>
      <div class="p2">咨询师列表</div>
      <div class="p0">
            <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";

export default {
  data() {
    return {
      headson: ["中心简介", "咨询中心简介"],
       tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  },
  created() {},
  methods: {},

  components: {
    headson: headson,
    pagination: pagination
  }
};
</script>

<style scoped lang="scss">
.container {
  min-height: 640px;
  border: 1px solid #e6e6e8;
  margin: 0 auto;
  margin-top: 30px;
  background-color: #ffffff;
  width: 720px;
  .p0,.p2,{
    border-bottom: 2px solid #09c;
    margin-top: 20px;
    color: #09c;
  }
  .pa {
  }
  .p1 {
    border-bottom: 2px solid #09c;
    padding: 10px;
    .jinji {
      border: 1px solid #ccc;

      span,
      i {
        display: inline-block;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #e7f3ff;
      }

      span {
        width: 120px;
        color: #06c;
        border-right: 1px solid #ccc;
      }
    }
  }
  
}
</style>