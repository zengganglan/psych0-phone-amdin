


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
              <!-- bug :default-active="$route.path"
 -->
              <el-menu
                class="el-menu-vertical-demo"
                @select="handleOpen"
                @close="handleClose"
                background-color="#303240"
                text-color="#5F8BE4"
                active-text-color="#fff"
                :router='true'
              >
                <!--                     @click="rout(value['name'])"
                -->
                <div v-for="(value,index) in rightdata" :key="index">
                  <el-menu-item :index="'/'+value['uri']" v-if="value['items'].length==0" @click="hanselect(index)" :class="{active:'/'+value['uri']==$route.path}">
                    <span slot="title">{{value['menu_name']}}</span>
                  </el-menu-item>
                  <el-submenu :index="value['uri']+''" v-else>
                    <template slot="title">
                      <span>{{value['menu_name']}}</span>
                    </template>
                    <el-menu-item-group
                      v-for="(valueson,indexson) in value['items']"
                      :key="indexson"
                    >
                      <el-menu-item :index="'/'+valueson['uri']+''">{{valueson['menu_name']}}</el-menu-item>
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
import navbar from "../../vendor/navbar";
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
      routename:"",
    };
  },
  watch:{
     $route(){
       this.handleOpen(this.routename)
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
  mounted() {
    this.navbardata1();
       this.$root.Bus.$on('setMsg', content => { 
       console.log(content)
       this.shownav = content;
    });
  },
  methods: {
    hanselect(event){
    },
    handleOpen(key) {
       this.routename=key
             this.shownav=false;
       
      console.log(key,this.$route.path);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    sortnumber(a, b) {
      return a - b;
    },
    navbardata1() {
      var that = this;
       var data = navbar
          // 根据sort排序 数组不会影响顺序
          var arr = [];
          for (var key in data) {
            // 手机版只显示固定栏目，数据库路由是配合前端写死的数据不能随意改变
            if (data[key]['uri']=='Evaluation') {
               arr.push(data[key].sort);
            }
            // arr.push(data[key].sort);
          }
          arr.sort(that.sortnumber);
          arr.map(item => {
            for (var key in data) {
              if (item == data[key]["sort"]) {
                that.navbardata.push(data[key]);
              }
            }
          });
          // 刷新匹配路由渲染当前状态路由,根据当前路由匹配双向状态改变

          var index1;
          that.navbardata.map((item, index) => {
            console.log(that.$route.path.indexOf(item["uri"]));
            if (that.$route.path.indexOf(item["uri"]) !== -1) {
              console.log(item["uri"], index);
              index1 = index;
            }
          });
          console.log(that.navbardata, index1);

          for (var key in that.navbardata) {
            that.keys.push(key);
            that.leftdata.push(that.navbardata[key]["menu_name"]);
          }

          that.showright(index1);
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
        console.log(right["uri"]);
        this.rout(right["uri"]);
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
    creatdata(nodes, treerootId) {
      var groups = {};
      for (var i in nodes) {
        // 不是根节点
        if (!groups[nodes[i].pid]) {
          groups[nodes[i].pid] = [];
        }
        groups[nodes[i].pid].push(nodes[i]);
      }
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
.active{
  color: #fff;
}

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