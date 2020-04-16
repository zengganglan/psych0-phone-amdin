<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->

    <div class="data">
      <table class="a1">
        <tr>
          <td>同表重测间隔：</td>
          <td>
  <el-select v-model="data.value" placeholder="请选择" style="width:300px">
    <el-option
      v-for="item in data.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>          </td>
        </tr>
        <tr>
          <td>无效问卷判断：</td>
          <td>
            <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
        <tr>
          <td>测试结果许可：</td>
          <td>
           <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
         <tr>
          <td>测前资料完善许可：</td>
          <td>
           <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
         <tr>
          <td>访客自测功能开发：</td>
          <td>
           <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
         <tr>
          <td>访客自由测试开发：</td>
          <td>
           <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
         <tr>
          <td>测前说明文本：</td>
          <td>
         <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input><span class="iconfont icon-question-circle-fill"></span>          </td>
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
      headson: ["测量参数设置", "有关测量的参数设置"],
      data: {
        input: "",
        value5: "100",
         options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }]
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