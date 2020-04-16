<template>
  <div>
    <div class="title">详情信息</div>
    <table class="personinfo">
      <tr v-for='(item,key,index) in detail' :key='index'>
        <td>{{ key }} :</td>
        <td>{{item}}</td>
      
      </tr>
    </table>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button >取 消</el-button> -->
      <el-button type="primary" @click="goreturn">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: this.$route.params.detail
    };
  },
  created() {
    console.log(this.$route.params.detail);
  },
  methods: {
    goreturn() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
  margin-top: 20px;
}
.title {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.personinfo {
  border-collapse: separate;
  border-spacing: 2px;
  td {
    width: 250px;
    height: 30px;
  }
  td:nth-child(odd) {
    min-width: 50px;
    color: #169bd5;
  }
  tr:nth-child(odd) {
    background-color: rgb(237, 242, 252);
  }
  tr:nth-child(even) {
  }
}
</style>