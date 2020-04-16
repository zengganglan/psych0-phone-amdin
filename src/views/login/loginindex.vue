<template>
  <div class="main">
    <div class="top">
      <span class='iconfont icon-angle-left' @click="golin"></span><span>心理咨询管理系统</span>
    </div>
    <template >
       <div class="body">
      <el-input placeholder="请输入用户名" v-model="username">
        <template slot="prepend">用户名</template>
      </el-input>
      <el-input placeholder="请输入密码" type="password" v-model="password">
        <template slot="prepend">密码</template>
      </el-input>
      <el-input placeholder="请输入验证码" v-model="yzm">
        <template slot="prepend">验证</template>
        <template slot="append">
          <span class="yPicture">
            <img :src="imgurl" alt ref="yzmimg" />
          </span>
          <span class="changeimg" @click="getyzm">换一张</span>
        </template>
      </el-input>
      <div>
      <input type="button" name="start" value="马上开始" @click="login" />
      </div>
      <div>
        <label class="f4">
          <input type="checkbox" name="rember" ref="rember" />记住密码&nbsp;&nbsp;&nbsp;
          <router-link tag="a" to="/register">注册</router-link>&nbsp;
          <!-- <router-link tag="a" to="/getUserPassword">忘记密码</router-link> -->
        </label>
      </div>
    </div>
    </template>
   
     
  </div>
</template>

<script>
import Cookies from "js-cookie";
import $ from "jquery";
import { type } from "os";
import md5 from "blueimp-md5";

