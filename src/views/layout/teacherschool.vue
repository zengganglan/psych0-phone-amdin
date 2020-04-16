<template>
  <div class="scrren">
    <!-- 初始页面 -->
    <!-- <div>首页</div> -->
    <div class="top1">
      <!-- <div class="left">
        <img src="../../assets/2018-12-28_153635.png" alt style="width:50px;height:50px;">
      </div> -->
      <div class="right">
        <div class="help">
          <span>亲爱的{{role.name}}:</span>
          <!-- <i>&nbsp;使用帮助</i> -->
        </div>
        <div class="dear">欢迎登陆心理管理系统</div>
        <div class="btn">点击下方磁片。快捷进入相应的办公界面</div>
      </div>
    </div>
    <div class="box">
      <div class="box2">
         <div class="box11">
          <h4>通知</h4>
          <p>&nbsp;&nbsp;   你们好本土化、多维度的专业生涯测评，帮助学生选择合适的专业领域本土化、帮助学生选择合适的专业领域</p>
        </div>
        <div class="box33"
         v-for="(value,index) in leftdata"
        :key="index"
        :class="{firstnav:index==domIindex}"
        @click="showright(index,$event)"
        ref="dom"
        style="background-color: #BDD8E1"
        >
            <span :class=" 'iconfont '+value['icon']"></span>
            
           <i>{{value['menu_name']}}</i>
        </div>
        <!-- <div class="box33" style="background-color: #BDD8E1" @click="first2">
          <span class="iconfont icon-baobei font"></span>
          测评中心
        </div>
        <div class="box33" style="background-color: #CEBCE4" @click="first3">
          <span class="iconfont icon-zixun font"></span>咨询中心
        </div> -->
        <!-- <div class="box33" style="background-color: #E8C1BA" @click="first4">
          <span class="iconfont icon-dangan font"></span>档案中心
        </div>
        <div class="box33" style="margin-right:0;background-color: #BED1E2" @click="first5">
          <span class="iconfont icon-weijibaogao font"></span>危机干预
        </div> -->
         
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// $(function(){
//     $(".box11 .b1").mouseover(function(){
//      $(this).css({transform: 'rotateY(180deg)', transition: "all 1s ease" })
//      }).mouseout(function(){
//      $(this).css({transform: 'rotateY(0deg)', transition: "all 1s ease" })
//      })
//      $(".box22").mouseover(function(){
//      $(".a1").css({top: '-110px', transition: "all 1s ease" })
//      $(".a2").css({top: '0px', transition: "all 1s ease" })

//      }).mouseout(function(){
//            $(".a1").css({top: '0px', transition: "all 1s ease" })
//           $(".a2").css({top: '110px', transition: "all 1s ease" })

