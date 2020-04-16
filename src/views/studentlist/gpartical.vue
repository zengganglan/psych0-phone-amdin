<template>
  <div class="mains">
    <div class="head">
      <headtop :index="index" :id="id" ref="headtop" @changedata="changedata"></headtop>
    </div>
    <template v-if="flag">
      <div class="container atticalcon">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label width="200">
            <template slot-scope="scope">
              <span
                style="margin-left: 10px"
                :style="{color:'#8CB6C0',cursor: 'pointer'
}"
                @click="gocommon(scope.row.id,index)"
              >{{ scope.row.theme }}</span>
            </template>
          </el-table-column>
          <el-table-column label width="300">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template v-else>
      <div class="bac">
        <div class="container1">
          <!-- <div class="left">
            <el-row class="tac">
              <el-col :span="12">
                <h5>{{column}}</h5>
                <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  @select="handleOpen"
                  @close="handleClose"
                >
                  <el-menu-item v-for="(item,index) in  tableData" :key="index" :index="''+item.id">
                    <span slot="title">{{item.theme}}</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </div> -->
          <div class="right" :v-html="content" style="text-algin:center">
            <div class="title">
              <h1 class="am-article-title am-text-center">{{theme}}</h1>
              <p>
                作者：
                <span>{{name}}</span>&nbsp;&nbsp;  <br> 时间：
                <span>{{time}}</span>&nbsp;&nbsp;  <br>浏览次数：
                <span>{{visit}}</span>
              </p>
            </div>
            <p v-html="content" class="pcon">
            </p>
              <div class="pinglun">
            <span class="logins el-icon-star-on" @click="loginpath">登录</span>
            <textarea name id cols="30" rows="3" v-model="pinglun">
          233
        </textarea>

            <div class="sub">
              <input type="button" value="畅言一下" @click="cangyan">
            </div>

            <div class="liuyans">
              <div class="tab" v-for="(item,index) in getcomment" :key="index">
                <div class="lef"><span class="iconfont icon-rentou"></span></div>
                <div class="rig">
                  <div class="titl">
                    姓名：
                    <span>{{item.name}}</span> 评论时间：
                    <span>{{item.create_time}}</span>
                  </div>
                  <div class="content">{{item.content}}</div>
                </div>
              </div>
              <div class="loadmore" @click="loadmore" v-if="commentsflag">加载更多</div>
            </div>
            
          </div>
          </div>
           
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import headtop from "../../components/head";

