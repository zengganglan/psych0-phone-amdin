<template>
  <div class="main">
    <!-- 头部 -->
    <!-- <headson :headson="headson"></headson> -->
    <!-- tab栏目 -->
    <div class="tab">
      <ul>
        <li
          v-for="(item,index) in tabls"
          :class="{tabactive:tabindex-1==index}"
          :key="index"
          @click="tab(index)"
        >{{item}}</li>
      </ul>
    </div>
    <ul>
      <li class="data1" v-if="tabindex==1">
        <div class="luru">学生资料</div>

        <table class="a1">
          <table class="a1">
            <tr>
              <td>ID：</td>
              <td>
                <span>{{detail.user_id}}</span>
              </td>
            </tr>
            <!-- <tr>
              <td>账号：</td>
              <td>
                <span>{{detail.account}}</span>
              </td>
            </tr>-->

            <tr class v-if="!disabledInput">
              <td>密码：</td>
              <td>
                <template>
                  <input type="password" placeholder="英文大小写，数字，符号 4-20位" v-model="values.password" />
                  <span>*</span>
                </template>
              </td>
            </tr>
            <tr class v-if="!disabledInput">
              <td>确认密码：</td>
              <td>
                <template>
                  <input
                    type="password"
                    placeholder="英文大小写，数字，符号 4-20位"
                    v-model="values.repassword"
                  />
                  <span>*</span>
                </template>
              </td>
            </tr>
            <!-- <tr class>
              <td>学号：</td>
              <td>
                <template>
                  <input type="text" placeholder="学号" v-model="detail.job_num"  v-bind:disabled="disabledInput" />
                  <span>*</span>
                </template>
              </td>
            </tr>-->
            <tr class>
              <td>姓名：</td>
              <td>
                <input
                  type="text"
                  placeholder="请输入姓名"
                  v-model="detail.name"
                  v-bind:disabled="disabledInput"
                />
              </td>
            </tr>
            <tr class>
              <td>性别：</td>
              <td>
                <template>
                  <input
                    type="button"
                    name="sex1"
                    value="男"
                    ref="sex1"
                    @click="checkSex($event)"
                    :style="{'backgroundColor':values.sex==1? '#5bb95a':''}"
                    v-bind:disabled="disabledInput"
                  />
                  <input
                    name="sex2"
                    type="button"
                    value="女"
                    @click="checkSex($event)"
                    ref="sex2"
                    :style="{'backgroundColor':values.sex==0? '#5bb95a':''}"
                    v-bind:disabled="disabledInput"
                  />
                  <span>*</span>
                </template>
              </td>
            </tr>
            <tr class>
              <td>出生日期：</td>
              <td>
                <template>
                  <el-date-picker
                    v-model="detail.birth_date"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    v-bind:disabled="disabledInput"
                  ></el-date-picker>
                </template>
              </td>
            </tr>
            <tr class>
              <td>身份证号：</td>
              <td>
                <input
                  type="text"
                  placeholder="18位身份证号"
                  v-model="detail.id_card"
                  v-bind:disabled="disabledInput"
                />
              </td>
            </tr>
            <tr class>
              <td>手机：</td>
              <td>
                <input
                  type="text"
                  placeholder="请输入手机号"
                  v-model="detail.phone"
                  v-bind:disabled="disabledInput"
                />
              </td>
            </tr>

            <!-- <tr class>
              <td>班级组别：</td>
              <td>
                <input type="text" placeholder="" v-model="gradename" v-bind:disabled="disabledInput" v-if="disabledInput">
                <template v-else>
                  <div class="schoolcheck">
                    <schoolcheck ref="schoolcheck" :inputName="gradename"></schoolcheck>
                    <span>*</span>
                  </div>
                </template>
              </td>
            </tr>-->

            <!-- <tr class>
              <td>住址：</td>
              <td>
                <input type="text" placeholder="请输入住址" v-model="detail.address" v-bind:disabled="disabledInput" />
              </td>
            </tr>-->
            <tr class>
              <td></td>
              <td>
                <template>
                  <div>
                    <div
                      :style="{ 'text-align': 'center','width':'200px','vertical-align':'center'}"
                    >带*必填</div>

                    <input
                      type="button"
                      value="修改"
                      class="add1"
                      @click="changedisable"
                      v-if="disabledInput"
                    />
                    <input
                      type="button"
                      value="保存"
                      class="add"
                      @click="setstudent"
                      style="color:#fff;cursor:pointer" 
                      v-else
                    />

                    <input type="button" value="返回" class="return" @click="returnback" />
                  </div>
                </template>
              </td>
            </tr>
          </table>
        </table>
        <div class="a2" v-if="toux">
          <div class="xs">(上传图片不超过200k,800*600像素内)</div>

          <div class="headimg">
            <vueCropper
              style="width: 200px;height: 200px"
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
                />
                <!-- <input type="button" value="选择图片" class="choose"> -->
                <i @click="cutimg" class="choose">选择图片</i>
              </li>
              <li>
                <input type="button" value="保存" @click="cutimg" class="cutimg" />
              </li>
            </ul>

            <div class="newimg">
              <div>图片：</div>
              <img :src="newimgsrc" alt />
            </div>
            <div class="personone">个人简介:</div>
          </div>
        </div>
      </li>
      <li class="data2" v-else-if="tabindex==2">
        <div class="luru">参数设置</div>
        <fieldset class="a2">
          <table width="100%">
            <tbody>
              <tr>
                <td>1、民族</td>
                <td>
                  <input type="text" class="text" name="q_1" v-model="user_ext['nation']" />
                </td>
               
              </tr>
              <tr>
                 <td>2、父亲年龄</td>
                <td>
                  <input type="number" class="text" name="q_2" v-model="user_ext['father_age']" />
                </td>
              </tr>
              <tr>
                <td>3、父亲职业</td>
                <td>
                  <input type="text" class="text" name="q_3" v-model="user_ext['father_job']" />
                </td>
               
              </tr>
              <tr>
                 <td>4、如果父亲不在世，请问发生在___岁时。（父亲健在的不填写）</td>
                <td>
                  <input type="number" class="text" name="q_4" v-model="user_ext['father_die_age']" />
                </td>
              </tr>
              <tr>
                <td>5、母亲年龄</td>
                <td>
                  <input type="number" class="text" name="q_5" v-model="user_ext['mother_age']" />
                </td>
               
              </tr>
              <tr>
                 <td>6、母亲职业</td>
                <td>
                  <input type="text" class="text" name="q_6" v-model="user_ext['mother_job']" />
                </td>
              </tr>
              <tr>
                <td>7、如果母亲不在世，请问发生在___岁时。（母亲健在的不填写）</td>
                <td>
                  <input type="number" class="text" name="q_7" v-model="user_ext['mother_die_age']" />
                </td>
              
              </tr>
              <tr>
                  <td>8、父母婚姻状况</td>
                <td>
                  <label>
                    <el-radio-group v-model="user_ext['parent_marriage_status']">
                      <el-radio :label="1">良好</el-radio>
                      <el-radio :label="2">一般</el-radio>
                      <el-radio :label="3">较差</el-radio>
                      <el-radio :label="4">离异</el-radio>
                    </el-radio-group>
                  </label>
                </td>
              </tr>
              <tr>
                <td>9、如果父母离异的话，请问发生在___岁时。（父母未离异的不填写）</td>
                <td>
                  <input
                    type="number"
                    class="text"
                    name="q_9"
                    v-model="user_ext['parent_divorced_age']"
                  />
                </td>
               
              </tr>
              <tr>
                 <td>10、是否有寄养经历</td>
                <td>
                  <label>
                    <el-radio-group v-model="user_ext['foster_flag']">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </label>
                </td>
              </tr>
              <tr>
                <td>11、寄养时的年龄（无寄养经历的不填写）</td>
                <td>
                  <input type="number" class="text" name="q_11" v-model="user_ext['foster_age']" />
                </td>
               
              </tr>
              <tr>
                 <td>12、生源类型</td>
                <td>
                  <label>
                    <el-radio-group v-model="user_ext['stu_type']">
                      <el-radio :label="1">农村</el-radio>
                      <el-radio :label="2">城市</el-radio>
                      <el-radio :label="3">城镇</el-radio>
                      <el-radio :label="4">留学生</el-radio>
                    </el-radio-group>
                  </label>
                </td>
              </tr>
              <tr>
                <td>13、独生子女</td>
                <td>
                  <label>
                    <el-radio-group v-model="user_ext['only_child']">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </label>
                </td>
               
              </tr>
              <tr>
                 <td>14、家庭经济状况</td>
                <td>
                  <label>
                    <el-radio-group v-model="user_ext['economy']">
                      <el-radio :label="1">困难</el-radio>
                      <el-radio :label="2">不困难</el-radio>
                    </el-radio-group>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <div style="margin-top:50px;text-align:center">
            <el-button type="primary" round @click="saveinfo" >保存</el-button>
          </div>
          <input type="hidden" name="qnum" value="27" />
        </fieldset>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
