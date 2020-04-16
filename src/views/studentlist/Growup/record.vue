<template>
  <div class="main">
    <div class="top1">
      <div class="left">
        <img src="../../../assets/2018-12-28_153635.png" alt style="width:50px;height:50px;">
      </div>
      <div class="right">
        <div class="help">
          <span>XXX</span>
          <i>&nbsp;使用帮助</i>
        </div>
        <div class="dear">亲爱的xxx,欢迎登陆心理管理系统</div>
        <div class="btn">点击下方磁片。快捷进入相应的办公界面</div>
      </div>
    </div>
    <div class="body">
          <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top"  color="#C0D3E1" size="large" icon="el-icon-more" type='primary' >
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
          <el-timeline-item timestamp="2018/4/12" placement="top"  color="#C0D3E1" size="large">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
          <el-timeline-item timestamp="2018/4/12" placement="top"  color="#C0D3E1" >
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
             <el-timeline-item timestamp="2018/4/12" placement="top"  color="#C0D3E1" >
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
             <el-timeline-item timestamp="2018/4/12" placement="top"  color="#C0D3E1" >
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import headson from "../../../components/headson";

export default {
  data() {
    return {
      headson: ["学生评价", "学生评价信息"],
      activities2: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more"
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87"
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large"
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46"
        }
      ]
    };
  },
  // 头部组件信息
  components: {
    headson: headson
  }
};
</script>

<style scoped lang='scss'>
.top1 {
  height: 112px;
  //  border-bottom: 1px solid #BDC0C3;
  padding-left: 24px;
  padding-top: 18px;
  background-color: #ffffff;
  box-shadow: #bdc0c3 1px 1px 10px;
  > .left {
    display: inline-block;
    width: 75px;

    text-align: center;
  }
  > .right {
    display: inline-block;
    > .help {
      margin-bottom: 10px;
      > span {
        margin-right: 40px;
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
.body{
    width: 59%;
    margin-top: 100px;
    margin-left: 50%;
    transform: translateX(-40%);
     .el-timeline-item{
         width: 300px;
         height: 100px;
        
     }
 
}
</style>