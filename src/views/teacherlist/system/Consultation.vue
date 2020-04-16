<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->

    <div class="data">
      <table class="a1">
        <tr>
          <td>预约期限：</td>
          <td>
            <el-input v-model="data.input" placeholder="eg:7天" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>距离咨询前几分钟不可预约：</td>
          <td>
            <el-input v-model="data.input" placeholder="eg:7分钟" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>来访者每周最多可以预约次数：</td>
          <td>
            <el-input v-model="data.input" placeholder="eg:7天" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>测前资料完善许可：</td>
          <td>
            <el-input v-model="data.input" placeholder="eg:7天" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>预约前测的天数及量表：</td>
          <td>
            <el-input v-model="data.input" placeholder="eg:7天" style="width:145px"></el-input>
            <el-select v-model="data.value" placeholder="请选择" style="width:150px">
              <el-option
                v-for="item in data.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>本学期/年开始:</td>
          <td>
               <el-date-picker
               style="width:300px"
      v-model="data.value4"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>学期/年最大咨询次数：</td>
          <td>
                          <span class="iconfont icon-question-circle-fill"></span>

            <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>咨询限制设置：：</td>
          <td>
                          <span class="iconfont icon-question-circle-fill"></span>

            <el-radio-group v-model="data.input">
              <el-radio label="提交"></el-radio>
              <el-radio label="审核"></el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>首诊咨询师负责制设置许可：</td>
          <td>
            <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
        <tr>
          <td>预约反馈许可：</td>
          <td>
            <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
        <tr>
          <td>新预约许可：</td>
          <td>
            <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
        <tr>
          <td>访客留言开放：</td>
          <td>
            <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
        <tr>
          <td>预约自动确认：</td>
          <td>
            <el-switch v-model="data.value5" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
        </tr>
        <tr>
          <td>在线咨询QQ号：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input>
            <span class="iconfont icon-question-circle-fill"></span>
          </td>
        </tr>
         <tr>
          <td>短信模板编辑：</td>
          <td>
                          <span class="iconfont icon-question-circle-fill"></span>

            <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input>
          </td>
        </tr>
         <tr>
          <td>预约协议：</td>
          <td>
            <el-input v-model="data.input" placeholder="可以留空" style="width:300px"></el-input>
            <span class="iconfont icon-question-circle-fill"></span>
          </td>
        </tr>
         <tr>
          <td>预约关闭说明：</td>
          <td>
            <el-input v-model="data.input" placeholder="填写内容即关闭，留空则开放" style="width:300px"></el-input>
            <span class="iconfont icon-question-circle-fill"></span>
          </td>
        </tr>
         <tr>
          <td>紧急联系方式：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input>
            <span class="iconfont icon-question-circle-fill"></span>
          </td>
        </tr>
         <tr>
          <td>咨询中心简介图：</td>
          <td>
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
          <td>咨询中心简介内容：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input>
            <span class="iconfont icon-question-circle-fill"></span>
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
      headson: ["咨询参数设置", "有关咨询的参数设置"],
      data: {
        // value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value4:"",
        input: "",
        value5: "100",
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          }
        ]
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
        width: 250px;
        vertical-align: center;
        text-align: right;

      }
      td:nth-child(2) {
          margin-right: 400px;
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
  top: 20px;
  color: gray;
  border: 1px solid #dfd7d7;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>