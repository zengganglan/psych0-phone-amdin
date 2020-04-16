<template>
  <div class="main">
    <headson :headson="headson"></headson>
    <div>
      <!-- <el-tabs type="card" v-model="activeName2">
        <el-tab-pane label="如何给学生死亡通知" name="first">
          <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="学生自杀时" name="first-1">学生自杀时</el-tab-pane>
            <el-tab-pane label="死因不明时" name="first-2">死因不明时</el-tab-pane>
            <el-tab-pane label="家属不希望公开死因时" name="first-3">家属不希望公开死因时</el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="如何给学生父母死亡通知" name="second">
            <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="学生自杀时1" name="first-1">学生自杀时</el-tab-pane>
            <el-tab-pane label="死因不明时1" name="first-2">死因不明时</el-tab-pane>
            <el-tab-pane label="家属不希望公开死因时1" name="first-3">家属不希望公开死因时</el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>-->
      <table class="tab">
        <thead>
          <tr>
            <th>如何给学生死亡通知</th>
            <th>如何给父母死亡通知</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>学生自杀时</span>
              <span>死因不明时</span>
              <span>家属不希望公开死因时</span>
            </td>
            <td>
              <span>学生自杀时</span>
              <span>死因不明时</span>
              <span>家属不希望公开死因时</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="body">
      <div class="data">
        <el-form :model="form">
          <el-form-item label="主题" :label-width="formLabelWidth">
            <el-input placeholder="请输入密码" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="方式" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea"></el-input>
          </el-form-item>

          <el-form-item label="内容" :label-width="formLabelWidth">
            <div id="editorElem" style="text-align:left">
              <p>我们非常伤心地告诉大家，我们的一个同学_________。我们希望大家知道，我们将尽一切努力帮助大家。</p>
              <p>
                有关自杀方面的很多问题我们不能马上回答。在此期间可能会出现一些谣言，我们请大家不要传播这些谣言。如果我们知道事情的进展，会在第一时间让大家知道确切的消息。
                自杀是一个非常复杂的问题。通常有精神疾病，如抑郁症导致。抑郁症是一个人不能清醒的看待问题，解决问题。我们有时不能准确识别或注意到这种疾病，有些时候，有这种疾病的人可能会有明显的症状或体征，但有一点是可以肯定的，如果治疗是不会自杀的。
                每一个人对_______的去世会有自己的反应，我们要相互尊重，感到悲伤是正常的反应。你们当中有些人可能不十分了解_________，没有受到影响，而其他人可能会经历巨大悲痛。有些人可能会感到不能集中注意力学习，有些人可能感觉集中注意力学习是很好的缓解情绪的方式。
              </p>
              <p>
                我们会有咨询员帮助大家处理情绪反应，让大家更多的理解自杀。如果你有需求，请告诉你的老师。
                我们和你在一起！
              </p>
            </div>
            <!-- <vue-ueditor-wrap v-model="form.htmlForEditor" :config="myConfig"></vue-ueditor-wrap> -->
          </el-form-item>
          <!-- <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input placeholder=""  show-password></el-input>

          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitcontent">保存</el-button>
          <el-button type="primary" @click="submitcontent">下载</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import headson from "../../../components/headson";
export default {
  data() {
    return {
      activeName2: "first",
      activeName: "first-1",

      headson: ["自杀后管理", "个案总结和学生死亡通知模板"],
      formLabelWidth: "120px",
      dialogFormVisible: true,
      form: {
        title: "当知道是自杀死亡时如何告知学生",
        textarea: "主要用于小团体，教师或通报，不适合大众群体或广播",
        editorContent: "<h1>Some initial content</h1>",
        date: "",
        type: [],
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        value: ""
      }
    };
  },
  mounted() {
    // 实例化
    // 视频<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=b0837pjcueo" allowFullScreen="true"></iframe>
    console.log(document.getElementById("editorElem"));

    var editor = new E("#editorElem");
    console.log(editor);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
      console.log(html);
    };
    editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
    editor.customConfig.uploadImgServer = "<%=path%>/Img/upload"; //上传URL
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    editor.customConfig.uploadImgMaxLength = 5;
    editor.customConfig.uploadFileName = "myFileName";
    editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url = result.data;
        insertImg(url);

        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    };

    editor.create();
  },

  methods: {
    submitcontent() {
      if (this.form.value && this.form.title) {
      } else {
        this.$message("类型或者主题不能为空");
      }

      //   console.log(this.form.htmlForEditor,this.form.value,this.form.type);
    },
    handleClick(tab, event) {
      console.log(tab, event, this.activeName);
    }
  },
  components: {
    headson: headson
  }
};
</script>

<style scoped lang="scss">
.tab {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 1px;
  border-color: grey;
  display: table;
  thead {
    tr {
      height: 50px;
      background-color: #009dd9;
      font-size: 20px;
      color: #e6e6e8;
      th {
        border: 2px solid #fff;
      }
    }
  }
  tbody {
    tr {
      height: 30px;
      td {

        span {
                  text-align: center;

          display: inline-block;
          background-color: #e8e8e8;
          width: 32.9%;
          height: 30px;
          line-height: 30px;
          // border: 1px solid #fff;

          cursor: pointer;
        }
      }
    }
  }
}

.body {
  margin-top: 10px;
  background-color: #f9f9fb;
  .data {
    padding-top: 10px;

    margin: 0 auto;
    border: 1px solid #e6e6e8;
    margin: 0 50px;
    margin-top: 30px;
    background-color: #ffffff;
    .dialog-footer {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
}
</style>