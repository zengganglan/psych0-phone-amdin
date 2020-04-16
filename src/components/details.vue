<template>
    <div>
 <table class="personinfo"  >
    <tr><td>账户</td><td>{{detail.account}}</td><td>ID</td><td>{{detail.id}}</td></tr>
    <tr><td>姓名</td><td>{{detail.name}}</td><td>年龄</td><td>{{detail.birth_date}}</td></tr>
    <tr><td>班级</td><td>{{detail.unit_group}}</td><td>性别</td><td>{{detail.job_num}}</td></tr>
    <tr><td>手机</td><td>{{detail.phone}}</td><td>emile</td><td>{{detail.email}}</td></tr>
    <tr><td>工号</td><td>{{detail.job_num}}</td><td>住址</td><td>{{detail.job_num}}</td></tr>
   </table>
  <div slot="footer" class="dialog-footer">
    <el-button >取 消</el-button>
    <el-button type="primary" >返回</el-button>
  </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
  .personinfo{
      border-collapse: separate;
      border-spacing: 2px;
      td{
        width: 250px;
        height: 30px;
      }
      td:nth-child(odd){
        width: 60px;
        color: #169bd5;

      }
   tr:nth-child(odd){
    background-color: rgb(237, 242, 252);
    
       }
   tr:nth-child(even){

   }
}
</style>