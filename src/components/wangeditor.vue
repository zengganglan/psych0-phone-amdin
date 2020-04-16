<template>
      <div id="editorElement" style="{width: 500px}" ref="editorElement">
     </div>
</template>

<script>
import E from "wangeditor";

    export default {
        data() {
            return {
                content: "value"
            }
        },
        mounted(){
          var editor = new E('#editorElement')
        console.log(editor)
        editor.customConfig.onchange = (html) => {
          this.content = html
        }
      //  editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
      editor.customConfig.uploadImgServer = '/api/v1/admin/article/upload'; //上传URL
      editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
      editor.customConfig.uploadImgMaxLength = 5;    
      editor.customConfig.uploadFileName = 'file';
       editor.customConfig.uploadImgHeaders = {
              'X-Token' :this.$store.state.token,  //头部token

          }
      editor.customConfig.uploadImgHooks = {
      customInsert: function (insertImg, result, editor) {
                  // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                  // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果             
                  // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                  if (result['code']==0) {
                      var url = 'http://psy.hxxlcloud.com/uploads/'+result.data.upload_path
                       insertImg(url);

                  } else{
                    that.$message(result['msg'])
                  }
               }
          }

        editor.create()


        },
        methods: {
            name() {
                
            }
        },
        props:['content']
    }
</script>

<style lang="scss" scoped>

</style>