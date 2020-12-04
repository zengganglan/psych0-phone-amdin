<template>
  <div>
    <div class="phone-top">
      <ul>
        <li>
          <span class="iconfont icon-menu" @click="sendmsg"></span>

        </li>
        <li>{{$store.state.navdata['title']}}</li>
        <li>
          <el-dropdown :hide-on-click="false" trigger="click" placement="top-start">
            <span class="el-dropdown-link">
              <i class="iconfont icon-shezhi"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>
                <i style="vertical-align:top">{{role.name}}</i>
                <!-- <el-popover
                  placement="right"
                  width="250"
                  trigger="click"
                  v-model="visible2"
                  class="iconfont"
                >
                  <div class="icon1">
                    <span class="iconfont icon-x" @click="visible2 = false"></span>
                  </div>
                  <div class="headimg">
                    <vueCropper
                      style="width: 50%;height: 150px;margin-left: 5%;margin-top: 15px"
                      ref="cropper"
                      :img="option.imgsrc"
                      :outputSize="option.outputSize"
                      :outputType="option.outputType"
                      :info="option.info"
                      :canScale="option.canScale"
                      :autoCrop="option.autoCrop"
                      :autoCropWidth="option.autoCropWidth"
                      :autoCropHeight="option.autoCropHeight"
                      :fixed="option.fixed"
                      :fixedNumber="option.fixedNumber"
                    ></vueCropper>
                    <ul>
                      <li>
                        <input
                          style="margin-left: 20px;margin-top: 15px"
                          id="file_input"
                          type="file"
                          capture="camera"
                          ref="file_input"
                          @change="fileChange($event)"
                        >
                        <i @click="cutimg" class="choose">选择图片</i>
                      </li>
                      <li>
                        <input type="button" value="保存" @click="cutimg" class="cutimg">
                      </li>
                    </ul>
                    <div class="newimg">
                      <img :src="newimgsrc" alt>
                    </div>
                  </div>
                  <el-button slot="reference">
                    <img :src="newimgsrc" alt class="showimg">
                  </el-button>
                </el-popover> -->
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span  @click.stop="goIndex" style="margin-left:5px ">
 <span class="iconfont icon-yemian" style="font-size:16px" ></span>首页
                </span>
               
              </el-dropdown-item>
              <el-dropdown-item divided>
             
                  <el-button @click="gomessage">
                    <el-badge :value="message" :max="99" class="item">
                      <el-button size="small">
                        <span class="tx">
                          <span class="iconfont icon-yunpingtai_shouye-tixing" style="font-size:22px"></span>
                          提醒
                        </span>
                      </el-button>
                    </el-badge>
                  </el-button>              
              </el-dropdown-item>
              <!-- <el-dropdown-item divided>
                <span class="iconfont icon-bangzhu-"></span>
                <span class="help">帮助</span>
              </el-dropdown-item> -->
              <el-dropdown-item divided>
                <span class="iconfont icon-daochu daochu" @click="first">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Cookies from "js-cookie";

