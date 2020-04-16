<template>
  <div class="main">
    <!-- 头部 -->
    <headson :headson="headson"></headson>
    <!-- 搜索栏 -->

    <div class="data">
      <table class="a1">
        <tr>
          <td>头像：</td>
          <td>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </td>
        </tr>
        <tr>
          <td>姓名：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入姓名" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>ID号：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入ID" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>学号：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入学号" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>联系方式：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入联系方式" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>学校：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入学校" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>管理类型：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入系统标题，如演示中学" style="width:300px"></el-input>
          </td>
        </tr>
        <tr>
          <td>个人简介：</td>
          <td>
            <el-input v-model="data.input" placeholder="请输入简介" style="width:300px"></el-input>
          </td>
        </tr>
      </table>
    </div>
    <div class="add">保存</div>
  </div>
</template>

<script>
import headson from "../../../components/headson";
import pagination from "../../../components/pagination";

export default {
  data() {
    return {
      imageUrl: "",
      headson: ["个人信息设置", "有关个人的参数设置"],
      data: {
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
  methods: {
    handleAvatarSuccess(res, file) {
        console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
     console.log(file)
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },

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