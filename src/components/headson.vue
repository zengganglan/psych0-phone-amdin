<template>
  <div class="head" >
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="this.$route.path"
        menu-trigger="hover"
        router
        mode="horizontal"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item v-for="(menu,index) in $store.state.navdata['rightdata']" :key="index" :item="menu"/>
      </el-menu>
    </el-scrollbar>
    <!-- <div class="a1">{{headson[0]}}</div>
    <span class="a2">{{headson[1]}}</span>-->
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
import $ from "jquery";
export default {
  data() {
    return {
      menuList1: "",
      treeflag:false
    };
  },
  name: "Sidebar",
  components: { SidebarItem },
  // props:{
  //   menuList: {
  //     type: Array,
  //     required: true
  //   }
  // },
  // props: ["headson"],
  watch:{
  
  },
  created() {
    console.log(1111111111111111111,this.$store.state.navdata)
    this.$root.Bus.$on("setright", content => {
      console.log(content);
      this.menuList1 = content["rightdata"];
    });
     this.$root.Bus.$on('headflag', content => { 
       console.log(content)
       this.treeflag=content
    });
  },
  mounted() {

    // console.log($(".el-scrollbar"));
    this.horizontalMove({
      innerId: ".el-scrollbar",
      warpId: ".head",
      speed: 0.5
    });
  },
  methods: {
    horizontalMove(options) {
      //初始化数据
      var speed = 0.5;
      var startX; //触摸时的X坐标
      var x = 0; //X轴滑动的距离
      var aboveX = 0; // 设一个全局变量记录上一次内部块滑动的位置
      options = options || {};
      speed = options.speed;
      if (options.innerId && options.warpId) {
        var documentWidth = $(options.innerId).width(); //内部滑动模块的高度
        var wapperWidth = $(options.warpId).width(); //外部框架的高度
        var inner = $(options.innerId);
        var warp = $(options.warpId)[0];
        function touchStart(e) {
          //触摸开始
          // e.preventDefault();
           if(event.touches) {
             var touch = e.touches[0];
                } else {
          var touch = e
                }
          // var touch = e.touches[0];
          startX = touch.pageX; //刚触摸时的坐标
        }

        function touchMove(e) {
          //滑动
          // e.preventDefault();
           if(event.touches) {
             var touch = e.touches[0];
                } else {
          var touch = e
                }
          // var touch = e.touches[0];
          x = touch.pageX - startX; //滑动的距离 每一次记录全局变量的滑动距离
          inner.css({
            left: aboveX + x * speed
          });
        }

        function touchEnd(e) {
          //手指离开屏幕
                    // e.preventDefault();

          aboveX = parseInt(inner.css("left")); //touch结束后记录内部滑块滑动的位置 在全局变量中体现 一定要用parseInt()将其转化为整数字;
          if (x > 0 && aboveX > 0) {
            //当滑动到最顶端时候不能再网上滑动 既向右滑 x>0 全局滑动距离>0时 让leftz值=0 下相反
            //inner.style.top=0;
            inner.animate(
              {
                left: 0
              },
              200
            );
            aboveX = 0;
          }

          if (x < 0 && aboveX < -(documentWidth - wapperWidth)) {
            //当滑动到最底部时候不能再网下滑动
            // inner.style.top=-(documentHeight-wapperHeight)+"px";
            inner.animate(
              {
                left: -(documentWidth - wapperWidth)
              },
              200
            );
            aboveX = -(documentWidth - wapperWidth);
          }
        }
        // 监听事件 只有移动端可以监听
        warp.addEventListener("touchstart", touchStart, false);
        warp.addEventListener("touchmove", touchMove, false);
        warp.addEventListener("touchend", touchEnd, false);
          warp.addEventListener("mousedown", touchStart, false);
        warp.addEventListener("mousemove", touchMove, false);
        warp.addEventListener("mouseup", touchEnd, false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  height: 50px;
  // padding: 0 20px;

  background-color: rgb(48, 65, 86);
  box-shadow: #bdc0c3 1px 1px 10px;
  // overflow: scroll;
  overflow: hidden;
  .a1 {
    // margin-top: 30px;
    font-size: 25px;
  }
  .a2 {
    font-size: 12px;
    color: #9f9a9b;
  }
}
</style>