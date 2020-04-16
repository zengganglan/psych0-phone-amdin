<template>
  <div class="main">
    <!-- <div class="head"> -->
      <!-- <div class="a1">单位组别设置</div>
      <span class="a2">单位组别设置，导出</span> -->

    <!-- </div> -->
    <div class="body">
      <div class="bread"><el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item v-for="(item, index) in returnName" :key="index">
            <span
              style="color:#169bd5;cursor: pointer;"
              @click="bread(item.id,index)"
            >{{item['name']}}</span>
          </el-breadcrumb-item>
</el-breadcrumb></div>
      <div class="work">
        <!-- <span class="return" @click="return1" v-if="pid">
          返回
          <i class="iconfont icon-daochu1"></i>
        </span> -->
        <!-- <span class="export" @click="handleDownload" :class="{ btnactive: isbtnActive }">
          导出
          <i class="iconfont icon-daochu1"></i>
        </span> -->
        <!-- <span class="del" @click="handleDelAll">
          删除
          <i class="iconfont icon-trash"></i>
        </span> -->
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
              <!-- 也可以循环遍历u11 -->
              <th v-for="(item,index) in thead" :key="index">{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="addflag">
              <tr>
                <td align="center">
                  <input type="checkbox" name="available" value="0" class="icheck">
                </td>
                <td class="class">
                  <!-- <input type="text" v-model="values.sort"> -->
                  *
                </td>
                <td>
                  <input type="text" v-model="values.name">
                </td>
                <td>
                  <el-button size="mini" @click.stop="complete()">确定</el-button>
                  <el-button size="mini" type="danger" @click.stop="cancle()">取消</el-button>
                </td>
              </tr>
            </template>
            <tr
              v-for='(item,index) in tableData3'
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
                  @click.stop="icheck(item)"
                  class="icheck"
                >
              </td>
              <td class="sort">
                <!-- <input v-if="index+1==index1" type="text" v-model="item.id" > -->
                <!-- id不能修改 pid可以 -->
                <!-- <span>{{index+1}}</span> -->
                <span>{{(page.currentPage-1)*page.pagesize+(index+1)}}</span>
              </td>
              <td class="class">
                <input v-if="index+1==index1" type="text" v-model="item.name">
                <!-- 点击跳转相关年纪的班级 -->
                <span v-else @click="findlistson(item.id,item.pid,item.name)" class="type">{{item.name}}</span>
                <!-- <router-link
                  :to="'/admin/grade.vue/' + item.id"
                  tag="a"
                  v-else
                >{{item.name}}</router-link>-->
              </td>

              <!-- <td>
                <template v-if="index+1==index1">
                  <el-button size="mini" type="primary" @click.stop="queding(index+1,item)">确定</el-button>
                  <el-button size="mini" type="warning" @click.stop="cancle(index+1)">取消</el-button>
                </template>
                <template v-else>
                  <el-button size="mini" @click.stop="setting(index+1)">编辑</el-button>
                  <el-button size="mini" type="danger" @click.stop="del(item.id)">删除</el-button>
                </template>
              </td> -->
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
       <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="prev, pager, next"
            :total="400"
          ></el-pagination>
     </div>
    <div>
      <!-- <div class="add" @click="addnumber()" v-if="!addflag">新增</div>
      <div class="complete" @click="complete()" v-else>完成</div> -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import excelbtn from "../../../components/excel";
import schoolcheck from "../../../components/schoolcheck";
import headson from "../../../components/headson";

export default {
  data() {
    return {
      isbtnActive:false,
      // pid:
      returnpids: [],
      returnName: [{ id: 0, name: "组别数据" }],
      pid: 0,
      // 高亮显示
      isactive: "",
      time: "",
        // 页码
      page: {
        currentPage: 1,
        countpage: "",
        pagesize: 1,
        flag: false,
        offset: 0,
        size: "20"
      },
      
      index1: "",
      //增加数据
      addflag: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      values: {
        sort: "",
        name: "",
        type: ""
      },
      //请求数据赋值
      thead: ["序号", "名称"],
      filterVal: ["id", "name"],
      tableData3: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  created() {
    this.getList();
    var time = new Date().getFullYear();
    this.time = time;
    console.log(this.pid);

  },
  methods: {
      bread(id, index) {
      console.log(id, index, this.returnName);
      this.returnName = this.returnName.slice(0, index + 1);
      var that = this;
      if (id == 0) {
        this.getList();
        return;
      }
      this.axios
        .get("/api/v1/admin/unit/list/pid?pid=" + id)
        .then(function(res) {
          var data = res["data"]["data"];
          var arr = [];
          for (var key in data) {
            for (var key1 in data[key]["items"]) {
              arr.push(data[key]["items"][key1]);
            }
          }
          that.tableData3 = arr;

          // 修改和增加需要传当前儿子数据的pid,
          that.pid = id;
          if (arr.length == 0) {
            that.$message("该类型没有子数据");
          }
        });
    },
       treeData(source, id, parentId, children){   
    let cloneData = JSON.parse(JSON.stringify(source))
    return cloneData.filter(father=>{
        let branchArr = cloneData.filter(child => father[id] == child[parentId]);
        branchArr.length>0 ? father[children] = branchArr : ''
        return father[parentId] == 0        // 如果第一层不是parentId=0，请自行修改
    })
},

    // getList获取列表数据给tableData3赋值,根据pid-11 显示所有pid==11的数据
    getList(pid) {
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .get("/api/v1/admin/unit/list/pid?pid=" + 0)
        .then(function(res) {
          console.log(res);
          if (res["data"].code == 0) {
             var data = res["data"]["data"];
            data =that.treeData(data, 'id', 'pid', 'children')            
            var arr=[]
            for(var key in data){
              arr.push(data[key])
            } 
            that.tableData3=arr
             
           var pid = that.tableData3[0]["pid"];
            that.pid = pid;
            that.countpage = Math.ceil(that.tableData3.length / that.pagesize);
          } else {
            that.$message(res["data"]["msg"]);
          }
        })
        .catch(function(err) {
          that.$message(err);
        });
    },
     // 分页·
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    findlistson(id, pid, name) {
      // 传当前数据的id=11 找到所有pid=11的儿子数据 如果做返回还要找到父亲自己身上的pid 返回上一级返回所有同等类型的pid
      var obj = {};
      obj["id"] = id;
      obj["name"] = name;
      this.returnName.push(obj);
      // 把当前returnname数组整合渲染到页面
      this.returnpids.push(pid);
      console.log(this.returnpids, id, this.returnName);
      var that = this;
      this.axios
        .get("/api/v1/admin/unit/list/pid?pid=" + id)
        .then(function(res) {
          var data = res["data"]["data"];
          var arr = [];
          for (var key in data) {
            console.log(data[key]);
            for (var key1 in data[key]["items"]) {
              arr.push(data[key]["items"][key1]);
            }
          }
          that.tableData3 = arr;
          console.log(arr);
          // 修改和增加需要传当前点击后传的数据id就是即将显示所有儿子数据的pid,
          that.pid = id;
          if (arr.length == 0) {
            that.$message("该类型没有子数据，可以添加");
          }
        });
    },
    // 返回
    return1() {
      var id = this.returnpids[this.returnpids.length - 1];
      this.returnpids.splice(this.returnpids.length - 1, 1);
      this.returnName.splice(this.returnName.length - 1, 1)
        if (id==0) {
            this.getList()
            return;
        }
      console.log(id, this.returnpids, this.returnName);
      var that = this;
      this.axios.get("/api/v1/admin/unit/list/pid?pid=" + id).then(function(res) {
        var data = res["data"]["data"];
         var arr=[]
           for(var key in data){
              for(var key1 in data[key]['items']){
                arr.push(data[key]['items'][key1])
              }
            } 
        that.tableData3 = arr;
        
        // 修改和增加需要传当前儿子数据的pid,
        that.pid = id;
        if (arr.length == 0) {
          alert("该类型没有子数据");
        }
      });
    },
    
    // 增加数据开始
    addnumber() {
      this.addflag = true;
    //  window.open('http://192.168.88.160:8081/#/system/setpramas')
    },
    //增加数据把填写的数据得到完成向后台提交数据
    complete() {
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
      var that = this;
      this.addflag = false;
      console.log(this.values, this.pid);
      this.axios
        .post("/api/v1/admin/unit/save", {
          //  pid: this.values.class_name,
          pid: this.pid,
          name: this.values.name
        })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            var data = res["data"]["data"];
            that.tableData3.push(data);
            alert("增加成功");
          } else {
            alert(res["data"]["msg"]);
          }
        });
    },
    //编辑后时提交数据
    queding(id, item) {
      var that = this
      // 点击确定提交数据到后台=>数据增加到tables，同时把addflag变为false和关闭打开的编辑框
      console.log(id, item);
      var id = item.id;
      var pid = item.pid;
      var name = item.name;
      console.log(id, pid, name);
      this.axios
        .post("/api/v1/admin/unit/save", {
          id: id,
          pid: pid,
          name: name
        })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that.$message("保存成功");
          } else {
           that.$message(res["data"]["msg"]);
          }
        });
      this.addflag = false;
      this.index1 = "";
    },
    //编辑时取消
    cancle(id) {
      this.addflag = false;
      this.index1 = "";
      console.log("zg");
    },
    // 点击编辑出现文本框
    setting(id) {
      console.log(id);
      this.index1 = id;
      this.dialogFormVisible = true;
    },
    // 点击删除单条数据
    del(id) {
        console.log(id)
        var that = this
         this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  点击确定开始删除
           this.axios.get("/api/v1/admin/unit/list/pid?pid=" + id).then(function(res) {
          var data = res["data"]["data"];   
          if (data.length!==0) {
             that.$message("该类型具有子数据，不能删除")
          }else{
            that.axios.post("/api/v1/admin/unit/delUnitGroup",{
              id:[id]
            }).then(function(res1){
              if (res1['data']['code']==0) {
                 that.$message("删除成功")
                 that.getList();
              }
            })
          }  
       })   
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

    
    },
    //点击删除选中的数据【在点击上一页下一页需要记录每页选择的数据，如果新数组没有且当页选择了就当进去，如果新数组有当页没选择就删除】
    handleDelAll() {
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
          if (item["id"] == newarr[i]) {
            newtable.push(item);
          }
        });
      }
      console.log(newtable);
    },
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
      if (event.target.checked) {
                this.isbtnActive=true;

        event.target.parentNode.parentNode.style.backgroundColor = "#F8F8FA";
      } else {
        event.target.parentNode.parentNode.style.backgroundColor = "";
      }
      allcheck.checked = flag;
    },
    // 导出excel表格功能---写成全局方法点击传参调用
    handleDownload() {
      let vm = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel.js");
        const tHeader = ["序号", "名称"];
        // 和数据字段一样
        const filterVal = ["id", "name"];
        // 点击导出找到checkbox选中的id数据，导出选中的就行
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
            if (item["id"] == newarr[i]) {
              newtable.push(item);
            }
          });
        }
        console.log(newtable);
        if (newtable.length == 0) {
          this.$message("请选择当前页数据导入");
          return;
        }
        const data = vm.formatJson(filterVal, newtable);
        export_json_to_excel(tHeader, data, "导出的列表excel");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 划过事件
    changecolor(index) {
      // console.log(index)
      this.isactive = index - 0 + 1;
    },
    //   setting(index){
    //        console.log(index)
    // },
    colorcancel() {
      this.isactive = "";
    }
  },
  components: {
    // 用来注册子组件的节点
    schoolcheck: schoolcheck,
    headson: headson,
  }
  
};
</script>