import { log } from "util";
import headson from "../../../components/headson";
import schoolcheck from "../../../components/schoolcheck";
import tables from "../../../components/table";
import pagination from "../../../components/pagination";
import { global } from "../../../global/global";
import { VueCropper } from "vue-cropper";
import Cookies from "js-cookie";
import md5 from "blueimp-md5";

export default {
  data() {
    return {
      disabledInput: true,

      save: true,
      id: this.$route.query.id,
      detail: "",
      toux: false,
      user_ext: {
        nation: "",
        father_age: "",
        father_job: "",
        father_die_age: "",
        mother_age: "",
        mother_job: "",
        mother_die_age: "",
        parent_marriage_status: "",
        parent_divorced_age: "",
        foster_flag: "",
        foster_age: "",
        stu_type: "",
        only_child: "",
        economy: ""
      },
      // 上传头像
      option: {
        imgsrc: "", //裁剪图片的地址
        info: true, //裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", //裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 100, // 默认生成截图框宽度
        autoCropHeight: 100, // 默认生成截图框高度
        fixed: false, //是否开启截图框宽高固定比例
        fixedNumber: [4, 4], //截图框的宽高比例
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      status: "",
      cropper: false,
      newimgsrc: "",
      visible1: false,
      visible2: false,
      values: {
        password: "",
        repassword: "",
        name: "",
        sex: "",
        birth_day: "",
        id_card: "",
        phone: ""
      },
      gradename: "",
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },

      // 头部组件信息
      headson: ["学生资料修改", "修改学生个人资料"],

      // 切导航行栏
      tabls: ["基本信息", "扩展信息"],
      tabindex: 1
    };
  },
  watch: {},

  created() {
    console.log(this.id);
    this.baseinfo(this.id);
    console.log(this.$refs.schoolcheck1);
  },
  methods: {
    // getList获取列表数据给tableData3赋值
    getList() {
      //传递查询条件请求数据返回相应页码的数据条数 查询条件当前页码，和每页显示条数
      this.axios.post("/api/v1/admin/user/detail");
    },
    changedisable() {
      this.disabledInput = false;
    },
    //导航栏切换
    tab(index) {
      console.log(index);
      this.tabindex = index - 0 + 1;
    },
    baseinfo(id) {
      this.dialogFormVisible = true;
      console.log(id);
      var that = this;
      that.axios.get("/api/v1/user/viewDetails").then(function(res) {
        console.log(res);
        var detail = res["data"]["data"];
        // var group = res["data"]["data"]["unit_group_data"];
        // var arr = [];
        // for (var key in group) {
        //   arr.push(group[key]);
        // }
        // group = global.NestedToFlat(arr);
        // console.log(group);
        // group.map(function(item, index) {
        //   if (item.id == detail.unit_group) {
        //     that.gradename = item.name;
        //     return (detail.unit_group = item.name);
        //   }
        // });
        for (var key in res["data"]["data"]) {
          that.user_ext[key] = res["data"]["data"][key];

          if (!isNaN(res["data"]["data"][key] - 0)) {
            that.user_ext[key] = res["data"]["data"][key] - 0;
          }
        }
        that.values.sex = detail.sex;
        detail["except"] = detail.auth_group_id;
        detail["birth_day"] = detail.birth_date;
        console.log(detail);
        that.detail = detail;
        Cookies.set("detail", detail);
      });
    },
    saveinfo() {
      console.log(11111);
      var form = {};
      var that = this;
      var data = JSON.parse(Cookies.get("detail"));
      for (var key in that.user_ext) {
        if (that.user_ext[key] && that.user_ext[key] !== data[key]) {
          // console.log(that.user_ext[key], data[key]);
          form[key] = that.user_ext[key];
        }
      }
      that.axios.post("/api/v1/user/saveExtInfo", form).then(function(res) {
        console.log(res);
        if (res["data"]["code"] == 0) {
          that.$message("编辑学生扩展信息成功");
          // that.disabledInput = true;
        } else {
          that.$message(res["data"]["msg"]);
        }
      });
    },
    setstudent() {
      this.values.password;
      this.values.repassword;
      this.values.name = this.detail.name;
      this.values.sex;
      this.values.birth_day = this.detail.birth_date;
      this.values.id_card = this.detail.id_card;
      this.values.phone = this.detail.phone;
      this.values.sex = this.values.sex + ""; //判断需要把数字变成字符串 避免是0为false
      var that = this;
      var obj = {};
      console.log(this.values);
      var data = JSON.parse(Cookies.get("detail"));
      if (this.values.password || this.values.repassword) {
        if (this.values.password !== this.values.repassword) {
          this.$message("两次输入密码不相同");
          return;
        }
        if (
          this.values.password.length < 4 ||
          this.values.password.length > 20
        ) {
          this.$message("密码字符集在4到20区间，请输入正确的位数");
          return;
        } else {
          this.values.password = md5(this.values.password);
          this.values.repassword = md5(this.values.repassword);
        }
      }

      for (var key in this.values) {
        if (this.values[key] && this.values[key] !== data[key]) {
          console.log(this.values.password, this.values.repassword, obj);

          obj[key] = this.values[key];
        }
      }
      console.log(this.values.password, this.values.repassword, obj);
      if (JSON.stringify(obj) == "{}") {
        return;
      }

      that.axios.post("/api/v1/user/saveBaseInfo", obj).then(function(res) {
        console.log(res);
        if (res["data"]["code"] == 0) {
          that.$message("编辑学生基本信息成功");
          // that.disabledInput = true;
        } else {
          that.$message(res["data"]["msg"]);
        }
      });
    },

    // 返回上一级页面
    returnback() {
      this.$router.go(-1);
    },
    checkSex(event) {
      var sex = event.target.value;
      if (sex == "男") {
        this.values.sex = 0;
        console.log(this.values.sex, this.values.group);
      } else {
        this.values.sex = 1;
      }
      (this.$refs.sex1.style.backgroundColor = ""),
        (this.$refs.sex2.style.backgroundColor = ""),
        (event.target.style.backgroundColor = "#5bb95a");
    },
    fileChange(e) {
      var that = this;
      //上传图片
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      const isLt200k = file.size / 1024 < 200;
      if (!isLt200k) {
        this.$message.error("上传文件大小不能超过 200k!");
        return false;
      }
      if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onload = function(e) {
          that.option.imgsrc = e.target.result;
          //   Indicator.close();
          console.log(that.option.imgsrc, e.target);
          // 开始裁剪
          that.cropper = true;
        };
      }
    },
    // 裁剪方法
    cutimg() {
      var that = this;
      this.$refs.cropper.startCrop();
      this.$refs.cropper.getCropData(data => {
        this.newimgsrc = data;
        // 提交头像到后台，如果返回信息这弹出框成功
        //清除截图
        this.$refs.cropper.clearCrop();
        // this.newimgsrc=""
        this.cropper = false;
      });
    },
    saves() {
      this.save = false;
    }
  },
  components: {
    headson: headson,
    schoolcheck: schoolcheck,
    tables: tables,
    pagination: pagination,
    VueCropper: VueCropper
  }
};
</script>