export default {
  data() {
    return {
      username: "",
      password: "",
      yzm: "",
      key: "",
      // loginsucess: true,
      role: "",
      sf: "",
      imgurl: ""
    };
  },
  created() {
    // 如果保存过cookie,页面刷新会获取到上一次登录留下的用户名和密码选着记住才保存的cookie
    this.$store.commit("getToken");
    this.getinfo();
    // 页面刷新获取验证码
    this.getyzm();
    console.log(this.$store.state.userInfo);
    var role = this.$store.state.userInfo;
    if (typeof role == "string") {
      role = JSON.parse(role);
    }
    this.role = role;
    console.log(this.role);
  },
  methods: {
      golin(){
       this.$router.go(-1)
      },
    getinfo() {
      var username = Cookies.get("username");
      var password = Cookies.get("password");
      this.username = username;
      this.password = password;
    },
    getyzm() {
      var that = this;
      this.axios
        .get("/api/v1/verify", {})
        .then(function(res) {
          console.log(res);
          if (res.status == 200) {
            that.key = res["data"]["data"]["key"];
            that.imgurl = res["data"]["data"]["imgSrc"];
            console.log(that.key);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    login() {
      var that = this;
      //点击触发事件匹配输入框正则，在给后台提交获得的信息返回结果看是否登陆成功 登陆成功就设置cookie放到vuex里面
      if (!Cookies.get("password")) {
        this.password = md5(this.password);
      }
      let data = {
        account: this.username,
        pwd: this.password,
        code: this.yzm
      };
      console.log(data, this.key);
      if (!this.username || !this.password) {
        alert("请输入用户名或密码");
      } else {
        /*接口请求 ,返回结果应该有用户类型，和具体用户信息userid 是否可以登陆成功信息*/
        this.axios
          .post("/api/v1/admin/login", {
            account: this.username,
            pwd: this.password,
            code: this.yzm,
            key: this.key
          })
          .then(function(res) {
            // 如果为0 就是正常返回
            if (res["data"]["code"] == 0) {
              var token = res["data"]["data"]["token"];
              var role = res["data"]["data"]["role"];
              that.role = role;
              if (role["type"] == 1) {
                if (role["college_name"]) {
                  // 学校超管？注册时一定会选学校
                  that.role.ty = 1.1;
                } else {
                  //  总超管
                  that.role.sf = 1;
                }
              } else if (role["type"] == 2) {
                // 学校普通管理员
                that.role.sf = 2;
              }
              Cookies.set("userToken", token, 86400);
              Cookies.set("role", role, 86400);
              //  每一次登录把token放到vuex的数据管理库里面，设置后就可以取到token
              console.log(role);
              that.$store.commit("setToken", { token: token, role: role });
              that.$store.commit("getToken");
              //第一次登陆检查有没有选择记住密码，如果选择就把用户登陆信息和密码同时放到cookie里面或则放到本地存储
              var checked = that.$refs.rember.checked;
              if (checked) {
                Cookies.set("username", that.username);
                Cookies.set("password", that.password);
              }
              // 登录成功返回个人用户信息判断是学生还是管理员
              if (role["type"] == 1 || role["type"] == 2) {
                //只有管理员返回成功出现弹窗。可以点击进入系统/跳转相关页面
                that.$store.state.loginsucess = false;
                 that.$router.push({
                  path: "/login"
                });
              } else if (role["type"] == 3) {
                //如果是学生直接进入学生页面
                // that.$router.push({
                //   path: "/Evaluation/studentindex/studentschool"
                // });
                that.$message('学生用户请从pc端登录')
              }
            } else {
              // 登录不成功刷新验证码
              that.getyzm();
              // 不为0弹出错误信息
              alert(res["data"]["msg"]);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
}
.top {
      background-color: #e9eff3;

  text-align: center;
  position: relative;
  height: 50px;
  line-height: 50px;
  .icon-angle-left{
      position: absolute;
      left: 5px;
  }
}
.el-input-group__append{
    // padding: 0
    
    .changeimg{
        color: #9c9c9c;
    }
}
 input[name="start"] {
     margin:0 10px;
    margin-top: 20px;
    -webkit-appearance: none;
    width: 90%;
    height: 40px;
    font-size: 18px;
    border-radius: 5px;
    background: #7c8ce7;
    border: 0;
    color: #ffffff;
    font-family: "microsoft yahei";
    cursor: pointer;
  }
.yPicture {
  display: inline-block;
  height: 33px;
  vertical-align: middle;
  margin-right: 5px;
  width: 80px;
  
  img {
    width: 100%;
    height: 100%;
  }
}
.f4 {
  margin-top: 20px;
  display: inline-block;
  width: 100%;
  text-align: center;
      font-size: 12px;

  a {
    color: #9c9c9c;
    font-size: 12px;
  }
}
.loginform {
  width: 100%;
  width: 325px;
  height: 285px;
  top: 80px;
  position: absolute;
  right: 170px;
  top: 150px;
  background: #ffffff;
  color: #9c9c9c;
  width: 295px;
  //   padding: 10px 15px;
  border-radius: 5px;
  .type {
    display: inline-block;
    width: 100%;
    .selects {
      height: 30px;
      width: 215px;
      padding: 0 5px;
    }
  }
  .f1 {
    display: inline-block;
    width: 100%;
    margin-top: 20px;
    input[name="user"] {
      height: 30px;
      width: 200px;
      padding: 0 5px;
    }
  }
  .f2 {
    margin-top: 20px;
    display: inline-block;
    width: 100%;
    input[name="password"] {
      height: 30px;
      width: 200px;
      padding: 0 5px;
    }
  }
  .f3 {
    margin-top: 20px;
    display: inline-block;
    width: 100%;
    input[name="yzm"] {
      height: 30px;
      width: 60px;
      padding: 0 5px;
      font-size: 12px;
    }
    .yPicture {
      display: inline-block;
      height: 33px;
      vertical-align: bottom;
      margin-right: 5px;
      width: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span {
      cursor: pointer;
    }
  }
  .f4 {
    margin-top: 20px;
    display: inline-block;
    width: 100%;
    text-align: center;
    a {
      color: #9c9c9c;
      font-size: 12px;
    }
  }
  input[name="start"] {
    margin-top: 20px;
    -webkit-appearance: none;
    width: 100%;
    height: 40px;
    font-size: 18px;
    border-radius: 5px;
    background: #adadad;
    border: 0;
    color: #ffffff;
    font-family: "microsoft yahei";
    cursor: pointer;
  }
}
</style>