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
        <div class="luru">修改管理员资料</div>
        <table class="a1">
          <tr>
            <td>ID：</td>
            <td>
              <span>{{detail.id}}</span>
            </td>
          </tr>
          <tr>
            <td>账号：</td>
            <td>
              <span>{{detail.account}}</span>
            </td>
          </tr>

          <tr class>
            <td>密码：</td>
            <td>
              <template>
                <input type="password" placeholder="英文大小写，数字，符号 4-20位" v-model="values.password" />
                <span>*</span>
              </template>
            </td>
          </tr>
          <tr class>
            <td>工号：</td>
            <td>
              <template>
                <input type="text" placeholder="学号" v-model="detail.job_num" />
                <span>*</span>
              </template>
            </td>
          </tr>
          <tr class>
            <td>姓名：</td>
            <td>
              <input type="text" placeholder="请输入姓名" v-model="detail.name" />
            </td>
          </tr>
          <tr class>
            <td>性别：</td>
            <td>
              <template>
                <input
                  type="button"
                  name="sex1"
                  value="男"
                  ref="sex1"
                  @click="checkSex($event)"
                  :style="{'backgroundColor':values.sex==1? '#5bb95a':''}"
                />
                <input
                  name="sex2"
                  type="button"
                  value="女"
                  @click="checkSex($event)"
                  ref="sex2"
                  :style="{'backgroundColor':values.sex==0? '#5bb95a':''}"
                />
                <span>*</span>
              </template>
            </td>
          </tr>
          <tr class>
            <td>出生日期：</td>
            <td>
              <template>
                <el-date-picker
                  v-model="detail.birth_date"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1"
                ></el-date-picker>
              </template>
            </td>
          </tr>
          <tr class>
            <td>身份证号：</td>
            <td>
              <input type="text" placeholder="18位身份证号" v-model="detail.id_card" />
            </td>
          </tr>
          <tr class>
            <td>手机：</td>
            <td>
              <input type="text" placeholder="请输入手机号" v-model="detail.phone" />
            </td>
          </tr>

          <tr class>
            <td>管理范围：</td>
            <td>
              <template>
                <div class="schoolcheck">
                  <schoolcheck ref="schoolcheck" :inputName="gradename"></schoolcheck>
                  <span>*</span>
                </div>
              </template>
            </td>
          </tr>
          <tr class="rolegroup">
            <td>角色类型：</td>
            <td>
              <template>
                <el-select v-model="detail.auth_group_id" placeholder="请选择">
                  <el-option
                    v-for="item in $store.state.adminGroup"
                    :key="item.id"
                    :label="item['title']"
                    :value="item.id"
                  ></el-option>
                </el-select>

                <!-- <input type="text" placeholder="请输入学院" v-model="values.phone" > -->
                <span>*</span>
              </template>
            </td>
          </tr>
          <tr class>
            <td>名族：</td>
            <td>
              <input type="text" placeholder="请输入名族" v-model="detail.nation" />
            </td>
          </tr>

          <tr class>
            <td></td>
            <td>
              <template>
                <div>
                  <div
                    :style="{ 'text-align': 'center','width':'200px','vertical-align':'center'}"
                  >带*必填</div>

                  <input type="button" value="保存" class="add" @click="setadmin" />

                  <input type="button" value="返回" class="return" @click="returnback" />
                </div>
              </template>
            </td>
          </tr>
        </table>
      </li>
      <!-- <li class="data2" v-else-if="tabindex==2">
        <div class="luru">参数设置</div>
      </li>-->
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
import { VueCropper } from "vue-cropper";