<style lang="scss" scoped>
input {
  background-color: #f5f7fa;
}
// 文件上传
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  // overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
  .icon-trash {
    position: absolute;

    top: 135px;
    right: -30px;
    background-color: green;
    color: white;
    display: inline-block;
    height: 20px;
    width: 20px;
    border-radius: 5px;
    cursor: pointer;
  }
}
form {
  width: 100%;
  height: 100%;
}
.file input {
  position: absolute;
  font-size: 100px;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.navbar {
  position: absolute;
  font-size: 100px;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  // opacity: 0.7;
}
.return {
  cursor: pointer;
}
.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}

.hui {
  background-color: gray;
}
.blu {
  background-color: #169bd5;
}
.tabactive {
  color: #6998fb;
  border-bottom: 10px solid #6998fb;
}
input[type="checkbox"] {
  height: 16px;
  width: 16px;
  background-color: #f8f8fa;
  outline: none;
  border: 1px solid transparent;
  border: 2px solid #e2e2e2;
}

.main {
  .tab {
    width: 100%;
    height: 100px;
    color: #bfbfc0;
    font-size: 12px;

    background-color: #fbfbfb;
    border: 1px solid #eff2f9;
    box-shadow: #eff2f9 1px 1px 20px;
    ul {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;

      li {
        float: left;
        text-align: center;
        width: 100px;
        line-height: 100px;
        width: 174px;
        font-size: 16px;
      }
    }
  }
}
.data1 {
  margin-left: 10px;
  position: relative;
  width: 90%;
  // min-width: 650px;
  height: 650px;
  margin: 0 auto;
  margin-top: 50px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  .luru {
    border-left: 8px solid #679afa;
    color: #679afa;
    padding-left: 10px;
    font-size: 20px;
    position: absolute;
    top: -30px;
    left: 0;
  }

  .a1 {
    // width: 600px;
    // height: 600px;
    // margin: 0 auto;
    // background-color: #ffffff;
    // overflow: hidden;
    // border: 1px solid #e6e6e8;
    tr {
      color: #169bd5;
      height: 40px;
      td:nth-child(1) {
        vertical-align: right;
        text-align: right;
        width: 27%;
      }
      td:nth-child(2) {
        position: relative;
        span {
          color: red;
        }

        input,
        select {
          height: 30px;
          width: 200px;
        }
        input[type="button"] {
          width: 100px;
        }
        .schoolcheck {
          position: absolute;
          width: 200px;
          top: 0;
          height: 100%;
          z-index: 3;
          span {
            position: relative;
            left: 210px;
            top: -20px;
          }
        }
      }
    }
    tr:last-child {
      position: relative;
      top: 20px;
    }
  }
  .a2 {
    // position: absolute;
    // top: 100px;
    // right: 300px;
    position: relative;

    .xs {
      color: #169bd5;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .headimg {
      height: 100px;
      width: 300px;
      ul {
        width: 65%;
        display: flex;
        justify-content: space-between;
        li:nth-child(1) {
          position: relative;

          input[type="file"] {
            opacity: 0;
            width: 100px;
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
            width: 70px;
            height: 30px;
            position: absolute;
            left: 0;
            top: 0;
            margin-left: 20px;
            margin-top: 15px;
            line-height: 30px;
            text-align: center;
            border-radius: 20px;
          }
        }
        li:nth-child(2) {
          position: relative;
          .cutimg {
            background-color: #a4c2ff;
            width: 70px;
            height: 30px;
            margin-top: 15px;
            line-height: 30px;
            text-align: center;
            border-radius: 20px;
          }
        }
      }
      .newimg {
        font-size: 12px;
        position: absolute;
        top: 60px;
        right: -20px;
        min-width: 100px;
        min-height: 100px;
        border: 1px solid #a4c2ff;
        img {
          width: 100px;
          height: 100px;
        }
      }
    }
    .personone {
      margin-top: 20px;
      height: 200px;
      border: 1px solid #169bd5;
    }
  }
}
.data2 {
  margin-left: 10px;
  .luru {
    border-left: 8px solid #679afa;
    color: #679afa;
    padding-left: 10px;
    font-size: 20px;
  }
  .a2 {
    height: 500px;
    // width: 1200px;
    margin: auto auto;
    border: none;
    background-color: #ffffff;
    tbody {
      height: 500px;
      // border-collapse: separate;
      // padding: 20px;
      tr {
        td {
                  padding-top: 10px;

        }
      }
    }
  }
}

.add,
.bianji {
  color: #fff !important;
}
.add1 {
  background-color: #b3b3b3;
}
.add {
  background-color: #32a9ee;
}
</style>



