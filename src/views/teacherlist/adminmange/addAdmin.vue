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
        <div class="luru">管理员录入</div>
        <table class="a1">
          <tr class>
            <td>账号：</td>
            <td>
              <input placeholder="中英文，数字，下划线 4-20位" v-model="values.account">
              <span>*</span>
            </td>
          </tr>
          <tr class>
            <td>密码：</td>
            <td>
              <input type="password" placeholder="英文大小写，数字，符号 4-20位" v-model="values.password">
              <span>*</span>
            </td>
          </tr>
          <tr class>
            <td>工号：</td>
            <td>
              <input type="number" placeholder="工号" v-model="values.job_num">
              <span>*</span>
            </td>
          </tr>
          <tr class>
            <td>姓名：</td>
            <td>
              <input type="text" placeholder="请输入姓名" v-model="values.name">
            </td>
          </tr>
          <tr class>
            <td>性别：</td>
            <td>
              <input type="button" name="sex1" value="男" ref="sex1" @click="checkSex($event)">
              <input name="sex2" type="button" value="女" @click="checkSex($event)" ref="sex2">
            </td>
          </tr>
          <tr class>
            <td>出生日期：</td>
            <td>
              <el-date-picker
                v-model="values.birth_date"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1"
              ></el-date-picker>
            </td>
          </tr>
          <tr class>
            <td>身份证号：</td>
            <td>
              <input type="text" placeholder="18位身份证号" v-model="values.id_card">
              <span>*</span>
            </td>
          </tr>
          <tr class>
            <td>手机：</td>
            <td>
              <input type="text" placeholder="请输入手机号" v-model="values.phone">
              <span>*</span>
            </td>
          </tr>

          <tr class>
            <td>管理员类型：</td>
            <td>
              <select name id v-model="values.auth_group_id" >
                <option
                  :value="item['id']"
                  v-for="(item,index) in group"
                  :key="index"
                  selected="selected"
                >{{item['title']}}</option>
              </select>
              <span>*</span>
            </td>
          </tr>
            <tr class>
              <!-- 只有超管能看到 如果是超管可以点击选择学校 如果是普通就不可以选择 动态改变disbled-->
            <td>学校类别：</td>
            <td>
              <select name id v-model="values.auth_group_id" :disabled='true'>
                <option
                  :value="item['id']"
                  v-for="(item,index) in group"
                  :key="index"
                  selected="selected"
                >{{item['title']}}</option>
              </select>
              <span>*</span>
            </td>
          </tr>
          <tr class>
            <td>管理员范围：</td>
            <td>
              <div class="schoolcheck">
                <schoolcheck ref="schoolcheck"></schoolcheck>
                <span>*</span>
              </div>
              <span>*</span>
            </td>
          </tr>
          <tr class>
            <td></td>
            <td>
              <div :style="{ 'text-align': 'center','width':'200px','vertical-align':'center'}">带*必填</div>
              <input type="button" value="增加" class="add" @click="newAdmin">
              <input type="button" value="返回" class="return" @click="returnback">
            </td>
          </tr>
        </table>
      </li>
      <li class="data2" v-else-if="tabindex==2">
        <div class="luru">参数设置</div>
        <ul class="a2">
          <li>
            <span>班级：</span>
            <div class="schoolcheck">
              <schoolcheck ref="schoolcheck"></schoolcheck>
            </div>
          </li>

          <li>
            <span>类型：</span>
            <select name id v-model="groupId">
              <option
                :value="item['id']"
                v-for="(item,index) in group"
                :key="index"
                selected="selected"
              >{{item['title']}}</option>
            </select>
          </li>
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
                >

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
            <span class="iconfont icon-trash delfile" @click.stop="delfile"></span>
          </li>
        </ul>
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
import { global } from "../../../global/global";
import md5 from "blueimp-md5";

