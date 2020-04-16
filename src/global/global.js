import Vue from 'vue'
import Axios from '../http'
import store from '../store/index'

// 获取组别列表 
// 设置组别
export const global={
    setGroup:function(){
        Axios.get("/api/v1/admin/roleGroup").then(function (res) {
          let data = res["data"]["data"]
          localStorage.setItem("roleGroup",data)
        }).catch(function (err) {
          alert(err)
        })
      },
      // 导出功能
      handleDownload:function(tHeader,filterVal,arr) {
        require.ensure([], () => {
          const { export_json_to_excel } = require("@/vendor/Export2Excel.js");
       
          if (arr.length == 0) {
           alert("请至少一条数据导入");
            return;
          }
          const data = global.formatJson(filterVal, arr);
          export_json_to_excel(tHeader, data, "导出的列表excel");
        });
      },
      formatJson:function(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      // 封装函数树节点转化为扁平
      NestedToFlat(group) { 
        var res = []
        var that = this
        for(var key in group ){
             res.push({
            id: group[key].id,
            name: group[key].name,
            pid: group[key].pid
          })
          if (group[key]['items'].length!==0) {
            res = res.concat(global.NestedToFlat(group[key]['items']));
          }
        }
        return res;
      },
       //扁平换为树节点
       treeData(source, id, parentId, children){   
        let cloneData = JSON.parse(JSON.stringify(source))
        return cloneData.filter(father=>{
            let branchArr = cloneData.filter(child => father[id] == child[parentId]);
            branchArr.length>0 ? father[children] = branchArr : ''
            return father[parentId] == 0        // 如果第一层不是parentId=0，请自行修改
        })
      },
      // 检查权限
        actioncheck(name){
          if (store.state.btnList.indexOf(name)>-1) {
             return true
          }else{
            return false
          }
        },
        assecsshave(name){
          if (store.state.btnList.indexOf(name)>-1) {
            
          }
        }
      // dels:function(url,data){
      //   var that = this
      //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       //  点击确定开始删除
      //       this.axios
      //         .post(url, data)
      //         .then(function(res) {
      //           console.log(res);
      //           if (res["data"]["code"] == 0) {
      //             that.$message("删除成功");
      //             // that.getlist(that.page.currentpage, that.page.pagesize);
      //           } else {
      //             that.$message(res["data"]["msg"]);
      //           }
      //         });
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: "info",
      //         message: "已取消删除"
      //       });
      //     });
      // }

}
