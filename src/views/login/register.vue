<template>
  <div class="back">
    <div class="head"><span class='iconfont icon-angle-left' @click="golin" style="float:left;margin-top:5px"></span><i>注册账号</i></div>
    <div class="register">
      <div class="box">
        <!-- <ul class="head">
          <li
            v-for="(item, index1) in items"
            v-bind:key="index1"
            @click="show(index1+1)"
            ref="el"
          >{{item.message}}</li>
        </ul>-->
        <!-- <div class="heads">注册账号</div> -->
        <ul class="body">
          <template>
            <li>
              <div class="Regis">
                <span class="names">账号：</span>
                <input type="text" placeholder="请输入账号" v-model="values.person" />
                <i>*</i>
              </div>
              <div class="Regis">
                <span class="names">密码：</span>
                <input
                  type="password"
                  id="mm-pwd"
                  ref="mmpwd"
                  placeholder="设置密码"
                  name="password"
                  v-on:keyup="check()"
                  v-model="values.password"
                />
                <i>*</i>
                <br />
                <span id="mm-pd" ref="mmpd" style="color: red; font-size: 12px; line-height: 30px;"></span>
                <div class="mm-btm">
                  <div id="lv1" ref="lv1">弱</div>
                  <div id="lv2" ref="lv2">中</div>
                  <div id="lv3" ref="lv3">强</div>
                </div>

                <div class="Regis">
                                  <span class="names">确认密码：</span>

                  <input
                    type="password"
                    placeholder="确认密码"
                    name="againpass"
                    ref="againpass"
                    v-model="values.againpass"
                  />
                  <i>*</i>
                </div>
              </div>
              <div class="Regis">
                                                  <span class="names">学号：</span>

                <input type="text" placeholder="请输入学号" name="ID" ref="ID" v-model="values.ID" />
                <i>*</i>
              </div>
              <div class="Regis">
                  <span class="names">姓名：</span>
                <!-- <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓名：</span> -->
                <input type="text" placeholder="请输入姓名" name="name" ref="name" v-model="values.name" />
                <i>*</i>
              </div>
              <div class="Regis">
                                  <span class="names">出生日期：</span>

                <el-date-picker
                  v-model="values.time"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1"
                ></el-date-picker>
              </div>
              <div class="Regis">
                   <span class="names">性别：</span>
                <!-- <input type="text" placeholder="请输入姓名" name="name" ref="name"  v-model="values.name"> -->
                <input type="button" value="男" name="sex1" @click="checkSex($event)" ref="sex1" />
                <input type="button" value="女" name="sex2" @click="checkSex($event)" ref="sex2" />
              </div>
              <div class="Regis">
                                   <span class="names">民族：</span>

                <input
                  type="text"
                  placeholder="请输入名族"
                  name="name"
                  ref="name"
                  v-model="values.family"
                />
              </div>
              <div class="Regis">
                                                   <span class="names">手机：</span>

                <input
                  type="text"
                  placeholder="请输入手机"
                  name="phone"
                  ref="phone"
                  v-model="values.phone"
                />
              </div>
              <!-- <div class="Regis">
                <span>短信验证：</span>
                <input type="text" placeholder="短信验证" name="yzm" ref="yzm" v-model="values.yzm">
                <input type="button" value="获取验证码" name="getyzm" ref="getyzm" @click="getphone">
              </div>-->
              <div class="Regis">
                                                                   <span class="names">身份证：</span>

                <input
                  type="text"
                  placeholder="请输入身份证"
                  name="pass"
                  ref="pass"
                  v-model="values.pass"
                />
              </div>
              <div class="Regis">
                                                                   <span class="names">班级：</span>

                <div class="schoolcheck">
                  <schoolcheck ref="schoolcheck"></schoolcheck>
                  <i>*</i>
                </div>
              </div>
              <div class="Regis">
                                                                   <span class="names">所属学校：</span>

               
                <el-select v-model="values.college_id" style="width:202px;">
                  <el-option
                    v-for="(item,index) in select"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <i>*</i>
              </div>
              <!-- <input type="checkbox" name="check" id="check" ref="check" />
              <a href="#">《《用户服务协议》》</a> -->
              <br />

              <em>注：带*为必填项</em>
              <br />
              <input type="button" value="提交" name="btn" @click="register" />
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import schoolcheck from "../../components/schoolcheck";
import md5 from "blueimp-md5";

