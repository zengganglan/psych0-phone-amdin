<template>
  <div class="main">
    <headson :headson="headson"></headson>
    <div class="body">
      <div class="data">
        <el-form :model="form">
          <el-form-item label="类别" :label-width="formLabelWidth">
            <el-select v-model="form.value" placeholder="请选择">
              <el-option
                v-for="item in $store.state.columns"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="主题" :label-width="formLabelWidth">
            <el-input placeholder="请输入主题" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="摘要" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea"></el-input>
          </el-form-item>

          <el-form-item label="内容" :label-width="formLabelWidth">
            <div id="editorElem" :style="{'text-align':'left','min-height':'500px'}"></div>
            <!-- <vue-ueditor-wrap v-model="form.htmlForEditor" :config="myConfig"></vue-ueditor-wrap> -->
          </el-form-item>
          <!-- <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input placeholder=""  show-password></el-input>

          </el-form-item>-->
          <el-form-item label="设置" :label-width="formLabelWidth">
            <el-checkbox-group v-model="form.type">
              <el-checkbox-button label="允许评论" name="type"></el-checkbox-button>&nbsp;&nbsp;
              <el-checkbox-button label="栏目内置顶" name="type"></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitcontent">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import E from "wangeditor";
import headson from "../../../components/headson";
export default {
  data() {
    return {
      headson: ["发布文章", ""],
      formLabelWidth: "120px",
      dialogFormVisible: true,
      form: {
        title: "",
        textarea: "",
        editorContent: "<h1>Some initial content</h1>",
        type: [],
        options: [],
        value: ""
      }
    };
  },
  mounted() {
    // 实例化
    // 视频<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=b0837pjcueo" allowFullScreen="true"></iframe>
    var editor = new E("#editorElem");
    console.log(editor);
    editor.customConfig.onchange = html => {
      this.form.editorContent = html;
      console.log(html);
    };
    //  editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    editor.customConfig.uploadImgServer = "/api/v1/admin/article/upload"; //上传URL
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    editor.customConfig.uploadImgMaxLength = 5;
    editor.customConfig.uploadFileName = "file";
    editor.customConfig.uploadImgHeaders = {
      "X-Token": this.$store.state.token //头部token
    };
    editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        if (result["code"] == 0) {
          // var url = 'http://psy.hxxlcloud.com/uploads/'+result.data.upload_path
          var url = "/uploads/" + result.data.upload_path;

          insertImg(url);
        } else {
          that.$message(result["msg"]);
        }
      }
    };

    editor.create();
  },

  methods: {
    submitcontent() {
      var comment;
      var topping;
      var that = this;
      if (this.form.value && this.form.title) {
        comment = this.form.type.indexOf("允许评论");
        topping = this.form.type.indexOf("栏目内置顶");
        if (comment !== -1) {
          comment = 1;
        } else {
          comment = 0;
        }
        if (topping !== -1) {
          // 纯在
          topping = 1;
        } else {
          //  不存在没选
          topping = 0;
        }
        this.axios
          .post("/api/v1/admin/article/publish", {
            column_id: this.form.value,
            theme: this.form.title,
            abstract: this.form.textarea,
            content: this.form.editorContent,
            comment: comment,
            topping: topping
          })
          .then(function(res) {
            if (res["data"]["code"] == 0) {
              that.$message("发表文章成功");
            } else {
              that.$message(res["data"]["msg"]);
            }
          });
      } else {
        this.$message("类型或者主题不能为空");
      }
      //   console.log(this.form.htmlForEditor,this.form.value,this.form.type);
    }
  },
  components: {
    headson: headson
  }
};
</script>

<style scoped lang="scss">
.el-checkbox-button {
  margin-right: 20px;
  border: 1px solid #dcdfe6;
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