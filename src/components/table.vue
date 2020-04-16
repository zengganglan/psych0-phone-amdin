<template>
  <table class="tb_list" ref="tables">
    <thead>
      <tr>
        <th>
          <input type="checkbox" name="available" value="0" ref="allcheck" @click="allcheck()">
        </th>
        <!-- 也可以循环遍历 -->
        <th v-for="(item,index) in table.thead" :key="index">{{item}}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item,index) in table.tableData3"
        :key="index"
        @mouseover="changecolor(index)"
        v-bind:class="{heightcolor:isactive==item.sort}"
        @mouseout="colorcancel()"
        @click="setting(item.sort)"
      >
        <td align="center">
                <input
                  type="checkbox"
                  name="available"
                  :value="item.sort"
                  ref="icheck"
                  @click.stop="icheck()"
                  class="icheck"
                >
              </td>
              <td class="sort">{{item.sort}}</td>
              <td class="class">
                <input v-if="item.sort==index1" type="text" v-model="item.class">
                <!-- 点击跳转相关年纪的班级 -->
                <router-link v-else :to="'/admin/grade.vue/' + item.sort" tag="a">{{item.class}}</router-link>
              </td>
              <td>
                <input v-if="item.sort==index1" type="text" v-model="item.name">
                <span v-else>{{item.name}}</span>
              </td>
              <td>
                <input v-if="item.sort==index1" type="text" v-model="item.ID">
                <span v-else>{{item.ID}}</span>
              </td>
               <td>
                <input v-if="item.sort==index1" type="text" v-model="item.ID">
                <span v-else>{{item.ID}}</span>
              </td>

              <span class="posi">
                <template v-if="item.sort==index1">
                  <span @click.stop="queding(item.sort)">确定</span>
                  <span @click.self="cancle(item.sort)">取消</span>
                </template>
                <!-- <template v-else>
                  <span @click="setting(item.sort)">编辑</span>
                  <span @click="del(item.sort)">删除</span>
                </template>-->
              </span>
      </tr>
      <template v-if="addflag">
        <tr>
          <td align="center">
            <input type="checkbox" name="available" value="0" class="icheck">
          </td>
          <td class="sort">{{table.tableData3.length+1}}</td>
          <td class="class">
            <input type="text" v-model="values.value1">
          </td>
          <td>
            <input type="text" v-model="values.value2">
          </td>
          <td>
            <input type="text" v-model="values.value3">
          </td>

          <span class="posi">
            <span @click.stop="queding()">确定</span>
            <span @click.stop="cancle()">取消</span>
          </span>
        </tr>
      </template>
    </tbody>
  </table>
  
</template>

<script>
export default {
  data() {
    return {
      // 高亮显示
      isactive: "",
      // 编辑
      index1: "",
      // 增加数据
      values: {
        value1: "",
        value2: "",
        value3: ""
      },
      //增加数据
      addflag: false
    };
  },
  created() {},
  methods: {
    //编辑后确定
    queding(id) {
      // 点击确定提交数据到后台=>数据增加到tables，同时把addflag变为false
      console.log(this.value1);
      this.addflag = false;
      this.index1 = "";
    },
    //编辑时取消
    cancle(id) {
      this.addflag = false;
      this.index1 = "";
    },
    // 点击编辑出现文本框
    setting(id) {
      // this.settingflag.id=id
      // console.log(this.settingflag)
      console.log(id);
      this.index1 = id;
    },
    // 点击删除单条数据
    del(id) {},
    // 全选反选
    allcheck() {
      var allcheck = this.$refs.allcheck;
      var icheck = this.$refs.icheck;
      for (var i = 0; i < icheck.length; i++) {
        // 把allchecked的状态赋值给每一个子选框
        icheck[i].checked = allcheck.checked;
      }
    },
    //反选
    icheck() {
      var allcheck = this.$refs.allcheck;
      var icheck = this.$refs.icheck;
      var flag = true;
      for (var i = 0; i < icheck.length; i++) {
        if (icheck[i].checked == false) {
          flag = false;
        }
      }
      allcheck.checked = flag;
    },
    // 划过事件
    changecolor(index) {
      console.log(index);
      this.isactive = index - 0 + 1;
    },
    colorcancel() {
      this.isactive = "";
    },
    //  // 增加数据开始
    addnumber() {
      this.addflag = !this.addflag;
      console.log(this.addflag);
      // 把值取到放到最后一个数据，在这之前把数据切换放到最后一页才合乎情理
    }
  },
  // 父组件点击搜索传给子组件thead 和 data数据。开始渲染
  props: ["table"]
};
</script>

<style lang="scss" scoped>
.heightcolor {
  background-color: #f8f8fa;
}
.tb_list {
  width: 100%;
  border: 1px solid #e6e6e8;
  margin: 0 auto;
  // margin-top: 30px;
  background-color: #ffffff;
  border-top: 1px solid #dfd7d7;
  thead {
    th {
      border-bottom: 1px solid #dfd7d7;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
  }
  tbody {
    td {
      border-bottom: 1px solid #dfd7d7;
      text-align: center;
      height: 36px;
      line-height: 36px;
    }
  }
}
</style>