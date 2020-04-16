<template>
  <div class="top1">
    <ul>
      <li ref="soli1" class="soli1" @click.stop="first" @mouseover.stop="first" >首页</li>
      <li
        class="soli"
        ref="soli"
        v-for="(item,index) in  $store.state.columns"
        :key="index"
        v-if="index<5"
        @click.self="cli($event,index,item.id)"
        @mouseover.self="cli($event)"
      >{{item.name}}</li>
      <li ref="soli2" @click.self="first" @mouseover.self="first" >
        <span> 更多</span>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
           
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-plus"
              v-for="(item,index) in  $store.state.columns"
              :key="index"
              v-if="index>=5"
              :command="item.id"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
import { setInterval } from "timers";
export default {
  data() {
    return {
      index1: "",
      data:[],
      ids:""
    };
  },
  watch: {
    data: function() {
        // 数据变化传给父组件
        this.$emit('changedata', this.data,this.ids);
        
    }
  },
  mounted() {
    //   初始父组件传过来prop id 赋值初始ids传回去 不能在原来props改变，进行渲染 
      this.getlist(this.id)
    this.index1 = this.index;
    var that = this;
    setTimeout(function() {
      console.log(
        that.index,
        that.$refs.soli,
        document.getElementsByClassName("soli")
      );
      var doms = that.$refs.soli;
      doms.map((item, index) => {
        if (index == that.index) {
          console.log(item);
          item.style.cssText =
            'position: relative;bottom: 0px;background-color: #00CBA3;transition: all 1s ease; color: #fff;border-bottom: "";';
        }
      });
    }, 2000);
  },
  methods: {
       getlist(id){
        var that = this
        that.ids=id
      this.axios.post('/api/v1/user/article/list?id='+id).then(function(res){
          console.log(res)
          if (res['data']['code']==0) {
               that.data=res['data']['data']
          }
      })
    },
    cli(event,index,id) {

      this.$refs.soli.map(item => {
        item.style.cssText =
          'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';
      });
      this.$refs.soli1.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';

      this.$refs.soli2.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';

      event.target.style.cssText =
        "position: relative;bottom: 20px; background-color: #00CBA3;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
      if (event.type == "click") {
                        this.getlist(id)
           event.target.style.cssText =
        "position: relative;bottom: 0px; background-color: #00CBA3;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
          this.$router.push({ path: "/studentindex/gpartical",query:{id:id,index:index}});   
             }
    },
    move(event,index,id){
        this.$refs.soli.map(item => {
        item.style.cssText =
          'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';
      });
      this.$refs.soli1.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';

      this.$refs.soli2.style.cssText =
        'position: relative;bottom: 0px;background-color: "";transition: all 1s ease; color: "";border-bottom: "";';

      event.target.style.cssText =
        "position: relative;bottom: 0px; background-color: '#00CBA3';transition: all 1s ease; color: '#fff';border-bottom: 1px solied #fff";
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
        "position: relative;bottom: 20px; background-color: #00CBA3;transition: all 1s ease; color: #fff;border-bottom: 1px solied #fff";
    },

    handleCommand(command) {
              this.getlist(command)

      this.$router.push({ path: "/studentindex/gpartical", query:{id:command}});
    },
  },
  props: ["index","id"]
};
</script>

<style lang="scss" scoped>
.top1 {
     position: relative;
    height: 60px;
    text-align: center;
    background-color: #fff;
    opacity: 0.75;
    width: 100%;
    overflow-x: scroll;
  > ul {
    height: 30px;
    width: 1000px;
   margin-top: 13px;
   font-size: 12px;
    // overflow: hidden;
    // display: flex;
    // justify-content: flex-start;
    // flex-wrap: nowrap;

    > li {
      float: left;
      width: 80px;
      height: 30px;
      line-height: 30px;
        color: #00cba3;
      border-radius: 10px;
      cursor: pointer;

      // border: 1px solid #66676b;
    }
  }
}
</style>