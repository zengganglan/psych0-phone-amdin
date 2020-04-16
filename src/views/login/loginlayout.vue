<template>
  <div class="login">
    <!-- 头部 -->
    <div class="head">
      <div class="top1">
        <ul>
          <li ref="soli1" @click.stop="first" @mouseover.stop="first">首页</li>
          <li
            class="soli"
            ref="soli"
            v-for="(item,index) in  $store.state.columns"
            :key="index"
            v-if="index<5"
            @click.stop="cli($event,index)"
            @mouseover.stop="cli($event)"
          >{{item.name}}</li>
          <li ref="soli2" @click.self="first" @mouseover.self="first">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-plus"
                  v-for="(item,index) in  $store.state.columns"
                  :key="index"
                  v-if="index>=5"
                  :command="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>
    <transition name="fade" mode="out-in">
            <router-view>1</router-view>
     </transition>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import $ from "jquery";
$(function() {
  
});

export default {
  data() {
    //拿到值检测是否合法返回数值供组件调用
    return {
      username: "",
      password: "",
      yzm: "",
      key: "",
      // loginsucess: true,
      role: "",
      imgurl: ""
    };
  },
  created() {
    // 如果保存过cookie,页面刷新会获取到上一次登录留下的用户名和密码选着记住才保存的cookie
    this.$store.commit("getToken");
    this.getinfo();
    // 页面刷新获取验证码
    this.getyzm();
       console.log(this.index,this.$refs.soli)

  },
  mounted() {
    console.log(this.loginsucess);
     this.$refs.soli1.style.cssText =
        "position: relative;bottom: 0px; background-color: #aeaeae;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
  },
  methods: {
    getlist(currentPage, pagesize) {
      var that = this;
      this.axios
        .post("/api/v1/admin/article/column/list", {
          page: currentPage,
          size: pagesize
        })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            //  2 20  (a-1)*20+1----
          } else {
          }
        });
    },
    //点击登陆拿到数据判断用户对象，根据用户对象跳转学生页面还是老师页面，陈用户信息存到store里面以便其他的组件需要
    //点第一次登陆保存cookie.可以做登陆拦截，不管又没么有点击记住密码cookie都会有值，都能获取到，所以只能保存到本地储存。
    login() {
      var that = this;
      //点击触发事件匹配输入框正则，在给后台提交获得的信息返回结果看是否登陆成功 登陆成功就设置cookie放到vuex里面
      let data = {
        account: this.username,
        pwd: this.password,
        code: this.yzm
      };
      console.log(data);
      if (!this.username || !this.password) {
        alert("请输入用户名或密码");
      } else {
        /*接口请求 ,返回结果应该有用户类型，和具体用户信息userid 是否可以登陆成功信息*/
        that.role = that.$refs.selects.value;
        console.log(that.role);
        if (that.role == "管理员") {
          this.axios
            .post("/api/v1/admin/login", {
              account: this.username,
              pwd: this.password,
              code: this.yzm,
              key: this.key
            })
            .then(function(res) {
              console.log(res);
              // 如果为0 就是正常返回
              if (res["data"]["code"] == 0) {
                var token = res["data"]["data"]["token"];
                Cookies.set("userToken", token);
                Cookies.set("roleType", that.role);

                //  每一次登录把token放到vuex的数据管理库里面，设置后就可以取到token
                that.$store.commit("setToken", token);
                that.$store.commit("getToken");
                //第一次登陆检查又没有选择记住密码，如果选择就把用户登陆信息和密码同时放到cookie里面或则放到本地存储
                var checked = that.$refs.rember.checked;
                if (checked) {
                  Cookies.set("username", that.username);
                  Cookies.set("password", that.password);
                }
                //返回成功出现弹窗。可以点击进入系统/跳转相关页面
                that.$store.state.loginsucess = false;
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
        } else {
          Cookies.set("roleType", that.role);

          //  学生走的另一个接口 和管理员分开
          console.log("学生");
          that.$store.commit("setToken", 1);
          // 假设登录成功
          this.goindex();
          that.$store.state.loginsucess = false;
        }
      }
    },
    //页面刷新调用的方法：自动获取本地存储的用户名和密码，自动添加到data里面进行赋值
    getinfo() {
      var username = Cookies.get("username");
      var password = Cookies.get("password");
      this.username = username;
      this.password = password;
    },
    goindex() {
      // 判断是学生还是管理员
      var role = Cookies.get("roleType");
      console.log(role);
      if (role == "管理员") {
        console.log(this.$router);
        this.$router.push({ path: "/admin/teacherindex/teacherschool" });
      } else {
        this.$router.push({ path: "/studentindex/studentschool" });
      }
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
    // 只是前段登出 后台没接收到销毁的token
    logincout() {
      this.$store.commit("setToken", "");
      this.$store.state.loginsucess = true;
    },

  
    first(event) {
      if (event.type == "click") {
             this.$router.push({ path: "/login" });

      }
      this.$refs.soli.map(item => {
        item.style.cssText =
          'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';
      });
      this.$refs.soli1.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';

      this.$refs.soli2.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';

      event.target.style.cssText =
        "position: relative;bottom: 20px; background-color: #aeaeae;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
    },

      cli(event,index) {

      this.$refs.soli.map(item => {
        item.style.cssText =
          'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';
      });
      this.$refs.soli1.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';

      this.$refs.soli2.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';

    
      if (event.type == "click") {
        this.$router.push({ path: "/studentindex/gpartical",query:{index:index}});
     event.target.style.cssText =
        "position: relative;bottom: 0px; background-color: #aeaeae;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
      }else{
          event.target.style.cssText =
        "position: relative;bottom: 20px; background-color: #aeaeae;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
      }
    },
    handleCommand(command) {
      this.$message("click on item " + command);
      this.$router.push({ path: "/studentindex/gpartical" });
    },
    goArtical() {
      this.$router.push({ path: "/studentindex/gpartical" });
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  height: 150px;
  position: absolute;
  z-index: 4;
  > .top1 {
    position: relative;
    height: 60px;
    text-align: center;
    > ul {
      height: 30px;
      position: absolute;
      bottom: 0;
      right: 50px;
      > li {
        float: left;
        width: 110px;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        color: #66676b;
        border-radius: 10px;
        cursor: pointer;

        // border: 1px solid #66676b;
      }
      // > li:nth-child(1) {
      //   background-color: #0688c6;
      // }
      // > li:nth-child(2) {
      //   background-color: #f7bc3a;
      // }
      // > li:nth-child(3) {
      //   background-color: #6ed2f2;
      // }
      // > li:nth-child(4) {
      //   background-color: #f5868f;
      // }
      // > li:nth-child(5) {
      //   background-color: #6dc0b8;
      // }
      // > li:nth-child(6) {
      //   background-color: #b9696c;
      // }
      // > li:nth-child(7) {
      //   background-color: #09c39c;
      // }
    }
  }
  > .top2 {
    position: relative;
    z-index: 99;
    display: flex;
    justify-content: center;
    opacity: 0.6;
    height: 50px;
    > ul {
      position: absolute;
      right: 50px;
      width: 784px;
      background-color: #aeaeae;
      border-radius: 10px;

      > li {
        width: 100px;
        float: left;
        text-align: center;
        line-height: 50px;
      }
    }
  }
}
.show {
  display: block;
}
.hidden {
  display: none;
}

.banner {
  position: relative;
  background-color: #d4d8d7;
  // top: -60px;
  .loginform {
    width: 325px;
    height: 285px;
    top: 80px;
    position: absolute;
    right: 170px;
    top: 150px;
    background: #ffffff;
    color: #9c9c9c;
    width: 295px;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 4;
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
  .loginsucess {
    width: 325px;
    height: 200px;
    top: 90px;
    position: absolute;
    right: 170px;
    top: 150px;

    background: #ffffff;
    color: #9c9c9c;
    width: 295px;
    padding: 10px 0;
    border-radius: 5px;
    z-index: 4;
    .longinhead {
      height: 30px;
      border-bottom: 1px solid #fff;
      padding: 0 10px;
      i {
        float: right;
        color: #e8a717;
      }
    }
    .loginbody {
      height: 120px;
      .left {
        width: 100px;
        float: left;
      }
      .right {
        float: left;
        line-height: 40px;
      }
    }
    .loginout {
      height: 40px;
      background-color: #aeaeae;
      width: 80%;
      margin: 0 auto;
      text-align: center;
      line-height: 40px;
      color: #ffffff;
      border-radius: 10px;
    }
  }
}

.el-carousel__item img {
  height: 100%;
  width: 100%;
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 410px;
  margin: 0;
}

.bottom {
  position: relative;
  width: 100%;
  .a1 {
    padding-top: 75px;
    min-height: 500px;
    background-color: #e5e6e7;
    .tit {
      text-align: center;
      width: 100%;
      margin: 0 auto;
      margin-top: 20px;
      height: 76px;
      position: relative;
      width: 400px;
      text-align: center;
      height: 150px;
      background: url("../../assets/images/未标题-1_0001_图层-3.png") no-repeat
        100% 100%;
      background-size: cover;
      span {
        position: relative;
        top: 20px;
        left: -15px;
        font-size: 16px;
      }
    }
    .sons {
      // 210+20 *7
      overflow: hidden;
      position: relative;
      width: 1320px;
      margin: 0 auto;
      padding: 0 20px;
      .son {
        // position: relative;
        // overflow: hidden;
        // left: 0;
        // top: 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        li {
          float: left;
          width: 200px;
          height: 250px;
          line-height: 300px;
          text-align: center;
          padding-top: 25px;
          text-align: center;
          background: #bdd8e1;
          margin: 0 10px;
          margin-top: 10px;
          color: #fff;
        }
        > li:nth-child(6n + 1) {
          background-color: #bdd8e1;
          background: url("../../assets/images/a.png") no-repeat center center;
          background-size: cover;
        }
        > li:nth-child(6n + 2) {
          background-color: #bed1e2;
          background: url("../../assets/images/b.png") no-repeat center center;
          background-size: cover;
        }
        > li:nth-child(6n + 3) {
          background-color: #e8c1ba;
          background: url("../../assets/images/c.png") no-repeat center center;
          background-size: cover;
        }
        > li:nth-child(6n + 4) {
          background-color: #cebce4;
          background: url("../../assets/images/d.png") no-repeat center center;
          background-size: cover;
        }
        > li:nth-child(6n + 5) {
          background-color: #d8dad9;
          background: url("../../assets/images/e.png") no-repeat center center;
          background-size: cover;
        }
        > li:nth-child(6n + 6) {
          background-color: #b1b5db;
          background: url("../../assets/images/f.png") no-repeat center center;
          background-size: cover;
        }

        li:hover {
          transform: rotateY(90deg);
          transition: All 0.5s ease;
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>