
    <template>
  <div class="nav">
    <ul class="left">
      <li class="firstnav">
        <span>测评中心</span>
      </li>
      <li>
        <span>咨询中心</span>
      </li>
      <li>
        <span>团体辅导</span>
      </li>
      <li>
        <span>其他服务</span>
      </li>
    </ul>
    <ul class="right">
      <li>
        <ul>
          <el-row class="tac">
            <el-col :span="12">
              <h5>
                <i class="iconfont icon-rentou"></i> 测评中心
              </h5>
              <el-menu
                default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#303240"
                text-color="#5F8BE4"
                 active-text-color="#fff"
                :router="true"
              >
                <!-- <router-link to="/admin/Groupsettings">
                  <el-menu-item index="1">
                    <span slot="title">单位组别设置</span>
                  </el-menu-item>
                </router-link>-->
                <el-menu-item index="/Evaluation/survey">
                  <span slot="title">心理普查</span>
                </el-menu-item>
                 <el-menu-item index="student/test2">
                  <span slot="title">心理自测</span>
                </el-menu-item>
                 <el-menu-item index="student/test3">
                  <span slot="title">测评记录</span>
                </el-menu-item>
             
               
              </el-menu>
            </el-col>
          </el-row>
        </ul>
      </li>
      <li>
        <ul>
          <el-row class="tac">
            <el-col :span="12">
              <h5>咨询中心</h5>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#303240"
                text-color="#5F8BE4"
                active-text-color="#fff"
              >
                <el-menu-item index="student/Consultation1">
                  <span slot="title">中心简介</span>
                </el-menu-item>
                <el-menu-item index="student/Consultation2">
                  <span slot="title">咨询记录</span>
                </el-menu-item>
                    <el-menu-item index="student/Consultation3">
                  <span slot="title">访谈邀请</span>
                </el-menu-item>
               <el-menu-item index="student/Consultation4">
                  <span slot="title">问题留言</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </ul>
      </li>
      <li>
        <ul>
          <el-row class="tac">
            <el-col :span="12">
              <h5>咨询中心</h5>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#303240"
                text-color="#5F8BE4"
                active-text-color="#fff"
              >
                <el-menu-item index="1">
                  <span slot="title">单位组别设置</span>
                </el-menu-item>

                <el-submenu index="2">
                  <template slot="title">
                    <span>管理员管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-menu-item index="2-4">选项4</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3" background-color="#35383B">
                  <template slot="title">
                    <span>学生管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1">选项1</el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title>
                    <el-menu-item index="3-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="3-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="3-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>

                <el-menu-item index="4">
                  <span slot="title">导航4</span>
                </el-menu-item>

                <el-menu-item index="5">
                  <span slot="title">导航5</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </ul>
      </li>
      <li>
        <ul>
          <el-row class="tac">
            <el-col :span="12">
              <h5>档案中心</h5>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#303240"
                text-color="#5F8BE4"
                active-text-color="#fff"
              >
                <el-menu-item index="1">
                  <span slot="title">单位组别设置</span>
                </el-menu-item>

                <el-submenu index="2">
                  <template slot="title">
                    <span>管理员管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-menu-item index="2-4">选项4</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3" background-color="#35383B">
                  <template slot="title">
                    <span>学生管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1">选项1</el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title>
                    <el-menu-item index="3-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="3-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="3-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>

                <el-menu-item index="4">
                  <span slot="title">导航4</span>
                </el-menu-item>

                <el-menu-item index="5">
                  <span slot="title">导航5</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </ul>
      </li>
     
      <li>
        <ul>
          <el-row class="tac">
            <el-col :span="12">
              <h5>文章管理</h5>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#303240"
                text-color="#5F8BE4"
                active-text-color="#fff"
              >
                <el-menu-item index="1">
                  <span slot="title">单位组别设置</span>
                </el-menu-item>

                <el-submenu index="2">
                  <template slot="title">
                    <span>管理员管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-menu-item index="2-4">选项4</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3" background-color="#35383B">
                  <template slot="title">
                    <span>学生管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1">选项1</el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title>
                    <el-menu-item index="3-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="3-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="3-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>

                <el-menu-item index="4">
                  <span slot="title">导航4</span>
                </el-menu-item>

                <el-menu-item index="5">
                  <span slot="title">导航5</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </ul>
      </li>
      <li>
        <ul>
          <el-row class="tac">
            <el-col :span="12">
              <h5>心理测评中心</h5>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#303240"
                text-color="#5F8BE4"
                active-text-color="#fff"
              >
                <el-menu-item index="1">
                  <span slot="title">心理普查</span>
                </el-menu-item>
               <el-menu-item index="1">
                  <span slot="title">心理自测</span>
                </el-menu-item>  <el-menu-item index="1">
                  <span slot="title">测评记录</span>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <span>管理员管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-menu-item index="2-4">选项4</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3" background-color="#35383B">
                  <template slot="title">
                    <span>学生管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1">选项1</el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title>
                    <el-menu-item index="3-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="3-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="3-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>

                <el-menu-item index="4">
                  <span slot="title">导航4</span>
                </el-menu-item>

                <el-menu-item index="5">
                  <span slot="title">导航5</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import $ from "jquery";
import data from "../../vendor/navbar"


export default {
  name: "Navbar",
  data() {
    return {
      userId: 1,
      navbardata:""
    };
  },
  mounted(){
    this.navbardata=data
    console.log(this.navbardata)
    console.log(this.$route.path)
  },
  watch:{
      $route(to,from){
      console.log(from.path);//从哪来
      console.log(to.path);//到哪去
    }
  },
  created() {
    $(function() {
      //循环注册属性
      $(".right>li:eq(0)")
        .siblings()
        .hide();
      $(".left>li").each(function(index) {
        $(this).attr("suoyin", index);
      });
      
      $(".left>li").click(function() {
        //点击出现相应的右框和兄弟元素的hover事件
        var index = $(this).attr("suoyin");
        $(".right>li:eq(" + index + ")").show();
        $(this)
          .off("mouseover")
          .css({color:"#fff",backgroundColor: "rgb(48,50,64)" })
          .siblings()
          .css({color:"#5F8BE4",backgroundColor: "rgb(33,33,45" });
        // $(this).off("mouseout");
        $(".right>li:eq(" + index + ")")
          .siblings()
          .hide();
      });
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);

      
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
h5 {
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 25px;
  border-bottom: 1px solid #727272;
  color: white;
  background-color: rgb(48,50,64);
}
.icon-rentou {
  font-size: 60px;
  color: #999999;
  vertical-align: middle;
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
.el-menu-item{
  height: 75px;
}
.el-menu-item-group__title {
  padding: 0;
  line-height: 0;
}
.nav {
  width: 332px;
  height: 1250px;
  background-color: blueviolet;
  position: relative;

  > .left {
    z-index: 2;
    position: absolute;
    width: 122px;
    top: 0;
    left: 0;
    height: 1250px;
    background-color: #21212D;
    letter-spacing: 3px;
    font-size: 20px;

    > li {
      background-color: #21212D;
      height: 60px;
      width: 100%;
      line-height:60px;
      text-align: center;
      position: relative;
      color: #5C7FD9;
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
      background-color: rgb(48,50,64);
      color: white;
    }
  }
  > .right {
    // width: 219px;
    margin-left: 122px;
    background-color: rgb(48,50,64);
    height: 100%;
   
  }
}
</style>
