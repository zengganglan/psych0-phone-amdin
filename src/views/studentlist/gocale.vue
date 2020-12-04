<template>
  <div class="mains">
    <div class="head">
      <!-- <headtop :index="index" :id="id" ref="headtop" @changedata="changedata"></headtop> -->
    
    </div>
    <template >
      <div class="container atticalcon">
         <el-table
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        height='800px'
        :cell-style="{width:'80px',height:'30px'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column prop="name" label="专业名称"></el-table-column> -->
        <el-table-column prop="view_name" label="友好名称"></el-table-column>
        <el-table-column prop="short_name" label="英文简称"></el-table-column>
        <el-table-column prop="topic_count" label="题数"></el-table-column>
        <el-table-column label="适用年龄">
          <template slot-scope="scope">
            <span>{{scope.row.min_age+" — "+scope.row.max_age}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">         
         <el-button size="mini" @click.stop="show(scope.row)">
              <span class="iconfont icon-qrcode"></span>
            </el-button>
          </template>
        </el-table-column>       
      </el-table>
       <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="pageCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10,20,30,40,50,60]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.countpage"
        ></el-pagination>
      </div>
      </div>
       <el-dialog title="量表二维码" :visible.sync="dialogFormVisible" @opened="useqrcode" width="500px">
      <!-- <div class="tilt"><img src="../../../../assets/images/erweima.png" alt=""></div> -->
      <canvas id="canvas" ref="canvas" style="margin-left:150px"></canvas>
    </el-dialog>
    </template>
  
  </div>
</template>

<script>
import headtop from "../../components/head";
import QRCode from "qrcode";
import $ from "jquery";
export default {
  data() {
    return {
      commentsflag: true,
      // 登录界面传的栏目id和高亮索引 初次渲染要把值传到子组件
      lbId: "",
         // 页码
      page: {
        currentpage: 1,
        countpage: 10,
        pagesize: "10",
        flag: false
      },
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
      getcomment: [],
      dialogFormVisible:false,
            multipleSelection: [],

    };
  },
 created(){
 this.getlist(this.page.currentpage-0, this.page.pagesize-0)
 },
  methods: {
       getlist(currentpage, pagesize) {
      // 获得列表数据
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      var that = this;
      this.axios
        .post("/api/v1/scale/getScaleList", {
          page: currentpage,
          size: pagesize,
        })
        .then(function(res) {
          if (res["data"].code == 0) {
            that.page.countpage = res["data"]["data"]["count"];
            that.tableData = res["data"]["data"]["list"];
          }
        });
    },
      show(row) {
      // 按钮事件 传值
      this.dialogFormVisible = true;
      this.lbId=row.id
      this.name=row.view_name+row.short_name
      //  this.$router.push({path:'/studentindex/questionLogin',query:{id:this.lbId,name:this.name}})

    },
    // 分页·
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pagesize = val;
      this.getlist(this.page.currentpage, this.page.pagesize);
    },
    pageCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentpage = val;
      this.getlist(this.page.currentpage, this.page.pagesize);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
     //动态生成二维码
    useqrcode() {
      //对话框打开生成二维码生成的二维码内容，可以添加变量//http://psy.hxxlcloud.com/#/studentindex/caleindex?id=
      var canvas = document.getElementById("canvas");
      console.log(this.lbId);
      // http://115.159.209.142:7006 服务器域名
      if (!this.name) {
        this.name='无'
      }
      
      QRCode.toCanvas(canvas, `http://${window.location.host}/#/studentindex/questionLogin?id=${this.lbId}&name=${this.name}`, function(
        error
      ) {
        if (error) console.error(error);
        console.log("QRCode success!");
        
      });
    },
  
  },
  components: {
    headtop: headtop
  }
};
</script>

<style lang="scss" scoped>

.mains {
//   background:url('../../assets/images/artical.png') no-repeat;
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
.container {
  /* 由两个子元素撑开 */
//   display: flex;
  min-height: 1000px;
  width: 1000px;
  margin: 0 auto;
  padding: 100px;
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


</style>