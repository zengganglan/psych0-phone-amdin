<template>
  <div class="main">
    <!-- <headson :headson="headson"></headson> -->
    <div>
      <div>
        <ul class="comm1">
          <li>学号：2220140063</li>
          <li>姓名：诸葛亮</li>
          <li>性别：男</li>
          <li>年龄：16</li>
          <li>个人资料</li>
        </ul>
        <div class="recomm">修改评价</div>
        <div class="type">
          <span>类型：</span>
          <select name id>
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">13</option>
            <option value="1">24</option>
          </select>
        </div>
        <div class="comments">
        学生评价内容
        </div>
        <div >
            <ul class="commcz">
                <li>允许学生查看<el-switch
  v-model="value2"
  active-color="#13ce66"
  active-text="on"
  :width="50"
  inactive-color="#ff4949">
</el-switch>
</li>
                <li>提交</li>
                <li>取消</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headson from "../../../components/headson";

export default {
  data() {
    return {
      headson: ["学生评价", "记录学生的点点滴滴"],
      value2: true
    };
  },
  created() {
    console.log(this.$route.query.id);
  },
  methods: {
    name() {}
  },

  components: {
    headson: headson
  }
};
</script>

<style scoped lang='scss'>
.comm1 {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  li {
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 20px;
    background-color: #cccccc;
    margin-right: 10px;
    color: white;
  }
  li:nth-child(5) {
    color: #67b6cc;
    cursor: pointer;
  }
}
.recomm {
  margin-left: 30px;
  border-left: 10px solid #6698f9;
  margin-top: 20px;
  padding-left: 20px;
  font-size: 25px;
  color: #6698f9;
}
.type {
  padding-left: 30px;
  margin-top: 20px;
  select {
    width: 200px;
    height: 30px;
  }
}
.comments{
    width: 80%;
    border: 2px solid #CCCCCC;
    margin: 0 auto;
    height: 500px;
    margin-top: 20px;
}
.commcz{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 20px;
    li{
        width: 3rem;
        margin-top: 10px;
        text-align: center;
        background-color: #FFFFFF;
        height: 25px;
        line-height: 25px;
        color: #cccccc;
        font-size: 16px;
        border:1px solid #cccccc;
        border-radius: 10px;
        .el-switch{
            display: inline;
            position: relative;
            left: 10px;
            top:-2px;
            
        }

    }
    li:nth-child(1){
        border:none;
    }
}
</style>