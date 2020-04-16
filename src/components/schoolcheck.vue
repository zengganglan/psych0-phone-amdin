<template>
  <div>
    <!-- <span>范围：</span> -->
    <div class="inpu">
      <div v-html="newvalue" id="school" @click="showtree()"></div>
      <!-- <input type="button" v-model="newvalue" id="school" @click="showtree()"> -->
      <span class="iconfont icon-xuanzekuang" @click="showtree()"></span>
    </div>
    <div class="tree" v-if="treeflag">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

      <div class="box">
        <el-tree
          @node-click="nodeclick"
          :check-on-click-node="true"
          :highlight-current="true"
          class="filter-tree"
          :data="data2"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree2"
        ></el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { global } from "../global/global";
export default {
  data() {
    return {
      // 父组件控制学校选择框组件开关
      treeflag: false,
      // 下拉框
      newvalue: "",
      item:"",
      filterText: "",
      data2: [],

      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  mounted() {
    console.log(this.data2)
       console.log(this.inputName)

  },
  created() {
        this.getshoolcheck();

        console.log(this.data2)

  },
  watch: {
    filterText(val) {
      // 只要val改变就掉用过滤函数--把数据传给后台，后台过滤重新拿数据
      this.$refs.tree2.filter(val);
      console.log(val);
    },
    inputName(){
      this.newvalue=this.inputName
    }
  },
  methods: {
    //获取数据
     getshoolcheck() {
       var that = this
      this.axios.get("/api/v1/admin/unit/list/pid?pid=" + 0).then(function(res) {
        var data = res["data"]["data"];
         data =global.treeData(data, 'id', 'pid', 'items')
         console.log(data)
        var arr=[]
        that.func(data,arr)
        if (!that.inputName) {
           that.newvalue = arr[0]['name'];
           that.item=arr[0]
        }
       that.data2=arr
      });
    },
     func(obj,arr){
         for(var key in obj){
           arr.push(obj[key])
           if (obj[key]["items"]!==0) {
             var arr1 = []
              obj[key]['children']=arr1
              this.func(obj[key]["items"],arr1)
            
             
           }
         }
     },
    //过滤操作
    filterNode(value, data) {
      console.log(value)
      console.log(data)
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    nodeclick(a1, a2, a3) {
      console.log(a1,a2,a3)
      this.newvalue = a1.name;
      this.item=a1
      this.treeflag = !this.treeflag;
    },
    showtree() {
      this.treeflag = !this.treeflag;
    }
  },
  props:['inputName']
};
</script>

<style lang="scss" scoped>
.inpu {
  position: relative;
  background-color: #ffffff;
  border: 2px solid #e2e2e2;
  .iconfont {
    position: absolute;
    top: 0;
    right:0px;
    height: 100%;
    width: 30px;
    line-height: 32px;
    text-align: center;
    border-left: 2px solid #e2e2e2;

    display: inline-block;
    vertical-align: center;
    cursor: pointer;
    background-color: #ffffff;
  }
}

div {
  width: 100%;
  #school {
    height: 32px;
    line-height: 32px;
    text-align: center;
    width: 100%;
    background-color: #fff;
    outline: none;
    border: 1px solid transparent;
    border-right: 2px solid #e2e2e2;
    color: #a8a8a8;
    font-size: 16px;
  }

  .tree {
    //  width: 150px;
    position: relative;
    top: -17px;
    left: 0px;
    z-index: 50;
    .el-input {
      height: 32px;
      box-sizing: border-box;
      //  width: 164px;
      position: relative;
      outline: none;
      
      top: 16px;
      .el-input.inner {
        outline: none;

        background-color: white;
        border: 2px solid #e2e2e2;
      }
    }
    .box {
      overflow: auto;
      height: 155px;
      position: relative;
      top: 17px;
      background-color: white;
      border: 2px solid #e2e2e2;
    }
  }
}
</style>