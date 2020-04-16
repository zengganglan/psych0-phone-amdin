<template>
  <div class="main">
    <!-- 头部 -->
    <!-- <headson :headson="headson"></headson> -->
    <!-- tab栏目 -->
    <div class="tab">
      <ul>
        <li
          v-for="(item,index) in tabls"
          :class="{tabactive:tabindex-1==index}"
          :key="index"
          @click="tab(index)"
        >{{item}}</li>
      </ul>
    </div>
    <ul>
      <li class="data1" v-if="tabindex==1">
        <div class="luru">批量录入设置</div>
        <ul class="a1">
          <li>
            <span>范围：</span>
            <div class="schoolcheck">
              <schoolcheck ref="schoolcheck1"></schoolcheck>
            </div>
          </li>
          <li>
            <span>起始学号：</span>
            <input type="number" placeholder="请输入学号" v-model="startId" />
          </li>
          <li>
            <span>导入数量：</span>
            <input type="number" placeholder="请输入数量 不超过1000" v-model="number" />
          </li>
          <li>
            <span>初始密码：</span>
            <input
              type="button"
              value="与学号相同"
              ref="but"
              @click="pass"
              v-bind:class="{inputActive:isActive==1}"
            />
            <input
              type="button"
              value="手动填写"
              ref="but"
              @click="pass"
              v-bind:class="{inputActive:isActive==2}"
            />
            <template v-if="seeflag">
              <div class="eye">
                <input type="text" v-if="cansee" v-model="passworld" />
                <input type="password" v-else placeholder="请输入六位数字" v-model="passworld" />
                <span class="iconfont icon-eyes" @click="see"></span>
              </div>
            </template>
          </li>
          <li @click="newStudent">提交</li>
        </ul>
      </li>
      <li class="data2" v-else-if="tabindex==5">
        <div class="luru">参数设置</div>
        <ul class="a2">
          <li>
            <span>选择：</span>
            <div class="schoolcheck">
              <schoolcheck ref="schoolcheck"></schoolcheck>
            </div>
          </li>
          <!-- <li>
               <div class='schooltype'>
                <span>学校：</span>         
              <select name id v-model="values.auth_group_id">
                <option
                  :value="item['id']"
                  v-for="(item,index) in group"
                  :key="index"
                  selected="selected"
                >{{item['title']}}</option>
              </select>
            </div>
          </li>-->
          <li>
            <span>上传：</span>
            <!-- <input type="button" value="预览数据" class="hui" @click="preview(id)"> -->
            <a href="javascript:;" class="file">
              {{filename}}
              <form action method="post" enctype="multipart/form-data">
                <input
                  type="file"
                  name="myfile"
                  id="myfile"
                  ref="myfile"
                  class="upload"
                  @change="upload()"
                />
                <!-- <div
                  class="navbar"
                  v-else
                  :style="{width:file.uploadPercentage,backgroundColor:file.uploadStatus==1 ||file.uploadStatus==2? '':'green'}"
                >{{file.uploadPercentage}}</div>-->
                <div class="navbar" v-if="shows">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="file.uploadPercentage"
                  ></el-progress>
                </div>
              </form>
            </a>
          </li>
          <li class="submit2" @click="submit2">
            上传
            <span class="iconfont icon-trash" @click.stop="delfile"></span>
          </li>
        </ul>
      </li>
      <li class="data3" v-else>
        <ul class="working">
          <!-- <li class="handleDelAll" :class="{ btnactive: isbtnActive }">
            删除
            <span class="iconfont icon-trash"></span>
          </li>-->
          <li class="passes" :class="{ btnactive: isbtnActive }" @click="goaway">通过审核</li>
        </ul>

        <!-- 表格 -->
        <div class="datas">
          <!-- <tables :table="table"></tables> -->
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
                  />
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
                <td>
                  <input v-if="item.id==index1" type="text" v-model="item.job_num" />
                  <span v-else>{{item.job_num}}</span>
                </td>
                <td class="class">
                  <input v-if="item.id==index1" type="text" v-model="item.name" />
                  <!-- 点击跳转相关年纪的班级 -->
                  <!-- <router-link v-else :to="'/admin/grade.vue/' + item.sort" tag="a">{{item.name}}</router-link> -->
                  <a href="#" @click.prevent="baseinfo(item.id)">{{item.name}}</a>
                </td>

                <!-- <td>
                  <input v-if="item.id==index1" type="text" v-model="item.sex">
                  <span v-else>{{item.sex}}</span>
                </td>-->

                <td>
                  <div class="schoolcheck1" v-if="item.id==index1">
                    <schoolcheck ref="schoolcheck1" class="school"></schoolcheck>
                  </div>

                  <!-- <input v-if="item.sort==index1" type="text" v-model="item.name"> -->
                  <span v-else>{{item.unit_group}}</span>
                </td>
                <!-- <td>
                  <input v-if="item.id==index1" type="text" v-model="item.phone">
                  <span v-else>{{item.phone}}</span>
                </td>-->

                <!-- <td>
                
                  <span>
                    {{item.create_time
                    }}
                  </span>
                </td>-->

                <td>
                  <template v-if="item.id==index1">
                    <el-button size="mini" type="primary" @click.stop="queding()">确定</el-button>
                    <el-button size="mini" type="warning" @click.stop="cancle()">取消</el-button>
                  </template>

                  <template v-else>
                    <!-- <el-button size="mini" @click="setting(item.id)">编辑</el-button> -->
                    <!-- <el-button size="mini" type="danger" @click="del(item.id)">删除</el-button> -->
                  </template>
                </td>
              </tr>
              <template v-if="addflag">
                <tr>
                  <td align="center">
                    <input type="checkbox" name="available" value="0" class="icheck" />
                  </td>
                  <td class="sort">{{tableData3.length+1}}</td>
                  <td class="class">
                    <input type="text" v-model="values.value1" />
                  </td>
                  <td>
                    <input type="text" v-model="values.value2" />
                  </td>
                  <td>
                    <input type="text" v-model="values.value3" />
                  </td>
                  <td>
                    <input type="text" v-model="values.value4" />
                  </td>

                  <td>
                    <el-button size="mini" type="primary" @click.stop="queding()">确定</el-button>
                    <el-button size="mini" type="warning" @click.stop="cancle()">取消</el-button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>

          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>请问您确认要删除选中的审批吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="delitem">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10, 20, 30, 40,50,60]"
            :page-size="10"
            layout="sizes, prev, pager, next"
            :total="page.total"
          ></el-pagination>
        </div>
        <!-- <div >
      <div class="add" @click="addnumber()" v-if="!addflag">新增</div>
      <div class="complete" @click="complete()" v-else>完成</div>
        </div>-->
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import headson from "../../../components/headson";
import schoolcheck from "../../../components/schoolcheck";
import tables from "../../../components/table";
import pagination from "../../../components/pagination";
import md5 from "blueimp-md5";
export default {
  data() {
    return {
      isbtnActive: false,

      // 密码设置  创建学生，提交

      cansee: false,
      seeflag: false,
      passworld: "",

      startId: "",
      number: "",
      isActive: 1,
      //  文件
      shows: false,
      filename: "选择文件",
      file: {
        uploadPercentage: 0,
        uploadStatus: ""
      },
      // 头部组件信息
      headson: ["学生资料录入", "录入学生个人资料"],
      // 筛选
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label",
        treeflag: false
      },
      // 切导航行栏"从Excel导入",
      tabls: ["手动导入",  "审核自助注册"],
      tabindex: 1,
      // 页码
      page: {
        currentPage: 1,
        countpage: "",
        total: 0,
        size: "20"
      },
      // 高亮显示
      isactive: "",
      // 编辑
      index1: "",
      //增加数据
      flag: false,
      //增加数据
      addflag: false,
      values: {
        value1: "",
        value2: "",
        value3: "",
        value4: ""
      },
      // 普通用户审核注册
      delId: "",
      //页面初始化请求数据赋值
      dialogVisible: false,
      thead: ["学号", "姓名", "班级"],
      tableData3: []
    };
  },
  watch: {
    filterText(val) {
      // 只要val改变就掉用过滤函数--把数据传给后台，后台过滤重新拿数据
      this.$refs.tree2.filter(val);
      console.log(val);
    }
  },

  created() {
    this.getList(this.page.currentPage, this.page.size);
    console.log(this.$refs.schoolcheck1);
  },
  methods: {
    goaway() {
      var that =this
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
      this.axios
        .post("/api/v1/admin/user/audit", {
          id: newarr
        })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            alert("审核成功");
                that.getList(this.page.currentPage, this.page.size);

          } else {
            alert(res["data"]["msg"]);
          }
        });
    },
    // getList获取列表数据给tableData3赋值
    getList(currentPage, pagesize) {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      // 做分页我传当前页码和每页显示条数 就能返回我对应的数据
      var that = this;
      this.axios
        .post("/api/v1/admin/user/auditList", {
          page: currentPage,
          size: pagesize
        })
        .then(function(res) {
          console.log(res);
          that.page.total = res["data"]["data"]["total"];
          var group = res["data"]["data"]["unit_group"];
          console.log(group);
          var data = res["data"]["data"]["list"];
          that.tableData3 = data;
          //  根据返回班级id替换对应班级名
          var groups = that.NestedToFlat(group);
          data.map(function(item, index) {
            groups.map(function(item1, index1) {
              if (item.unit_group == item1.id) {
                console.log(item1.id);
                return (item.unit_group = item1.name);
              }
            });
            if (!item.name) {
              item.name = "null";
            }
            //  return 后面所有不执行 直接跳出循环
            if (item.sex == 0) {
              return (item.sex = "女");
            } else {
              return (item.sex = "男");
            }
          });

          console.log(data);
          //  that.page.total = Math.ceil(
          // res["data"]["data"]["total"]/ that.page.pagesize);
        });
    },
    // 把班级树形变为扁平结构
    NestedToFlat(group) {
      var res = [];
      var that = this;
      for (var key in group) {
        res.push({
          id: group[key].id,
          name: group[key].name,
          pid: group[key].pid
        });
        if (group[key]["items"].length !== 0) {
          res = res.concat(that.NestedToFlat(group[key]["items"]));
        }
      }
      return res;
    },

    // 分页·
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.size = val;
      this.getList(this.page.currentPage, this.page.size);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      console.log(this.page.size, this.page.currentPage);
      this.getList(this.page.currentPage, this.page.size);
    },
    //导航栏切换
    tab(index) {
      console.log(index);
      this.tabindex = index - 0 + 1;
    },

    //过滤操作
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //树形
    showtree() {
      this.defaultProps.treeflag = !this.defaultProps.treeflag;
    },
    // 上传文件
    upload() {
      var that = this;
      var filePath = event.target.value;
      if (filePath.indexOf("xlsx") != -1 || filePath.indexOf("xls") != -1) {
        // 读取文件
        var fileReader = new FileReader();
        var file = this.$refs.myfile.files[0];
        var name = file.name;
        this.filename = name;
        // this.file.uploadPercentage = 50 + "%";
        // 读取文件成功获取数据
        // fileReader.onload = function() {
        //   alert("读取文件成功,把二进制信息传到后台");
        //   // 读取文件成功传到后台 同时出现进度条
        //   var param = fileReader.result;
        //   window.localStorage.setItem("param", param);
        // };
      } else {
        alert("文件为空或者文件格式不是excel.请重新选择文件");
      }
    },
    submit2() {
      this.shows = true;
      var that = this;
      // var param = localStorage.getItem("param");
      var file = that.$refs.myfile.files[0];
      let formData = new FormData();
      formData.append("file", file);
      console.log(file);
      //配置全局请求头的配置
      let config = {
        timeout: 5000,
        //添加请求头
        headers: {
          "Content-Type": "multipart/form-data"
        },
        //添加上传进度监听事件
        onUploadProgress: progressEvent => {
          var completeProgress =
            (progressEvent.loaded / progressEvent.total) * 100;
          console.log(progressEvent);
          that.file.uploadPercentage = completeProgress;
        }
      };
      // get 和post 格式不一样 传参就覆盖不了全局
      if (file) {
        that.axios
          .post("/api/v1/admin/user/upload", formData, config)
          .then(function(res) {
            console.log(res, config, that.file);
            if (res["data"]["code"] == 0) {
              let file_name = res["data"]["data"]["file_name"];
              let suffix = res["data"]["data"]["suffix"];
              let classId = that.$refs.schoolcheck.item["id"];
              console.log(classId);
              that.axios
                .post("/api/v1/admin/user/import", {
                  file_name: file_name,
                  suffix: suffix,
                  unit_group: classId,
                  type: "3"
                })
                .then(function(response) {
                  console.log(response);
                  if (response["data"]["code"] == 0) {
                    alert("上传成功");
                  } else {
                    (that.filename = "选择文件"),
                      (that.file.uploadPercentage = 0),
                      (that.$refs.myfile.value = "");

                    that.shows = false;
                    alert(response["data"]["msg"]);
                  }
                });
            } else {
              (that.filename = "选择文件"),
                (that.file.uploadPercentage = 0),
                (that.$refs.myfile.value = "");

              that.shows = false;
              alert(res["data"]["msg"]);
            }
            that.file.uploadStatus = 2;
            // 如果上传成功可以激活预览按钮 可以点击预览。增加类名
          })
          .catch(function(error) {
            console.log(error);
            that.file.uploadStatus = -1;
          });
      } else {
        this.$refs.myfile.value = "";
        this.shows = false;
        that.$message("请选择文件才提交");
      }
    },
    // 删除文件
    delfile(id) {
      (this.filename = "选择文件"),
        (this.file.uploadPercentage = 0),
        (this.$refs.myfile.value = "");

      this.shows = false;
    }, // 密码框是否可见
    see() {
      this.cansee = !this.cansee;
      console.log(this.passworld);
    },
    //选择密码方式
    pass(e) {
      console.log(e.target);
      if (e.target.value == "与学号相同") {
        this.isActive = 1;
        this.seeflag = false;
      } else if (e.target.value == "手动填写") {
        this.isActive = 2;
        this.seeflag = true;
      }
    },
    // 审核自助注册页面开始刷新数据 ，如果没有审核提示信息
    examine() {},

    // 增加数据开始
    addnumber() {
      this.addflag = true;
      console.log(this.addflag);
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
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
    },
    // 点击删除单条数据
    del(id) {
      this.delId = id;
      this.dialogVisible = true;
    },
    // 删除1审核自助测
    delitem() {
      this.dialogVisible = false;
      console.log(this.delId);
    },
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
    },
    // 通过审核
    passes() {},
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
        event.target.parentNode.parentNode.style.backgroundColor = "#F8F8FA";
        this.isbtnActive = true;
      } else {
        event.target.parentNode.parentNode.style.backgroundColor = "";
      }
      allcheck.checked = flag;
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
    },
    // 批量创建新学生
    newStudent() {
      // 点击提交 获取表单框的值传给后台
      var that = this;
      var obj = {};
      var range = this.$refs.schoolcheck1.item["id"];
      if (this.number >= 1000) {
        this.number = 1000;
        console.log(this.number);
      }
      if (this.isActive == 1) {
        obj["unit_group"] = range;
        obj["job_num_start"] = this.startId;
        obj["add_count"] = this.number;
      } else {
        obj["unit_group"] = range;
        obj["job_num_start"] = this.startId;
        obj["add_count"] = this.number;
        obj["password"] = md5(this.passworld);
      }
      this.axios.post("/api/v1/admin/user/addStudent", obj).then(function(res) {
        console.log(res);
        if (res["data"]["code"] == 0) {
          that.$message("手动导入成功");
        } else {
          that.$message(res["data"]["msg"]);
        }
      });
    },
    baseinfo(id) {
      var that = this;
      var detail;
      that.tableData3.map((item, index) => {
        if (item.id == id) {
          detail = item;
        }
      });
      var obj = {
        学号: detail.job_num,
        姓名: detail.name,
        性别: detail.sex,
        班级: detail.unit_group,
        手机: detail.phone,
        注册时间: detail.create_time
      };
      that.$router.push({
        name: "详情数据",
        path: "/admin/setdatadetail",
        params: { detail: obj }
      });
    }
  },
  components: {
    headson: headson,
    schoolcheck: schoolcheck,
    tables: tables,
    pagination: pagination
  }
};
</script>

