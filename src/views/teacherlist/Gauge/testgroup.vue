<template>
  <div class="main">

    <!-- <div class="tab">
      <ul>
        <li
          v-for="(item,index) in tabls"
          :class="{tabactive:tabindex-1==index}"
          :key="index"
          @click="tab(index)"
        >{{item}}</li>
      </ul>
    </div> -->
    <ul>
      <li class="data1" v-if="tabindex==1">
        <div class="body">
          <!-- <div class="work">
            <span class="del" @click="del()" :class="{ btnactive: isbtnActive }">
              删除
              <i class="iconfont icon-trash"></i>
            </span>
          </div> -->
          <div class="datas">
            <table class="tb_list" ref="tables">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      name="available"
                      value="0"
                      ref="allcheck"
                      @click="allcheck()"
                      class="icheck"
                    >
                  </th>
                  <!-- 也可以循环遍历 -->
                  <th v-for="(item,index) in thead" :key="index">{{item}}</th>
                </tr>
              </thead>
             <tbody>
                <tr
                  v-for="(item,index) in tableData3"
                  :key="index"
                  @mouseover="changecolor(index)"
                  v-bind:class="{heightcolor:isactive==item.sort}"
                  @mouseout="colorcancel()"
                >
                  <td align="center">
                    <input
                      type="checkbox"
                      name="available"
                      :value="item.id"
                      ref="icheck"
                      @click.stop="icheck()"
                      class="icheck"
                    />
                  </td>
                  <td class="sort">{{item.scalename}}</td>
                  <td class="class">
                    <!-- 点击跳转相关年纪的班级 -->
                    <span>{{item.groupname}}</span>
                    <!-- <router-link :to="'/admin/settingStudent?id=' + item.id" tag="a"></router-link> -->
                  </td>
                  
                  <td>
                    <span>{{item.person}}</span>
                  </td>
                
                  <td>
                    <span>{{item.expire_time}}</span>
                  </td>
                 
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pages">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.currentPage"
              :page-sizes="[10, 20, 30, 40,50,60]"
              :page-size="page.size"
              layout="total, sizes, jumper"
              :total="page.total"
            ></el-pagination>
          </div>
                  <div class="add" @click="addnumber">新增</div>

        </div>
      </li>
      <li class="data3" v-else>
        <div class="body">
          <div class="work">
            <span class="reset" @click="reset">删除</span>
          </div>
          <div class="datas">
            <table class="tb_list" ref="tables">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      name="available"
                      value="0"
                      ref="allcheck"
                      @click="allcheck()"
                      class="icheck"
                    >
                  </th>
                  <!-- 也可以循环遍历 -->
                  <th v-for="(item,index) in thead1" :key="index">{{item}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,index) in tableData3"
                  :key="index"
                  @mouseover="changecolor(index)"
                  @click="setting(item.sort)"
                  v-bind:class="{heightcolor:isactive==item.sort}"
                  @mouseout="colorcancel()"
                >
                  <td align="center">
                    <input
                      type="checkbox"
                      name="available"
                      :value="item.sort"
                      ref="icheck"
                      @click.stop="icheck()"
                      class="icheck"
                    >
                  </td>
                  <td class="sort">{{item.job_num}}</td>
                  <td class="class">
                    <!-- 点击跳转相关年纪的班级 -->
                    <router-link :to="'/admin/settingStudent?' + item.sort" tag="a">{{item.name}}</router-link>
                  </td>
                  <td>
                    <span>{{item.sex}}</span>
                  </td>
               
 
                  <td>
                    <template>
                      <el-button size="mini" @click="setting(item.sort)"><span class="iconfont icon-qrcode"></span></el-button>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pages">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.currentPage"
              :page-sizes="[10, 20, 30, 40,50,60]"
              :page-size="page.size"
              layout="total, sizes, jumper"
              :total="page.total"
            ></el-pagination>
          </div>
                  <div class="add" @click="addnumber">新增</div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import schoolcheck from "../../../components/schoolcheck";
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";
import { global } from "../../../global/global";

