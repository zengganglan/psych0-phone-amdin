<template>
  <div>
    <span class="del" @click="handleDownload">导出</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: value
    };
  },
  methods: {
    // 导出excel表格功能
    handleDownload() {
      let vm = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel.js");
        // const tHeader = ["字段1", "字段2", "字段3", "字段4"];
        // const filterVal = ["sort", "class", "name", "ID"];
        const list = vm.tableData3;
        const tHeader = vm.tHeader;
        const filterVal = vm.filterVal;
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出的列表excel");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  props:["tableData3","tHeader","filterVal"]
};
</script>

<style lang="scss" scoped>
.del {
  display: inline-block;
  float: right;
  width: 55px;
  height: 20px;
  background-color: #169bd5;
  color: white;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  border-radius: 5px;
}
</style>