<style lang="scss" scoped>
// 文件上传
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  // overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
form {
  width: 100%;
  height: 100%;
}
.file input {
  position: absolute;
  font-size: 100px;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.navbar {
  position: absolute;
  font-size: 100px;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.7;
}

.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}

.hui {
  background-color: gray;
}
.blu {
  background-color: #169bd5;
}
.tabactive {
  color: #6998fb;
  border-bottom: 10px solid #6998fb;
}
input[type="checkbox"] {
  height: 16px;
  width: 16px;
  background-color: #f8f8fa;
  outline: none;
  border: 1px solid transparent;
  border: 2px solid #e2e2e2;
}
.luru {
  border-left: 8px solid #679afa;
  margin-top: 10px;
  color: #679afa;
  padding-left: 10px;
  font-size: 20px;
  margin-top: 40px;
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
}
.data1 {
  // margin-left: 10px;

  .a1 {
    height: 488px;

    margin: 0 auto;
    background-color: #ffffff;
    overflow: hidden;
    border: 1px solid #e6e6e8;

    li {
      //   display: flex;
      // justify-content: center;
      // width: 800px;
      margin-top: 30px;

      input,
      select {
        width: 2.26rem;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
      }
    }
    li:nth-child(1) {
      position: relative;

      .schoolcheck {
        position: absolute;
        top: 0px;
        left: 85px;
        width: 2.26rem;
      }
    }
    li:nth-child(4) {
      display: flex;
      input {
        width: 100px;
        margin-right: 10px;
        height: 32px;
        color: white;
        background-color: #b3b3b3;
        // border: none;
        // background-color: blue;
      }
      // 初始密码
      .inputActive {
        background-color: #6999fd;
      }
      .eye {
        width: 200px;
        height: 32px;
        position: relative;
        input {
          width: 200px;
          position: absolute;
          top: 0;
          background-color: #ffffff;
          color: black;
        }
        .icon-eyes {
          position: absolute;
          z-index: 5;
          top: 10;
          right: 5px;
          width: 20px;
          height: 100%;
          cursor: pointer;
          line-height: 32px;
        }
      }
    }
    li:nth-child(5) {
      width: 206px;
      height: 36px;
      margin-left: 0;
      margin: 0 auto;
      text-align: center;
      line-height: 36px;
      background-color: #6999fd;
      margin-top: 50px;
      color: white;
      font-size: 20px;
    }
  }
}
.data2 {
  .a2 {
    height: 488px;
    margin: 0 auto;
    background-color: #ffffff;
    overflow: hidden;
    border: 1px solid #e6e6e8;
    li {
    }
    li:nth-child(1) {
      position: relative;
      margin-top: 100px;
      .schoolcheck {
        width: 2.26rem;
        height: 30px;
        display: inline-block;
        position: absolute;
      }
    }
    // li:nth-child(2){
    //         position: relative;

    //   margin-top: 20px;
    //    .schooltype {

    //     select{
    //        width: 2.26rem;
    //     height: 30px;
    //     margin-right: 20px;
    //     display: inline-block;
    //             border: 1px solid #DCDFE6;

    //     // position: absolute;
    //     }
    //   }
    // }
    li:nth-child(2) {
      margin-top: 40px;
      input {
        width: 150px;
        display: inline-block;
        margin-right: 20px;
        background-color: #b3b3b3;
        color: white;
      }

      .file {
        position: relative;
        width: 120px;
        height: 20px;
        background-color: #6999fd;
        color: white;
        text-align: center;
      }
    }
    li:nth-child(3) {
      text-align: center;
      width: 150px;
      margin: 0 auto;
      margin-top: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #6999fd;
      position: relative;
      border-radius: 5px;
      color: #fff;
      .icon-trash {
        cursor: pointer;
        top: 5px;
        right: -40px;
        background-color: green;
        color: white;
        position: absolute;
        display: inline-block;
        height: 20px;
        width: 20px;
        line-height: 20px;
        border-radius: 5px;
        overflow: hidden;
      }
    }
  }
}
.data3 {
  .working {
    padding-top: 10px;
    height: 50px;
    width: 90%;
    margin-top: 30px;
    li {
      height: 30px;
      width: 100px;
      text-align: center;
      float: right;
      margin-left: 20px;
      background-color: #fff;
      color: #b1b1b1;
      border: 1px solid #e1e1e3;
      border-radius: 10px;
      line-height: 30px;
      cursor: pointer;

      span {
        font-size: 20px;
      }
    }
  }

  .datas {
    margin: 0 auto;
    // height: 640px;
    border: 1px solid #e6e6e8;
    background-color: #ffffff;
    .tb_list {
      width: 100%;
      border: 1px solid #e6e6e8;
      margin: 0 auto;
      // margin-top: 30px;
      background-color: #ffffff;
      border-top: 1px solid #dfd7d7;
      thead {
        th {
          border-bottom: 1px solid #dfd7d7;
          text-align: center;
          height: 30px;
          line-height: 30px;
        }
      }
      tbody {
        a {
          color: #1e88c7;
        }
        td {
          border-bottom: 1px solid #dfd7d7;
          text-align: center;
          height: 36px;
          line-height: 36px;
          position: relative;
          input,
          select {
            height: 32px;
          }
          .schoolcheck1 {
            height: 100%;
            width: 166px;
            position: relative;
            display: flex;
            justify-content: center;
            align-content: center;

            .school {
              width: 100%;
              position: absolute;
              top: 3px;
            }
          }
        }
      }
    }
  }
  .pages {
    margin: 0 50px;

    margin-top: 10px;
    display: flex;
    float: right;
    height: 100px;
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