export default {
  data() {
    return {
      isbtnActive: false,

      // 高亮显示
      isactive: "",
      // 头部组件信息
      headson: ["测试组合及分发", "系统量表管理，操作"],

      // 切导航行栏
      tabls: ["组合分发", "组合设置"],
      tabindex: 1,
      // 页码
      page: {
        currentPage: 1,
        total: 0,
        flag: false,
        size: 20
      },
      // 编辑
      index1: "",
      //增加数据
      addflag: false,
      values: {
        value1: "",
        value2: "",
        value3: ""
      },
 thead: [
        "量表",
        "班级",
        "学生",
        "截止时间",
      ],      thead1: ["序号", "名称", "量表组合", "测评二维码"],
      //请求数据赋值
      tableData3: [],
      // 提交资料
      submitflag: true
    };
  },
  watch: {},

  created() {
    this.getList(this.page.currentPage, this.page.size);
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList(currentPage, pagesize) {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/admin/scale/getScaleCombList", {
          page: currentPage,
          size: pagesize
        })
        .then(function(res) {
          var data = res["data"]["data"]['list'];
           that.page.total = res["data"]["data"]["total"];
          data.map(function(item, index) {
            if (item['scale'].length>0) {
              var st=''
              item['scale'].map(item1=>{
                st=st+item1['name']+','
              })
              item['scalename']=st
            }else{
             item['scalename']='无'
            }
           if (item['target_name'].length>0) {
             var str=''
              item['target_name'].map(item2=>{
                str=str+item2['name']+','
              })
              item['targetname']=str
            }else{
           item['targetname']='无'
            }
            if (item['type']==1) {
              item['groupname']=item['targetname']
              item['person']='无'
            }else{
               item['person']=item['target']
              item['groupname']='无'
            }
          });
          that.tableData3 = data;
          console.log(data);
        });
      this.page.countpage = Math.ceil(
        this.tableData3.length / this.page.pagesize
      );
    },
    // 分页·
    handleSizeChange(val) {
      this.page.size = val;
      this.getList(this.page.currentPage, this.page.size);
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getList(this.page.currentPage, this.page.size);
    },
    // 增加数据
    addnumber() {
      this.addflag = true;
      console.log(this.addflag);
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
    },
    //编辑后确定
    queding(id) {
      // 点击确定提交数据到后台=>数据增加到tables，同时把addflag变为false
      console.log(this.value1);
      this.addflag = false;
      this.index1 = "";
    },
    //编辑时取消
    cancle(id) {
      this.addflag = false;
      this.index1 = "";
    },
    // 点击编辑出现文本框
    setting(id) {
      // this.settingflag.id=id
      // console.log(this.settingflag)
      console.log(id);
      this.index1 = id;
    },
    // 点击删除单条数据
    del(id) {
      var ids = [];
      if (id) {
        ids.push(id);
      } else {
        var icheck = this.$refs.icheck;
        for (var i = 0; i < icheck.length; i++) {
          if (icheck[i].checked) {
            var value = icheck[i].value;
            // 找到选中单选框数据的id唯一值
            ids.push(value);
          }
        }
        if (ids.length == 0) {
          this.$message("请至少选择一个删除");
          return;
        }
      }
      console.log(ids);

      var that = this;
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
          this.axios
            .post("/api/v1/admin/user/delRole", { id: ids })
            .then(function(res) {
              console.log(res);
              if (res["data"]["code"] == 0) {
                that.getList(that.page.currentPage, that.page.size);
                that.$message("删除成功");
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
    //点击删除选中的数据
    handleDelAll() {},
    // 全选反选
    allcheck() {
      var allcheck = this.$refs.allcheck;
      var icheck = this.$refs.icheck;
      for (var i = 0; i < icheck.length; i++) {
        // 把allchecked的状态赋值给每一个子选框
        icheck[i].checked = allcheck.checked;
      }
    },
    //反选
    icheck() {
      var allcheck = this.$refs.allcheck;
      var icheck = this.$refs.icheck;
      var flag = true;
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked == false) {
          flag = false;
        }
      }
      allcheck.checked = flag;
      if (event.target.checked) {
        event.target.parentNode.parentNode.style.backgroundColor = "#F8F8FA";
        this.isbtnActive = true;
      } else {
        event.target.parentNode.parentNode.style.backgroundColor = "";
      }
    },
    // 导出excel表格功能
    handleDownload() {
      let vm = this;
      const list = vm.tableData3;
      var icheck = this.$refs.icheck;
      var newarr = [];
      var newtable = [];
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked) {
          var value = icheck[i].value;
          console.log(value);
          newarr.push(value);
        }
      }
      //  把删除的标记值传给后台
      console.log(newarr);
      for (var i = 0; i < newarr.length; i++) {
        this.tableData3.map(function(item, index) {
          // sort是数据标记值
          if (item["sort"] == newarr[i]) {
            newtable.push(item);
          }
        });
      }
      console.log(newtable);
      const tHeader = this.thead;
      const filterVal = [
        "id",
        "job_num",
        "name",
        "unit_group",
        "phone",
        "auth_group_id",
        "last_login"
      ];
      global.handleDownload(tHeader, filterVal, newtable);
    },

    //导航栏切换
    tab(index) {
      console.log(index);
      this.tabindex = index - 0 + 1;
    },
    // 搜索功能
    showtable() {
      // this.tableflag = true;
      // 搜索开始获取表单value提交信息到后台，后台返回数据渲染
      console.log(1);
    },
    //过滤操作
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    // 划过事件
    changecolor(index) {
      this.isactive = index - 0 + 1;
    },
    colorcancel() {
      this.isactive = "";
    },
    checknode() {
      console.log(this.$refs.schoolcheck1.newvalue);
      // this.tableflag = true;
    },
    reset() {
      // 重置密码 选中的
    },
    handleEdit(){

    }
  },
  components: {
    schoolcheck: schoolcheck,
    headson: headson,
    pagination: pagination
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #169bd5;
}
.heightcolor {
  background-color: #f8f8fa;
}
.tabactive {
  color: #6998fb;
  border-bottom: 10px solid #6998fb;
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
 .tab {
    width: 100%;
    height: 60px;
    color: #bfbfc0;
    font-size: 12px;

    background-color: #fbfbfb;
    border: 1px solid #eff2f9;
    box-shadow: #eff2f9 1px 1px 20px;
    ul {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;

      li {
        float: left;
        text-align: center;
        width: 2rem;
        line-height: 60px;
        // margin: 0 70px;
      }
    }
  }
  .data1 {
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
        justify-content: space-between;
        li:nth-child(1) {
          margin-left: 50px;
          margin-right: 150px;
          .schoolcheck1 {
            position: relative;
            top: -25px;
            left: 40px;
            width: 200px;
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
            top: -1px;
            border: 2px solid #e2e2e2;
            border-left: none;
          }
          .icon-wenhao {
            color: #169bd5;
            font-size: 25px;
          }
        }
      }
    }
  }
  .body {
    margin-top: 30px;
    overflow: hidden;
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
        line-height: 20px;
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
    .datas {
      height: 640px;
      border: 1px solid #e6e6e8;
      margin : 0 10px;
      margin-top: 30px;
      background-color: #ffffff;

      .tb_list {
        margin: 0 auto;
        width: 100%;
        thead {
          th {
            border-bottom: 1px solid #dfd7d7;
            text-align: center;
            height: 30px;
            line-height: 30px;
          }
        }
        tbody {
          td {
            border-bottom: 1px solid #dfd7d7;
            text-align: center;
            height: 36px;
            line-height: 36px;
          }
        }
      }
    }
  }
  .add {
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
  .data2 {
    width: 90%;
    height: 488px;
    margin: 0 auto;
    background-color: #ffffff;
    overflow: hidden;
    margin-top: 50px;
    border: 1px solid #e6e6e8;

    ul {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      margin-top: 100px;
      color: #a8a8a8;
      font-size: 20px;
      li {
        text-align: center;
        position: relative;
        span {
          position: absolute;
          left: -20px;
        }
      }

      li:nth-child(1) {
        width: 300px;
        height: 50px;
        margin-left: 20px;
        .schoolcheck1 {
          display: inline-block;
          position: relative;
          width: 235px;
          top: -5px;
        }
      }
      li:nth-child(2) {
        width: 300px;
        margin-left: 100px;
        .schoolcheck1 {
          position: relative;
          width: 235px;
          left: 35px;
          top: -5px;
        }
      }
      // li:nth-child(4) {
      //   width: 100px;
      //   height: 30px;
      //   background-color: #169bd5;
      //   text-align: center;
      //   span {
      //     position: absolute;
      //     top: 5px;
      //     left: 15px;
      //     color: white;
      //   }
      // }
    }
    .complet,
    .submit {
      width: 210px;
      height: 34px;
      margin: 0 auto;
      text-align: center;
      background-color: #6999fd;
      line-height: 34px;
      font-size: 20px;
      color: #ffffff;
      margin-top: 100px;
    }
  }
  .data3 {
    .search {
      height: 80px;
      margin: 0 auto;
      background-color: #f8f8fa;
      border: 1px solid #eff2f9;
      box-shadow: #eff2f9 1px 1px 20px;
      li {
        margin-top: 20px;
      }
      li:nth-child(1) {
        font-size: 25px;
        color: #9f9a9b;
        width: 200px;
        float: left;
        margin-left: 10px;

        .icon-wenhao {
          color: #169bd5;
          font-size: 30px;
        }
      }
      li:nth-child(2) {
        float: left;

        margin-left: 0;
        width: 400px;
        span {
          vertical-align: center;
          color: #9f9a9b;
          position: relative;
          top: 5px;
          left: -10px;
        }
        .schoolcheck1 {
          display: inline-block;
          width: 300px;
          position: absolute;
        }
      }
      li:nth-child(3) {
        float: left;
        span {
          display: inline-block;
          height: 33px;
          width: 30px;
          position: relative;
          top: 0px;
          left: -50px;
          cursor: pointer;
          border-radius: 5px;
          color: #bfbfc0;
          background-color: #f8f8fa;
          outline: none;
          line-height: 33px;
          font-size: 22px;
          color: #169bd5;
          border: 2px solid #e2e2e2;
          text-align: center;
        }
      }
    }
    .reset {
      line-height: 30px;
    }
  }
}
.btnactive {
  background-color: #c6e2ff !important
  ;
}
</style>