//      })
// })
export default {
  data() {
    return {
      role: '',
       shownav:false,
      userId: 1,
      navbardata: [],
      rightdata: {},
      leftdata: [],
      title: "",
      icon: "",
      domIindex: 0,
      keys: [],
      rightflag: true,
      permission:"",
    }
  },
   beforeMount() {
              this.navbardata1();
  },
  watch:{
       '$route.path':function(){
        // 首页从别处点击到菜单栏某个路由菜单栏没有对应的变化,根据路由关键字匹配获取二级菜单，所以进入系统路由开始就获取第一项的菜单栏
          this.navbardata1();
       },
        'rightdata':function(){
          var content={
            rightdata:this.rightdata,
            title:this.title,
            icon:this.icon
          }
          localStorage.setItem(`content`,JSON.stringify(content))
          this.$store.commit('setnav',{content:content})
      // this.$store.state.navdata=content
      // this.$root.Bus.$emit("setright", content);
      },
      
  },
   mounted(){
       var role = this.$store.state.userInfo;
    if (typeof role == "string") {
      role = JSON.parse(role);
    }
    this.role = role;
   },
  methods: {
  navbardata1() {
      var that = this;
      // 因为后面用到了push.要清空原来的
      var navbardata=[]
      var leftdata=[]
      var keys=[]     
      this.axios
        .get("/api/v1/admin/menu")
        .then(function(res) {
          var data = res["data"]["data"];
          var obj=[]
          // 根据字段把按钮权限过滤掉。把data变成一维数组 把权限按钮筛选
            that.permission=data
            that.permission=that.NestedToFlat(data)
             //2根据flag在树形接口过滤掉权限规则，如果当前对象的item里面子数据flag为0就把把当前对象设置为空数组[]
          function a(group,obj) {
            for (var key in group) {              
                if (group[key]["items"].length !== 0) {
                  for(var key1 in group[key]["items"]){
                    if (group[key]["items"][key1]['flag']==0) {
                      group[key]["items"]=[]
                        break;//跳出循环。空数组无法循环 找不到flag，但是还是按照修改之前的数据去执行。
                    }
                  }
                   a(group[key]["items"],obj)
                }
            }  
            return group;//如果函数内部重新用变量group1接收data才会重新赋值成功为[]
          }
          a(data,obj)           
          // 根据sort排序 数组不会影响顺序
          var arr = [];
          for (var key in data) {
            // 手机版只显示固定栏目，数据库路由是配合前端写死的数据不能随意改变
            if (data[key]['menu_route']=='admin' || data[key]['menu_route']=='Gauge' || data[key]['menu_route']=='Consultation') {
               arr.push(data[key].sort);
            }
          }
          arr.sort(that.sortnumber);
          arr.map(item => {
            for (var key in data) {
              if (item == data[key]["sort"]) {
               navbardata.push(data[key]);
              }
            }
          });
           that.navbardata=navbardata
          // 刷新匹配路由渲染当前状态路由,根据当前路由匹配左侧菜单栏双向状态改变

          var index1;
          // console.log(that.$route)
          that.navbardata.map((item, index) => {
            // console.log(that.$route.path.indexOf(item["menu_route"]));
            if (that.$route.path.indexOf('/'+item["menu_route"]+'/') !== -1) {
              index1 = index;
            }
            if (that.$route.path=='/'+item["menu_route"]) {
              // 如果第一级路径相同就覆盖 
               index1=index
            }
          });
          for (var key in that.navbardata) {
            keys.push(key);
            var obj={}
            obj["menu_name"]=that.navbardata[key]["menu_name"]
            obj['icon']=that.navbardata[key]["icon"]
            leftdata.push(obj);
          }
            that.leftdata=leftdata
            that.keys=keys
          that.showright(index1);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showright(index,el) {
      let right = this.navbardata[this.keys[index]];
      this.title = right["menu_name"];
      this.icon = right["icon"];
      this.rightdata = right["items"];
      this.domIindex = index;
      // if (right["items"].length == 0) {
      //   console.log(right["menu_route"]);
      //   this.rout(right["menu_route"]);
      //   this.$refs.nav.style.width = "80px";
      //   this.rightflag = false;
      // } else {
      //   this.$refs.nav.style.width = "220px";
      //   this.rightflag = true;
      // }
    
    },
      rout(value) {
      this.$router.push("/" + value);
    },
    // 封装函数树节点转化为扁平
      NestedToFlat(group) { 
        var res = []
        var that = this
        for(var key in group ){
             res.push(group[key])
          if (group[key]['items'].length!==0) {
            res = res.concat(that.NestedToFlat(group[key]['items']));
          }
        }
        return res;
      },
        },
};
</script>

<style lang="scss" scoped>
.scrren{
  flex: 1;
}
.top1 {
  height: 90px;
  //  border-bottom: 1px solid #BDC0C3;
  padding-left: 0.24rem;
  padding-top: 18px;
  background-color: #ffffff;
  box-shadow: #bdc0c3 1px 1px 10px;
  display: flex;
  font-size: 0.06rem;
  > .left {
    display: inline-block;
    width: 75px;
    text-align: center;
  }
  > .right {
    display: inline-block;
    flex: 1;
    > .help {
      margin-bottom: 10px;
      > span {
        margin-right: 0.04rem;
      }
    }
    > .dear {
      margin-bottom: 10px;
    }
    > .btn {
      background-color: #fff;
    }
  }
}
.font {
  font-size: 50px;
}
.box {
  margin: 20px;
  color: #fff;
  > .box1 {
    position: relative;
    // display: flex;
    > .box11 {
      cursor: pointer;
      width:100%;
      padding: 10px 0;
      background-color: #D8DAD9;
      flex: 3;
    h4{
      text-align: center;
      margin: 5px 0;
      font-size: 16px;
      
    }
      p{

          width: 80%;
          margin: 0 auto;
          font-size: 14px;
      }
    }
    > .box22 {
      cursor: pointer;
      position: relative;
      padding: 10px 0;
      width: 100%;
      background-color: #BDD8E1;
      overflow: hidden;
      // flex: 1;
      text-align: center;
      line-height: 362px;
      font-size: 30px;
      > .a1,
      .a2 {
        width: 100%;
        height: 110px;
      }
      > .a1 {
        position: absolute;
        top: 0;
      }
      > .a2 {
        position: absolute;
        top: 110px;
      }
    }
  }
  > .box2 {
    margin-top: 15px;
    height: 230px;
    // display: flex;
    font-size: 0.2rem;

    > .box33 {
      margin: 20px 0;
      height: 80px;
      background-color: #0099cc;
      cursor: pointer;
      line-height: 80px;
      text-align: center;
      span{
        margin-right: 0.15rem;
        font-size: 30px;
      }
     
    }
     > .box11:nth-child(1) {
      cursor: pointer;
      width:100%;
      padding: 10px 0;
      background-color: #D8DAD9;
      flex: 3;
    h4{
      text-align: center;
      margin: 5px 0;
      font-size: 16px;
      
    }
      p{

          width: 80%;
          margin: 0 auto;
          font-size: 14px;
      }
    }
  }
}
</style>