<style lang="scss" scoped>

.type {
  color: #169bd5;
  cursor: pointer;
}
.el-input__inner {
  height: 100px;
}
.icheck {
  position: relative;
  top: 5px;
}
.schoolcheck1 {
  width: 166px;
  display: inline-block;
  position: absolute;
  top: 4px;
  left: 0;
}
.icheck {
  height: 20px;
  width: 15px;
  cursor: pointer;
}
.posi {
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
.pagi {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: flex-end;
  margin-top: 20px;
}

.pages{
          // margin: 0 50px;

      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      // float: right;
      height: 100px;

    }
.main {
  
  .body {
    margin-top: 30px;
    overflow: hidden;
    .bread{
       width: 90%;
      margin: 0 auto;
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
    .datas {
      height: 640px;
      border: 1px solid #e6e6e8;
      // margin: 0 50px;
      margin-top: 30px;
      background-color: #ffffff;

      .tb_list {
        margin: 0 auto;
        width: 100%;
        thead {
          th {
            border-bottom: 1px solid #dfd7d7;
            text-align: center;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
          }
        }
        tbody {
          td {
            border-bottom: 1px solid #dfd7d7;
            text-align: center;
            height: 36px;
            line-height: 36px;
            position: relative;
            input[type="text"],
            select {
              display: inline-block;
              height: 28px;
              width: 166px;
            }
          }
        }
      }
    }
  }
  .add,
  .complete {
    width: 3rem;
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
}
.setrule {
  div {
    height: 50px;
    input {
      height: 30px;
      outline: none;
      border: none;
      border: 1px solid #a8a8a8;
    }
    .schoolcheck1 {
      position: relative;
      top: -4px;
      width: 160px;
    }
  }
}
.btnactive{
  background-color: #c6e2ff !important;
}
</style>