export default {
  // 密码强度正则匹配，匹配后改变颜色
  data() {
    return {
      items: [{ message: "用手机注册" }, { message: "用邮箱注册" }],
      index: 1,
      select: "",
      values: {
        person: "",
        password: "",
        againpass: "",
        ID: "",
        name: "",
        time: "",
        sex: "",
        family: "",
        pass: "",
        class: "",
        phone: "",
        college_id: ""
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
      }
    };
  },
  created() {
    this.values.time = new Date();
    this.getList();
  },
  methods: {
    golin(){
  this.$router.go(-1)
    },
    getList() {
      //  学校范围
      var that = this;
      this.axios.get("/api/v1/admin/tool/select/college").then(res => {
        if (res["data"]["code"] == 0) {
          that.select = res["data"]["data"];
        }
      });
    },
    show(index) {
      this.index = index;
      if (index == 1) {
        this.$refs.el[1].style.cssText =
          "border-bottom:2px solid #E6E6E6;border-top:2px solid #E6E6E6;";
        this.$refs.el[0].style.cssText =
          "border-bottom:none;border-top:3px solid #2E7DBF;";
      } else {
        this.$refs.el[0].style.cssText =
          "border-bottom:2px solid #E6E6E6;border-top:2px solid #E6E6E6;";
        this.$refs.el[1].style.cssText =
          "border-bottom:none;border-top:3px solid #2E7DBF;";
      }
    },
    // 获取手机验证码
    getphone() {
      // 发送请求
      this.axios.get("////").then(function() {
        console.log(1);
      });
      var el = this.$refs.getyzm;
      // 禁用后不可以对他操作
      el.setAttribute("disabled", "disabled");
      console.log(111);
      setTimeout(function() {
        el.style.opacity = "0.7";
      }, 1000);
      var time = 60;
      var set = setInterval(function() {
        el.value = +--time + "秒后获取";
        if (time == 0) {
          console.log(time);
          el.setAttribute("disabled", false);
          clearInterval(set);
          el.value = "重新获取验证码";
        }
      }, 1000);
    },
    checkSex(event) {
      var sex = event.target.value;
      if (sex == "男") {
        this.values.sex = 0;
      } else {
        this.values.sex = 1;
      }

      (this.$refs.sex1.style.backgroundColor = ""),
        (this.$refs.sex2.style.backgroundColor = ""),
        (event.target.style.backgroundColor = "#5bb95a");
    },
    // 注册
    register() {
      let classId = this.$refs.schoolcheck.item["id"];
      this.values.class = classId;

      //   注册前先判断必填项是否填了 协议是否勾选 密码两次输入是否相同
      var checked = this.$refs.check.checked;

      if (
        !this.values.person ||
        !this.values.password ||
        !this.values.againpass ||
        !this.values.name ||
        !this.values.class ||
        !this.values.college_id
      ) {
        this.$message("带*的输入框必须要填");
        return;
      }
      if (!checked) {
        this.$message("请勾选用户服务协议");
        return;
      }
      if (this.values.password !== this.values.againpass) {
        this.$message("两次输入密码不相同");
        return;
      }
      var newvalues = {};
      var values = {
        account: this.values.person,
        password: md5(this.values.password),
        password_confirm: md5(this.values.againpass),
        job_num: this.values.ID,
        name: this.values.name,
        unit_group: this.values.class,
        sex: this.values.sex,
        birth_date: this.values.time,
        nation: this.values.family,
        phone: this.values.phone,
        id_card: this.values.pass,
        college_id: this.values.college_id
      };
      for (var key in values) {
        if (values[key]) {
          newvalues[key] = values[key];
        }
      }
      console.log(newvalues);

      // 把数据给后台 开始请求数据
      this.axios.post("/api/v1/user/register", newvalues).then(function(res) {
        console.log(res);
        if (res["data"]["code"] == 0) {
          alert("注册成功");
        } else {
          alert(res["data"]["msg"]);
        }
      });
    },

    check() {
      var a = this.$refs.mmpwd.value;
      var mmpd = this.$refs.mmpd;
      var lv1 = this.$refs.lv1;
      var lv2 = this.$refs.lv2;
      var lv3 = this.$refs.lv3;
      if (a.length == 0) {
        mmpd.innerHTML = "密码由数字,字母或下划线组成";
      } else if (a.length < 4) {
        mmpd.innerHTML = "密码长度不能小于4个字符!";
        lv1.style.borderTopColor = "";
        lv2.style.borderTopColor = "";
        lv3.style.borderTopColor = "";
      } else if (a.length >= 4 && a.length <= 20) {
        mmpd.innerHTML = "";
        var reg = /^[0-9]{4,20}$|^[a-zA-Z]{4,20}$/; //全是数字或全是字母 6-16个字符
        var reg1 = /^[A-Za-z0-9]{4,20}$/; //数字、26个英文字母 6-16个字符
        var reg2 = /^\w{4,20}$/; // 由数字、26个英文字母或者下划线组成的字符串 6-16个字符
        if (a.match(reg)) {
          console.log(1);
          lv1.style.borderTopColor = "red";
          lv2.style.borderTopColor = "";
          lv3.style.borderTopColor = "";
        } else if (a.match(reg1)) {
          //   document.getElementById("lv1").style.borderTopColor="red";
          lv1.style.borderTopColor = "";
          lv2.style.borderTopColor = "";
          lv3.style.borderTopColor = "yellow";
        } else if (a.match(reg2)) {
          lv1.style.borderTopColor = "";
          lv2.style.borderTopColor = "";
          lv3.style.borderTopColor = "green";
        }
      } else if (a.length > 20) {
        mmpd.innerHTML = "密码长度不能大于20个字符!";
        lv1.style.borderTopColor = "gainsboro";
        lv2.style.borderTopColor = "gainsboro";
        lv3.style.borderTopColor = "gainsboro";
      }
    }
  },
  components: {
    schoolcheck: schoolcheck
  }
};
</script>

