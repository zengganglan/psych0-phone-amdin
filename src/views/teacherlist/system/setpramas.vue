<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->

    <div class="data">
      <table class="a1">
        <tr>
          <td>二维码管理：</td>
          <td>
            <span class="iconfont icon-qrcode"></span>
            <span class="iconfont icon-qrcode"></span>
            <span class="iconfont icon-qrcode"></span>
          </td>
        </tr>
        <tr>
          <td>系统类型：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入机构类型，如演示中学" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>系统标题：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>首页LOGO：</td>
          <td>
                <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->

            <el-input
              v-model="data.input"
              placeholder="请输入机构类型，如演示中学"
              style="width:265px"
              type="file"
            ></el-input>
            <input type="button" value="提交" style="width:30px">
        
          </td>
        </tr>
        <tr>
          <td>基本信息修改许可：</td>
          <td>
            <el-tooltip :content="'Switch value: ' + data.value5" placement="top">
              <el-switch
                v-model="data.value5"
                active-color="#13ce66"
                active-value="100"
                inactive-value="0"
                inactive-color="#ff4949"
              ></el-switch>
            </el-tooltip>
          </td>
        </tr>
        <tr>
          <td>自注册审核许可</td>
          <td>
            <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
        <tr>
          <td>文本编辑手机号：</td>
          <td>
              <span class="iconfont icon-question-circle-fill"></span>
             <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>微信绑定许可：</td>
          <td>
            <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
        <tr>
          <td>数据对接秘钥：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>自定义来访组：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input>
          </td>
        </tr>
      </table>
    </div>
    <div class="add">提交</div>
  </div>
</template>

<script>
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";

export default {
  data() {
    return {
      headson: ["系统参数设置", "有关系统的参数设置"],
      data: {
        input: "",
        value5: "100"
      }
    };
  },
  created() {},
  methods: {},

  components: {
    headson: headson,
    pagination: pagination
  }
};
</script>

<style scoped lang="scss">
.work {
  width: 90%;
  margin: 0 auto;
  span {
    display: inline-block;
    float: right;
    width: 60px;
    height: 20px;
    background-color: #ffffff;
    font-size: 12px;
    text-align: center;
    line-height: 15px;
    border-radius: 5px;
    border: 1px solid #9f9a9b;
    cursor: pointer;
    i {
      font-size: 20px;
      position: relative;
      top: 3px;
    }
  }
  span:nth-child(1) {
    margin-left: 20px;
  }
}
.pages {
  margin: 0 50px;

  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  // float: right;
  height: 100px;
}

.data {
  min-height: 640px;
  border: 1px solid #e6e6e8;
  margin: 0 50px;
  margin-top: 30px;
  background-color: #ffffff;
  .a1 {
    width: 100%;
    tr {
      height: 50px;
      border-bottom: 1px dashed #9f9a9b;
      td:nth-child(1) {
        width: 200px;
        vertical-align: center;
        text-align: right;
      }
      td:nth-child(2) {
        vertical-align: center;
        text-align: right;
        padding-right: 100px;
      }
    }
  }
}
.add,
.complete {
  width: 310px;
  height: 25px;
  margin: 0 auto;
  text-align: center;
  line-height: 25px;
  position: relative;
  top: -50px;
  color: gray;
  border: 1px solid #dfd7d7;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>