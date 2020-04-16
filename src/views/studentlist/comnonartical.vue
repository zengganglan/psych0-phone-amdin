<template>
<div>
    <div class="head">
           <headtop :index="index"></headtop>

    </div>
    <div class="container1">
      <div class="left">
        <el-row class="tac">
          <el-col :span="12">
            <h5>栏目1类</h5>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @select="handleOpen"
              @close="handleClose"
            >
              <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group >
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
              </el-submenu>-->
              <el-menu-item index="1">
                <span slot="title">文章1</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title">文章2</span>
              </el-menu-item>
              <el-menu-item index="3">
                <span slot="title">文章3</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="right" :v-html='content' style="text-algin:center">
          <h2>nihao</h2>
      </div>
    
    </div>
      <div class="pinglun">
         <span class="logins el-icon-star-on" >登录</span>
        <textarea name="" id="" cols="30" rows="10" v-model="pinglun">
          233
        </textarea>
        <div class="sub"><input type="button" value="畅言一下" @click="cangyan()"></div>
      </div>
</div>
 
</template>

<script>
import headtop from '../../components/head'

export default {
  data() {
    return {
      index: this.$route.query.index,
      content:" <h2>nihao</h2>",
      pinglun:""
    };
  },
  mounted(){
   console.log(this.index)
    //  this.$refs.soli1.style.cssText =
    //     "position: relative;bottom: 0px; background-color: #aeaeae;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
  },
  methods: {
    handleOpen(key, keyPath) {
      var id = 4;
      var that = this;
      that.axios.post("/api/v1/admin/article/detail/" + id).then(function(res) {
        console.log(res);
      });
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 评论
    cangyan(){
      var that = this
      console.log(that.pinglun) 
      that.axios.post("/api/v1/user/article/comment",{
        art_id:1,
        content:that.pinglun
      }).then(function(res){
        console.log(res)
      })

    }
  },
  components:{
    headtop:headtop
  }
};
</script>

<style lang="scss" scoped>
.top {
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
}
.pinglun{
   width: 1000px;
  margin:0 auto;
  padding-left: 410px;
  .logins{
    height: 50px;
    width: 50px;
    border-radius: 50px;
    display: block;
    border: 1px solid #4398ed;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    position: relative;
    top: 10px;

  }
  textarea{
    min-width: 700px;
    min-height: 150px;
    margin-bottom: 20px;
    border-radius: 20px;
    border: 1px solid #4398ed;
    padding: 10px;
  }
  .sub{
    display: flex;
    justify-content: flex-end;
    input{
      margin-right: 200px;
      position: relative;
      top: -25px;
      right: 25px;
      border-radius: 10px;
      background-color: #4398ed;
      color: white;
      width: 100px;
      height: 30px;
      cursor: pointer;
    }
  }
  
}
.container1 {
  /* 由两个子元素撑开 */
  display: flex;
  min-height: 1260px;
  width: 1000px;
  margin:0 auto;
  padding: 10px;

  .left {
    width:210px;


  }
  .right {
    flex: 1;
    /* 右边部分不影响其他盒子也不被别人影响· */
    overflow: hidden;
          background-color: #f8f8fa;

  }
}
h5 {
  height: 80px;
  text-align: center;
  line-height: 100px;
  font-size: 25px;
  border-bottom: 1px solid #727272;
  color: white;
  background-color: rgb(174, 174, 174);
  i {
    font-size: 40px;
  }
}

.el-col {
  width: 100%;
  background-color: rgb(102, 102, 102);
}
.el-menu-item,
.el-submenu__title,
.el-submenu {
  width: 210px;
}
.el-menu-item {
  height: 50px;
}
.el-menu-item-group__title {
  padding: 0;
  line-height: 0;
}
.nav {
  width: 332px;
  // height: 1250px;
  background-color: #21212d;
  position: relative;
  // overflow: hidden;

  > .left {
    z-index: 2;
    position: absolute;
    width: 122px;
    top: 0;
    left: 0;
    // height: 1250px;
    background-color: #21212d;
    letter-spacing: 3px;
    font-size: 20px;

    > li {
      background-color: #21212d;
      height: 60px;
      width: 100%;
      line-height: 60px;
      text-align: center;
      position: relative;
      color: #5c7fd9;
      overflow: hidden;
      cursor: pointer;
      //   text-overflow:ellipsis;
      //   white-space: nowrap;
      span {
        display: inline-block;
        width: 100%;
        position: absolute;
        left: 0;
        font-size: 12px;
      }
    }
    .firstnav {
      background-color: rgb(48, 50, 64);
      color: white;
    }
  }
  > .right {
    // width: 219px;
    margin-left: 122px;
    background-color: rgb(48, 50, 64);
    height: 100%;
  }
}
</style>