<style lang="scss" scoped>
.back {
  height: 1100px;
  width: 100%;
  background-color: #d4d8d7;
  position: relative;
  .head{
    height: 30px;
    text-align: center;
     i{
       color: #a5a8a7 !important;
     }
  }
}
.Regis {
  margin-top: 20px;
  position: relative;
  width: 320px;
  .names{
    display: inline-block;
    width: 70px;
    font-size: 12px;
    text-align: right;
  }
}
.register {
  z-index: 2;
  width: 100%;
  height: 900px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid #e6e6e6;
  // margin-top: 30px;
  background-color: #eaeceb;
  .box {
    margin: 0 auto;
    margin-top: 38px;
    width: 320px;
    // height: 378px;
    // background-color: #CDCDCB;
    color: #a5a8a7;
    .heads {
      height: 33px;
      text-align: center;
      font-size: 20px;
      li {
        width: 48.77%;
        float: left;
        text-align: center;
        line-height: 20px;
      }
      li:nth-child(1) {
        border-top: 3px solid #2e7dbf;
        border-left: 2px solid #dddddd;
        border-right: 2px solid #dddddd;
      }
      li:nth-child(2) {
        transform: translateX(-2px);
        border: 2px solid #dddddd;
      }
    }
    .body {
      position: relative;
      li {
        top: 0;
        position: absolute;
        height: 100%;
        // input[name="phone"],
        // input[name="againpass"],
        // input[name="password"],

        input,
        select {
          width: 200px;
          height: 32px;
          border: 2px solid #e6e6e6;
        }
        select {
          height: 35px;
        }
        input[name="sex1"],
        input[name="sex2"] {
          width: 100px;
        }
        .el-input__inner {
          padding-right: 0;
        }
        input[name="yzm"] {
          height: 25px;
          width: 110px;
          position: relative;
          top: -2px;
          border: 2px solid #e6e6e6;
        }
        input[name="getyzm"] {
          border: 2px solid #e6e6e6;
          background-color: #ffffff;
          height: 25px;
          margin-bottom: 10px;
          border: none;
          width: 80px;
        }
        input[type="checkbox"] {
          height: 20px;
          width: 20px;
          margin-left: 80px;
          margin-top: 10px;
        }
        input[name="btn"] {
          margin-top: 20px;
          margin-left: 80px;
          height: 30px;
          width: 200px;
          background-color: #009fe7;
          border: none;
          color: white;
        }
        a {
          color: #009fe7;
          position: relative;
          top: -5px;
        }
      }
    }
  }
}
.Regis {
  position: relative;

  .schoolcheck {
    position: absolute;
    width: 200px;
    top: -10px;
    left: 75px;
    height: 100%;
    z-index: 3;
    i {
      position: absolute;
      right: -12px;
      top: 5px;
    }
  }
}
.bottom {
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  background: url("../../assets/images/未标题-1_0001_图层-3.png") center
    no-repeat;
  background-size: contain;
}
.mm-btm {
  height: 30px;
  width: 140px;
  position: relative;
  margin-left: 100px;
}
#mm-pd {
  margin-left: 100px;
}
#lv1,
#lv2,
#lv3 {
  height: 30px;
  width: 40px;
  border-top: 6px solid #cdcdcb;
  margin-left: 3px;
  float: left;
  font-size: 14px;
  text-align: center;
  line-height: 25px;
}
i {
  color: red;
  font-size: 20px;
}
em {
  margin-left: 80px;
  color: black;
  font-size: 14px;
}
</style>