export default {
  data() {
    return {
      save: true,
      id: this.$route.query.id,
      detail: "",
      status: "",
      cropper: false,
      newimgsrc: "",
      visible1: false,
      visible2: false,
      values: {
        password: "",
        job_num: "",
        name: "",
        sex: "",
        birth_day: "",
        id_card: "",
        phone: "",
        except: "",
        unit_group: "",
        nation: ""
      },
      gradename: "",

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

      // 头部组件信息
      headson: ["管理员资料修改", "修改管理员资料"],

      // 切导航行栏
      tabls: ["基本信息"],
      tabindex: 1
    };
  },
  watch: {},

  created() {
    console.log(this.id);
    console.log(this.$refs.schoolcheck1);
    this.baseinfo(this.id);
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList() {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
    },

    //导航栏切换
    tab(index) {
      this.tabindex = index - 0 + 1;
    },
    baseinfo(id) {
      this.dialogFormVisible = true;
      console.log(id);
      var that = this;
      that.axios
        .post("/api/v1/admin/user/detail", { uid: id })
        .then(function(res) {
          console.log(res);
          var detail = res["data"]["data"]["detail_data"];
          var group = res["data"]["data"]["unit_group_data"];
          var arr = [];
          for (var key in group) {
            arr.push(group[key]);
          }
          group = global.NestedToFlat(arr);
          console.log(group);
          // 班级
          group.map(function(item, index) {
            if (item.id == detail.unit_group) {
              that.gradename = item.name;

              return;
              that.gradename = item.name;
            }
          });

          // 男女
          if (detail.sex == 0) {
            that.values.sex = 0;
          } else {
            that.values.sex = 1;
          }
          console.log(detail);
          that.detail = detail;
        });
    },
    setadmin() {
      this.values.password;
      this.values.job_num = this.detail.job_num;
      this.values.name = this.detail.name;
      this.values.sex;
      this.values.birth_day = this.detail.birth_date;
      this.values.id_card = this.detail.id_card;
      this.values.phone = this.detail.phone;
      this.values.except = this.detail.auth_group_id;
      this.values.nation = this.detail.nation;
      this.values.unit_group = this.detail.unit_group;
      if (this.$refs.schoolcheck.item) {
        this.values.unit_group = this.$refs.schoolcheck.item.id;
      }
      var that = this;
      console.log(this.values);
      if (
        !this.values.password ||
        !this.values.job_num ||
        !this.values.unit_group
      ) {
        that.$message("密码或者工号或者班级一定不为空值");
        return;
      }
      that.axios
        .post("/api/v1/admin/user/editUser?id=" + that.id, that.values)
        .then(function(res) {
          console.log(res);
        });
    },

    // 返回上一级页面
    returnback() {
      this.$router.go(-1);
    },
    checkSex(event) {
      var sex = event.target.value;
      if (sex == "男") {
        this.values.sex = 1;
        console.log(this.values.sex, this.values.group);
      } else {
        this.values.sex = 0;
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
    pagination: pagination,
    VueCropper: VueCropper
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
  position: relative;

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
        width: 30%;
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
  .a2 {
    position: absolute;
    top: 100px;
    right: 300px;
    .xs {
      color: #169bd5;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .headimg {
      height: 100px;
      width: 300px;
      ul {
        width: 65%;
        display: flex;
        justify-content: space-between;
        li:nth-child(1) {
          position: relative;

          input[type="file"] {
            opacity: 0;
            width: 100px;
            height: 30px;
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;
            z-index: 3;
          }
          .choose {
            display: inline-block;
            background-color: #a4c2ff;
            width: 70px;
            height: 30px;
            position: absolute;
            left: 0;
            top: 0;
            margin-left: 20px;
            margin-top: 15px;
            line-height: 30px;
            text-align: center;
            border-radius: 20px;
          }
        }
        li:nth-child(2) {
          position: relative;
          .cutimg {
            background-color: #a4c2ff;
            width: 70px;
            height: 30px;
            margin-top: 15px;
            line-height: 30px;
            text-align: center;
            border-radius: 20px;
          }
        }
      }
      .newimg {
        font-size: 12px;
        position: absolute;
        top: 60px;
        right: -20px;
        min-width: 100px;
        min-height: 100px;
        border: 1px solid #a4c2ff;
        img {
          width: 100px;
          height: 100px;
        }
      }
    }
    .personone {
      margin-top: 20px;
      height: 200px;
      border: 1px solid #169bd5;
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

.add,
.bianji {
  background-color: #169bd5;
}
.return {
  cursor: pointer;
}
.add {
  cursor: pointer;
}
</style>