export default {
  data() {
    return {
      values: {
        account: "",
        password: "",
        job_num: "",
        name: "",
        sex: "",
        birth_date: "",
        id_card: "",
        phone: "",
        auth_group_id: "",
        unit_group: ""
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      //  管理员导入
      group: "",
      groupId: "",
      shows: false,
      filename: "选择文件",
      file: {
        uploadPercentage: 0,
        uploadStatus: ""
      },
      // 头部组件信息
      headson: ["管理员资料录入", "增加管理员个人资料"],

      // 切导航行栏
      tabls: ["手动添加", "从Excel导入"],
      tabindex: 1
    };
  },
  watch: {},

  created() {
    console.log(this.$refs.schoolcheck1);
    this.setGroup();
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList() {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
    },

    //导航栏切换
    tab(index) {
      console.log(index);
      this.tabindex = index - 0 + 1;
    },
    setGroup() {
      var that = this;
      this.axios
        .get("/api/v1/admin/user/roleGroup")
        .then(function(res) {
          let data = res["data"]["data"];
          console.log(data);
          that.group = data;
        })
        .catch(function(err) {
          alert(err);
        });
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
        console.log(name, this.$refs.myfile.value);
        this.filename = name;
        // 开始读取二进制文件
      } else {
        alert("文件为空或者文件格式不是excel.请重新选择文件");
      }
    },
    submit2() {
      this.shows = true;
      var that = this;
      // var param = localStorage.getItem("param");
      var file = that.$refs.myfile.files[0];
      console.log(file);
      let formData = new FormData();
      formData.append("file", file);
      //配置全局请求头的配置
      let config = {
        timeout: 5000,
        //添加请求头
        headers: {
          "Content-Type": "multipart/form-data"
        },
        //添加上传进度监听事件
        onUploadProgress: progressEvent => {
          if (progressEvent.lengthComputable) {
            //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
            //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
            var completeProgress =
              (progressEvent.loaded / progressEvent.total) * 100;
            console.log(completeProgress);
            that.file.uploadPercentage = completeProgress;
          }
        }
      };
      if (file) {
        // get 和post 格式不一样
        that.axios
          .post("/api/v1/admin/user/upload", formData, config)
          .then(function(res) {
            console.log(res);
            if (res["data"]["code"] == 0) {
              let file_name = res["data"]["data"]["file_name"];
              let suffix = res["data"]["data"]["suffix"];
              let classId = that.$refs.schoolcheck.item["id"];

              that.axios
                .post("/api/v1/admin/user/import", {
                  file_name: file_name,
                  suffix: suffix,
                  type: "2",
                  unit_group: classId,
                  auth_group_id: that.groupId
                })
                .then(function(res) {
                  if (res["data"]["code"] == 0) {
                    // that.$message("上传成功");
                      that
              .$confirm("管理员增加成功, 是否返回?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                that.$router.go(-1);
              })
              .catch(() => {
                that.$message({
                  type: "info",
                  message: "取消返回"
                });
              });
                    
                  } else {
                    that.$message(res["data"]["msg"]);
                  }
                });
            } else {
              that.$message(res["data"]["code"]);
            }
            // 如果上传成功可以激活预览按钮 可以点击预览。增加类名
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.filename = "选择文件";
        this.$refs.myfile.value = "";
        this.shows = false;
        that.$message("请选择文件才提交");
      }
    },
    // 上传成功返回标记值，根据标记值表示预览可用 调用接口返回解析的数据信息放在table栏
    delfile(id) {
      (this.filename = "选择文件"),
        (this.file.uploadPercentage = 0),
        (this.$refs.myfile.value = "");
      this.shows = false;
    },

    // 新增管理员
    newAdmin() {
      // 点击提交 获取表单框的值传给后台
      this.setGroup();
      var that = this;
      let classId = that.$refs.schoolcheck.item["id"];
      this.values.unit_group = classId;
      // 密码加密化
      this.values.password=md5(this.values.password)
      // md5密码格式化
      console.log(this.values);
      var newvalues = {};
      for (var key in this.values) {
        if (this.values[key]) {
          newvalues[key] = this.values[key];
        }
      }
      console.log(newvalues);      
      that.axios
        .post("/api/v1/admin/user/addRole", newvalues)
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            that
              .$confirm("管理员增加成功, 是否返回?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                that.$router.go(-1);
              })
              .catch(() => {
                that.$message({
                  type: "info",
                  message: "取消返回"
                });
              });
          } else {
            that.$message(res["data"]["msg"]);
          }
        });

      console.log(this.values);
    },
    // 返回上一级页面
    returnback() {
      this.$router.go(-1);
    },
    checkSex(event) {
      var sex = event.target.value;
      if (sex == "男") {
        this.values.sex = 0;
        console.log(this.values.sex, this.values.group);
      } else {
        this.values.sex = 1;
      }
      (this.$refs.sex1.style.backgroundColor = ""),
        (this.$refs.sex2.style.backgroundColor = ""),
        (event.target.style.backgroundColor = "#5bb95a");
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
  .icon-trash {
    position: absolute;

    top: 135px;
    right: -30px;
    background-color: green;
    color: white;
    display: inline-block;
    height: 20px;
    width: 20px;
    border-radius: 5px;
    cursor: pointer;
  }
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
  z-index: 2;
  width: 100%;
  height: 100%;
  // opacity: 0.7;
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
    height: 100px;
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
        width: 200px;
        line-height: 100px;
        width: 174px;
        margin: 0 70px;
        font-size: 20px;
      }
    }
  }
}
.data1 {
  margin-left: 10px;

  .a1 {
    width: 90%;
    height: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    // overflow: hidden;
    border: 1px solid #e6e6e8;
    tr {
      color: #169bd5;
      td:nth-child(1) {
        vertical-align: right;
        text-align: right;
      }
      td:nth-child(2) {
        position: relative;
        span {
          color: red;
        }

        input,
        select {
          height: 30px;
          width: 200px;
        }
        input[type="button"] {
          width: 100px;
          margin-right: 5px;
        }
        .schoolcheck {
          position: absolute;
          width: 200px;
          top: 0;
          height: 100%;
          z-index: 3;
          span {
            position: relative;
            left: 210px;
            top: -20px;
          }
        }
      }
    }
    tr:last-child {
      position: relative;
      top: 20px;
    }
  }
}
.data2 {
  margin-left: 10px;
  .a2 {
    width: 90%;
    height: 488px;
    margin: 0 auto;
    background-color: #ffffff;
    overflow: hidden;
    border: 1px solid #e6e6e8;
    li {
      span {
        margin-left: 40%;
      }
    }
    li:nth-child(1) {
      margin-top: 20px;

      position: relative;
      .schoolcheck {
        width: 170px;
        margin: 0 auto;
        display: inline-block;
        margin-left: 8px;
        position: absolute;
        top: -10px;
      }
    }
    li:nth-child(2) {
      position: relative;
      margin-top: 50px;

      select {
        width: 175px;
        height: 30px;
      }
    }
    li:nth-child(3) {
      margin-top: 40px;
      input {
        width: 150px;
        height: 20px;

        display: inline-block;
        margin-right: 20px;
        background-color: #b3b3b3;
        color: white;
      }

      .file {
        position: relative;
        width: 150px;
        height: 20px;
        background-color: #6999fd;
        color: white;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    li:nth-child(4) {
      text-align: center;
      width: 150px;
      margin: 0 auto;
      margin-top: 100px;
      margin-left: 43%;

      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #6999fd;
      border-radius: 5px;
      color: #fff;
      position: relative;
      left: 35px;
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

.add {
  background-color: #169bd5;
  cursor: pointer;
}
.return {
  cursor: pointer;
}
</style>