import { VueCropper } from "vue-cropper";
export default {
  data() {
    return {
      message:'',
      shownav: false,
      navtitle:"",
      navicon:"",
      role: "",
      // 上传头像
      option: {
        imgsrc: "", //裁剪图片的地址
        info: true, //裁剪框的大小信息
        outputSize: 0.7, // 裁剪生成图片的质量
        outputType: "jpeg", //裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 100, // 默认生成截图框宽度
        autoCropHeight: 100, // 默认生成截图框高度
        fixed: false, //是否开启截图框宽高固定比例
        fixedNumber: [4, 4] //截图框的宽高比例
      },
      status: "",
      cropper: false,
      newimgsrc: "",
      visible1: false,
      visible2: false,
      visible3:false,
    
   
      multipleSelection: [],
     
    };
  },
  mounted() {
    this.newimgsrc = this.$store.state.userInfo.name;
    var role = this.$store.state.userInfo;
    if (typeof role == "string") {
      role = JSON.parse(role);
    }
    this.role = role;
    
  },
  //判断用户和管理员不同的登录首页
  
  created(){
      // 判断是还是普通管理员还是超级管理员1和3两个值
     this.$root.Bus.$on('setright', (content) => { 
       console.log(content)
       this.navtitle = content['title'];
       this.navicon=content['icon']
    });
        this.getmesage(1, 20);
        

  },
  methods: {
    goschool(){
    var role = JSON.parse(Cookies.get("role"));
    console.log(role)
      if (role["type"] == 1) {
        if (role["college_name"]) {
          // 学校超管？注册时一定会选学校
          this.$router.push({ path: "/admin/teacherindex/teacherschool" });
        } else {
          //  总超管
          // this.$router.push({ path: "/school/localadminschool" });
             this.$message('系统超管用户请从pc端登录')

        }
      } else if (role["type"] == 3) {
        // 学校普通学生用户
         this.$router.push({
                  path: "/Evaluation/studentindex/studentschool"
                });
      }
  },
       getmesage(currentpage, pagesize) {
      var that = this;
      this.axios
        .post("/api/v1/mail/list?filter=" + this.filter, {
          page: currentpage,
          size: pagesize
        })
        .then(function(res) {
          that.message = res["data"]["data"]["total"];
        });
    },
    gomessage(){
      this.$router.push({path:'/schools/message'})
    },
    sendmsg() {
      // 不需要左侧菜单栏
      // this.shownav = !this.shownav;
      // this.$root.Bus.$emit("setMsg", this.shownav);
      this.goschool()
    },
    goIndex() {
      console.log(1111111)
      this.goschool()

    },
    first() {
      this.$router.push({ path: "/login" });
    },
    fileChange(e) {
      var that = this;
      //上传图片
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onload = function(e) {
          that.option.imgsrc = e.target.result;
          // Indicator.close();
          console.log(that.option.imgsrc, e.target);
          // 开始裁剪
          that.cropper = true;
        };
      }
    },
    // 裁剪方法
    cutimg() {
      this.$refs.cropper.startCrop();
      this.$refs.cropper.getCropData(data => {
        this.newimgsrc = data;
        // 提交头像到后台，如果返回信息这弹出框成功

        //清除截图
        this.$refs.cropper.clearCrop();
        this.visible2=false;
        //  this.cropper=false;
      });
    },
   
  },
  components: {
    VueCropper
  }
};
</script>

<style lang="scss" scoped>
.daochu {
  cursor: pointer;
}

.a2 {
  position: relative;
  height: 30px;
  .icon-x {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #5b85ab;
    font-weight: 800;
  }
}
.bor {
  border-radius: 20px;
  border: 1px solid #fff;
}
.headimg {
 
  ul {
    width: 65%;
    display: flex;
    justify-content: space-between;
    font-size: 12px;

    li:nth-child(1) {
      position: relative;

      input[type="file"] {
        opacity: 0;
        width: 50px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
        z-index: 3;
      }
      .choose {
        display: inline-block;
        background-color: #a4c2ff;
        width: 50px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        margin-left: 20px;
        margin-top: 15px;
        line-height: 30px;
        text-align: center;
        border-radius: 10px;
      }
    }
    li:nth-child(2) {
      position: relative;
      .cutimg {
        background-color: #a4c2ff;
        width: 50px;
        height: 30px;
        margin-top: 15px;
        line-height: 30px;
        text-align: center;
        border-radius: 10px;
      }
    }
  }
  .newimg {
    position: absolute;
    top: 60px;
    right: 40px;
    width: 100px;
    height: 100px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.icon-trash {
  font-size: 30px;
}

.icon1 {
  position: relative;
  height: 30px;
  span {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #5b85ab;
  }
}

// 手机端 把a1 隐藏 显示phone-top
.phone-top {
  display: block;
  padding: 0 10px;
  height: 40px;
  background-color: #d8dcdd;

  ul {
    display: flex;
    li {
      flex: 1;
      line-height: 40px;
      span {
        display: inline-block;
        height: 40px;
        width: 40px;
        font-size: 22px;
        cursor: pointer;
      }
    }
    li:nth-child(3) {
      text-align: right;
    }

    li:nth-child(2) {
      text-align: center;
    }
  }
}
</style>