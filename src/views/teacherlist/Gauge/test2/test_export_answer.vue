<template>
  <div>
    <div>
      <el-button type="primary" style="margin:10px" @click="Download">存为Excel文档</el-button>
    </div>
    <table class="am-table">
      <thead>
        <th>#</th>
        <th>编号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>年龄</th>

        <th>名族</th>
        <th>父亲年龄</th>
        <th>父亲职业</th>
        <th>父亲去世</th>
        <th>母亲年龄</th>
        <th>母亲职业</th>
        <th>母亲去世</th>
        <th>父母婚姻</th>
        <th>离异年龄</th>
        <th>寄养经历</th>
        <th>寄养年龄</th>
        <th>生源类型</th>
        <th>独生子女</th>
        <th>家庭经济</th>

        <th>测评时间</th>
        <th v-for="(item1,index1) in scalelist[0].result" :key="index1">{{item1.name}}</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in scalelist" :key="index">
          <td>{{index+1}}</td>
          <td>{{item.user_id}}</td>
          <td>{{item.stu_name}}</td>
          <td>{{item.sex==0? '女' : '男'}}</td>
          <td>{{item.age}}</td>
          <td>{{item.nation}}</td>

          <td>{{item.father_age}}</td>
          <td>{{item.father_job}}</td>
          <td>{{item.father_die_age}}</td>
          <td>{{item.mother_age}}</td>
          <td>{{item.mother_job}}</td>
          <td>{{item.mother_die_age}}</td>
          <td>
            <span v-if="item.parent_marriage_status==1">良好</span>
            <span v-else-if="item.parent_marriage_status==2">一般</span>
            <span v-else-if="item.parent_marriage_status==2">较差</span>
            <span v-else>离异</span>
          </td>
          <td>{{item.parent_divorced_age}}</td>
          <td>{{item.foster_flag==1? '是' : '否'}}</td>
          <td>{{item.foster_age}}</td>
          <td>
            <span v-if="item.stu_type==1">农村</span>
            <span v-else-if="item.stu_type==2">城市</span>
            <span v-else-if="item.stu_type==3">城镇</span>
            <span v-else-if="item.stu_type==4">留学生</span>
          </td>
          <td>{{item.only_child==1? '是' : '否'}}</td>
          <td>{{item.economy==1? '困难' : '不困难'}}</td>
          <td>{{item.start_test_time}}</td>
          <td v-for="(item1,index1) in item.result" :key="index1">{{item1.score}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { global } from "../../../../global/global";
export default {
  data() {
    return {
      newtable: [{}, {}],
      thead: [
       
        "编号",
        "姓名",
        "性别",
        "年龄",
        "民族",
        "父亲年龄",
        "父亲职业",
        "父亲去世",
        "母亲年龄",
        "母亲职业",
        "母亲去世",
        "父母婚姻",
        "离异年龄",
        "寄养经历",
        "寄养年龄",
        "生源类型",
        "独生子女",
        "家庭经济",
        "测评时间"
      ],
      factor: "",
      fct_cal: "",
      scalelist: ""
    };
  },
  created() {
    var scalesobj = JSON.parse(localStorage.getItem("scalesobj"));
    this.factor = scalesobj["fct"];
    this.fct_cal = scalesobj["fct_cal"];
    this.scalelist = scalesobj["list"];
    this.scalelist.map((item, index) => {
      if (item["birth_date"]) {
        var a = new Date().getTime() - new Date(item["birth_date"]);
        var hours = a / 1000 / 60 / 60;
        var year = Math.floor(hours / (24 * 30 * 12));
        console.log(year);
        item["age"] = year;
      } else {
        item["age"] = "null";
      }
      var result = JSON.parse(item["result"]);
      this.factor.map((item1, index1) => {
        for (var key in result) {
          if (key - 0 == item1.id - 0) {
            result[key]["name"] = item1.name;
            item[item1.name] = result[key]["score"];
          }
        }
      });
      item["result"] = result;
      //  console.log(this.scalelist,result)
    });
    console.log(this.scalelist);
  },
  methods: {
    Download() {
      const newtable = this.scalelist;
      newtable.map((item, index) => {
        // item.sex-0 == 0 ? (item.sex = "女") : (item.sex = "男");
        // item.foster_flag-0 == 1
        //   ? (item.foster_flag = "是")
        //   : (item.foster_flag = "否");
        // item.only_child-0 == 1
        //   ? (item.only_child = "是")
        //   : (item.only_child = "否");
        item.economy-0 == 1 ? (item.economy = "困难") : (item.economy = "不困难");
        // switch (item.parent_marriage_status-0) {
        //   case 1:
        //     item.parent_marriage_status = "良好";
        //     break;
        //   case 2:
        //     item.parent_marriage_status = "一般";
        //     break;
        //   case 3:
        //     item.parent_marriage_status = "较差";
        //     break;
        //   case 4:
        //     item.parent_marriage_status = "离异";
        //     break;
        // }
        switch (item.stu_type-0) {
          case 1:
            item.stu_type = "农村";
            break;
          case 2:
            item.stu_type = "城市";
            break;
          case 3:
            item.stu_type = "城镇";
            break;
          case 4:
            item.stu_type = "留学生";
            break;
        }
      });
      const tHeader = this.thead;
      const filterVal = [
        "user_id",
        "stu_name",
        "sex",
        "age",
        "nation",
        'father_age',
        'father_job',
        'father_die_age',
       'mother_age',
       'mother_job',
       'mother_die_age',
        'parent_marriage_status',
        'parent_divorced_age',
        'foster_flag',
        'foster_age',
        'stu_type',
        'only_child',
        'economy',
        'start_test_time'
      ];
     this.factor.map((item,index)=>{
        filterVal.push(item.name)
        tHeader.push(item.name)

      })
      console.log(filterVal)
      global.handleDownload(tHeader, filterVal, newtable);
    }
  }
};
</script>

<style lang="scss" scoped>
.am-table {
  margin-top: 20px;
  width: 100%;
  margin-bottom: 1.6rem;
  border-spacing: 0;
  border-collapse: separate;
  max-width: 100%;
  background-color: transparent;
  empty-cells: show;
  td,
  th {
    display: table-cell;
    padding: 0 5px;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
}
</style>