export default {
  data() {
    return {
      commentsflag: true,
      flag: true,
      // 登录界面传的栏目id和高亮索引 初次渲染要把值传到子组件
      articalId: "",
      id: this.$route.query.id,
      index: this.$route.query.index,
      //  子组件传过来的文章列表
      column: "",
      tableData: [],
      name: "",
      theme: "",
      time: "",
      visit: "",
      content: " ",
      pinglun: "",
      offset: 0,
      getcomment: []
    };
  },

  methods: {
    //   如果点击导航栏子组件数据变化 调用父组件方法且数据传到父组件
    changedata(data, id) {
      console.log(data);
      this.flag = true;
      this.id = id;
      console.log(id);
      this.tableData = data;
    },
    // 选择渲染文章
    handleOpen(key, keyPath) {
      var that = this;
      that.articalId = key;
      console.log(key);
      that.axios.post("/api/v1/user/article/visit?id=" + key).then(function(res) {
        var data = res["data"]["data"];
        that.theme = data["theme"];
        that.content = data["content"];
        that.name = data["name"];
        that.time = data["create_time"];
        that.visit = data["visit_count"];
      });
      that.getcomment = [];
      that.getcomments(that.articalId, that.offset);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    gocommon(id, index) {
      var that = this;
      that.getcomment = [];
      // 初始时候渲染文章详情
      this.flag = false;
      var that = this;
      that.articalId = id;
      this.$store.state.columns.map(item => {
        if (that.id == item.id) {
          that.column = item.name;
          console.log(that.name);
        }
      });
      console.log(that.name);
      that.axios.post("/api/v1/user/article/visit?id=" + id).then(function(res) {
        var data = res["data"]["data"];
        that.theme = data["theme"];

        that.content = data["content"];
        that.name = data["name"];
        that.time = data["create_time"];
        that.visit = data["visit_count"];
      });
      that.offset = 0;
      var click = false;
      that.getcomments(that.articalId, that.offset, click);

      //   this.$router.push({
      //     path: "/studentindex/comnonartical",
      //     query: { articalid: id, index: index }
      //   });
    },
    loginpath() {
      this.$router.push({ path: "/login" });
    },
    // 评论
    cangyan() {
      // 这个页面不管用户登录或者没有登录都可以查看 但是如果要评论之前判断是否登录过，没有登录提示用户登录才能评论
      var that = this;
      if (this.$store.state.token) {
        that.axios
          .post("/api/v1/user/article/comment", {
            art_id: that.articalId,
            content: that.pinglun
          })
          .then(function(res) {
            //   console.log(res);
            if (res["data"]["code"] == 0) {
              that.$message("评论成功");
              that.commentsflag = true;
              that.offset = 0;
              that.getcomments(that.articalId, that.offset, false);
            }
          });
      } else {
        this.$message("请去登录后再评论");
      }
    },
    getcomments(articalId, offset, click) {
      var that = this;
      that.axios
        .post("/api/v1/user/article/comment/list", {
          id: articalId,
          offset: offset
        })
        .then(function(res) {
          console.log(res);
          if (res["data"]["code"] == 0) {
            var data = res["data"]["data"];
            that.getcomment = that.getcomment.concat(data);
            if (data.length == 0) {
              if (click) {
                that.$message("没有更多评论");
              } else {
                //  如果请求数据为0同时 初次渲染没有通过点击
                that.commentsflag = false;
              }
            }
          }
          console.log(that.getcomment);
        });
    },
    loadmore() {
      var click = true;
      if (this.getcomment.length > 0) {
        this.offset = this.getcomment[this.getcomment.length - 1]["id"];
        this.getcomments(this.offset, this.articalId, click);
      }
    }
  },
  components: {
    headtop: headtop
  }
};
</script>

<style lang="scss" scoped>
.mains {
  // background:url('../../assets/images/artical.png') no-repeat;
  background-size: contain;
  background-color: #d5d7d8;
}
tbody {
  tr {
    display: block;
    margin-top: 20px;
    vertical-align: inherit;
    border-color: inherit;
    font-size: 14px;
    textarea {
      padding: 10px;
      background: #fff;
      border: 1px solid #cae7f7;
      color: #09c;
      width: 600px;
      min-height: 50px;
    }
    input {
      border: 1px solid #cae7f7;
      height: 30px;
    }
  }
}
.top {
  .head {
    width: 100%;
    height: 150px;
    position: fixed;
    top:0;
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
.container {
  /* 由两个子元素撑开 */
  display: flex;
  min-height: 1260px;
  // width: 1000px;
  margin: 0 auto;
  // padding: 100px;
  .el-table,
  .el-table__body-wrapper,
  .el-table__footer-wrapper,
  .el-table__header-wrapper {
    background-color: #eaebeb;
  }
  .el-table__body-wrapper {
    background-color: #eaebeb;
  }

  .left {
    width: 210px;
  }
  .right {
    flex: 1;
    /* 右边部分不影响其他盒子也不被别人影响· */
    overflow: hidden;
    background-color: #f8f8fa;
  }
}
h5 {
  height: 100px;
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
  height: 75px;
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

.container1 {
  /* 由两个子元素撑开 */
  display: flex;
  min-height: 1260px;
  // width: 1000px;
  margin: 0 auto;
  padding: 10px;

  // .left {
  //   width: 210px;
  //   overflow: hidden;
  // }
  .right {
    flex: 1;
    /* 右边部分不影响其他盒子也不被别人影响· */
    overflow: hidden;
    background-color: #f8f8fa;
    .title {
      margin-top: 40px;
      h1 {
        text-align: center !important;
        line-height: 1.15;
        font-weight: 400;
        font-size: 20px;
      }
      p {
        text-align: center;
        margin-top: 20px;
        color: #999;
        font-size: 14px;
      }
    }
    .pcon {
      margin: 30px;
      min-height: 600px;
      max-height: 1000px;
      overflow: auto;

    }
    .pinglun {
      //  position: fixed;
       bottom: 0;
       width: 90%;
       margin:0 auto;
       padding-left: 10px;
      // width: 1000px;
      // margin: 0 auto;
      .logins {
        background-color: #09c;
        font-size: 12px;
        color: #fff;
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
      textarea {
        min-width: 80%;
        min-height: 20px;
        margin-bottom: 20px;
        border-radius: 20px;
        border: 1px solid #4398ed;
        padding: 10px;
      }

      .sub {
        display: flex;
        justify-content: flex-end;
        input {
          position: relative;
          top: -23px;
          right: 30px;
          // right: 25px;
          border-radius: 10px;
          background-color: #4398ed;
          color: white;
          width: 100px;
          height: 30px;
          cursor: pointer;
        }
      }
    }

    .liuyans {
      width: 100%;
      .tab {
        // min-width: 700px;
        min-height: 50px;
        margin-bottom: 20px;
        border-radius: 20px;
        border-top: 1px solid #e9e9e9;
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        .lef {
          width: 50px;
          font-size: 25px;
          .iconfont{
            font-size: 25px;
          }
        }
        .rig {
          .titl {
            color: #09c;
            font-size: 12px;
          }
          .content {
            margin-top: 20px;
          }
        }
      }
      .loadmore {
        width: 100px;
        margin: 0 auto;
        text-align: center;
        border-radius: 10px;
        background-color: #aeaeae;
        cursor: pointer;
        margin-bottom: 20px;
      }
    }
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