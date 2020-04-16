<template>
  <div class="main">
    <div class="top">
      <el-button type icon="iconfont icon-account" circle @click="gologin"></el-button>
      <span>心理咨询管理系统</span>
    </div>
    <div class="phone-banner">
      <el-carousel :interval="5000" arrow="always" height="300px">
        <el-carousel-item>
          <img src="../../assets/images/11.png" alt />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../assets/images/22.png" alt />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../assets/images/33.png" alt />
        </el-carousel-item>
      
      </el-carousel>
    </div>
    <div class="bottom">
      <div class="a1">
        <div class="sons">
          <ul class="son">
            <li
              class="soli"
              v-for="(item,index) in  $store.state.columns"
              :key="index"
              @click="goArtical(item.id,index)"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <template v-if="!$store.state.loginsucess">
      <div class="loginsucess">
        <div class="longinhead">
          <span>心理咨询管理系统</span>
          <i @click="logincout">[注销登陆]</i>
        </div>
        <div class="loginbody">
          <div class="left">
            <img src alt />
          </div>
          <div class="right">
            <ul>
              <li v-if="role.sf!==1">学校：{{role['college_name']}}</li>
              <li>
                账号：
                <i>{{role['name']}}</i>
              </li>
              <li>
                身份：
                <i v-if="role['type']==1 && role['college_name']">校级超级管理员</i>
                <i v-else-if="role['type']==1">总超级管理员</i>
                <i v-else>普通管理员</i>
              </li>
            </ul>
          </div>
        </div>
        <div class="loginout" @click="goindex">进入系统</div>
      </div>
    </template>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      role: ""
    };
  },
  created() {
    var role = this.$store.state.userInfo;
    if (typeof role == "string") {
      role = JSON.parse(role);
    }
    this.role = role;
    console.log(this.role);
    if (this.$store.getters.token) {
  this.$store.commit("column")
}
  },
  methods: {
    goArtical(id, index) {
        this.$router.push({
          path: "/studentindex/gpartical",
          query: { id: id, index: index }
        });
    },
    goindex() {
      // 判断是还是普通管理员还是超级管理员
      var role = JSON.parse(Cookies.get("role"));
      if (role["type"] == 1) {
        if (role["college_name"]) {
          // 学校超管？注册时一定会选学校
          this.$router.push({ path: "/admin/teacherindex/teacherschool" });
        } else {
          //  总超管
          // this.$router.push({ path: "/school/localadminschool" });
             this.$message('系统超管用户请从pc端登录')

        }
      } else if (role["type"] == 2) {
        // 学校普通管理员
        this.$router.push({ path: "/admin/teacherindex/teacherschool" });
      }
    },
    // 只是前段登出 后台没接收到销毁的token
    logincout() {
      this.$store.commit("setToken", "");
      this.$store.state.loginsucess = true;
      //this.getyzm();
    },
    gologin() {
      this.$router.push({
        path: "/loginindex"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-carousel__item img{
    height: 100%;
    width: 100%;
}
.loginsucess {
  height: 200px;
  top: 90px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  right: 170px;
  top: 150px;

  background: #ffffff;
  opacity: 0.85;
  color: #6b6767;
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
    background-color: #aaa8a8;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    border-radius: 10px;
  }
}
.main {
  background-color: #e9eff3;
}
.top {
  text-align: center;
  position: relative;
  height: 50px;
  line-height: 50px;
  .el-button.is-circle {
    position: absolute;
    left: 5px;
    top: 5px;
  }
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
          width: 100px;
          height: 150px;
          line-height: 200px;
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