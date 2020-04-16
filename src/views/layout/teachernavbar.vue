
    <template>
  <div class="nav" ref="nav" v-show="shownav">
    <ul class="left">
      <li
        v-for="(value,index) in leftdata"
        :key="index"
        :class="{firstnav:index==domIindex}"
        @click="showright(index,$event)"
        ref="dom"
      >
        <span>{{value}}</span>
      </li>
    </ul>

    <ul class="right" v-show="rightflag">
      <li>
        <ul>
          <el-row class="tac">
            <el-col :span="12">
              <h5>
                <i :class=" 'iconfont '+icon"></i>
                {{title}}
              </h5>
              <el-menu
                :default-active="this.$route.path"
                class="el-menu-vertical-demo"
                @select="handleOpen"
                @close="handleClose"
                background-color="#303240"
                text-color="#5F8BE4"
                active-text-color="#fff"
                router
              >
            
                <div v-for="(value,index) in rightdata" :key="index">
                  <el-menu-item :index="'/'+value['menu_route']+''" v-if="value['items'].length==0">
                    <span slot="title">{{value['menu_name']}}</span>
                  </el-menu-item>
                  <el-submenu :index="value['id']+''" v-else>
                    <template slot="title">
                      <span>{{value['menu_name']}}</span>
                    </template>
                    <el-menu-item-group
                      v-for="(valueson,indexson) in value['items']"
                      :key="indexson"
                    >
                      <el-menu-item :index="'/'+valueson['menu_route']+''">{{valueson['menu_name']}}</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </div>
              </el-menu>
            </el-col>
          </el-row>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
// import test from "../../vendor/test";
import { global } from "../../global/global";

export default {
  name: "Navbar",
  data() {
    return {
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
    };
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
      this.$root.Bus.$emit("setright", content);
      },
  },
  created(){
       this.$root.Bus.$on('setMsg', content => { 
       console.log(content)
       this.shownav = content;
    });
  },
  beforeMount() {
    this.navbardata1();
  },
  methods: {
     getpermission(){
      //  把所有按钮权限放在一个数组里
     },
    handleOpen(key, keyPath) {
      this.shownav=false;
      // console.log(key, keyPath,this.$route.path);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    sortnumber(a, b) {
      return a - b;
    },
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
             //2根据flag在树形接口过滤掉权限规则，如果当前对象的item里面子数据只要有一个flag为0就把把当前对象设置为空数组[]
          function a(group,obj) {
            for (var key in group) {              
                if (group[key]["items"].length !== 0) {
                  for(var key1 in group[key]["items"]){
                    if (group[key]["items"][key1]['flag']==0) {
                      group[key]["items"]=[]
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
          that.navbardata.map((item, index) => {
            console.log(that.$route.path.indexOf(item["menu_route"]));
            if (that.$route.path.indexOf('/'+item["menu_route"]+'/') !== -1) {
              // console.log(item["menu_route"], index);
              index1 = index;
            }
            if (that.$route.path=='/'+item["menu_route"]) {
              // 如果第一级路径完全相同就覆盖 
               index1=index
            }
          });
          // console.log(that.navbardata, index1);
          for (var key in that.navbardata) {
            keys.push(key);
            leftdata.push(that.navbardata[key]["menu_name"]);
          }
            that.leftdata=leftdata
            that.keys=keys
            // 主要是根据索引找二级菜单栏
          that.showright(index1);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showright(index) {
      let right = this.navbardata[this.keys[index]];
      console.log(right);
      this.title = right["menu_name"];
      this.icon = right["icon"];
      this.rightdata = right["items"];
      console.log(this.rightdata);
      this.domIindex = index;
      if (right["items"].length == 0) {
        console.log(right["menu_route"]);
        this.rout(right["menu_route"]);
        this.$refs.nav.style.width = "80px";
        this.rightflag = false;
      } else {
        this.$refs.nav.style.width = "220px";
        this.rightflag = true;
      }
    },
    rout(value) {
      // console.log(key,value);
      console.log(value);
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
    findroute(arr, pid) {
      var that = this;
      for (var key in arr) {
        if (arr[key]["id"] == pid) {
          if (arr[key]["pid"]) {
            pid = arr[key]["pid"];
            return that.findroute(arr, pid);
          } else {
            var id = arr[key]["id"];
            // console.log(arr[key]['id'])
            return id;
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>



 h5 {
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size:18px;
  border-bottom: 1px solid #727272;
  color: white;
  background-color: rgb(48, 50, 64);
  i {
    font-size: 20px;
  }
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
  width: 140px;
}
.el-menu-item {
  height: 60px;
}
.el-menu-item-group__title {
  padding: 0;
  line-height: 0;
}
.nav {
  width: 220px;
  // height: 1250px;
  background-color: #21212d;
  position: relative;
  // overflow: hidden;

  > .left {
    z-index: 2;
    position: absolute;
    width: 80px;
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
    width: 140px;
    margin-left: 80px;
    background-color: rgb(48, 50, 64);
    height: 100%;
  }
}
</style>