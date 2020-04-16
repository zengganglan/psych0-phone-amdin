<template>
  <div class="a1">
    <!-- 只有超级管理员能打开 并且设置操作 普通管理员只能打开-->
    <div class="set">
      <span @click="getpermission">设定权限</span>
    </div>
    <div class="zhuyi">注意：当前设定的是管理员类型的权限，修改后所有属于这个类型的管理员权限将会被当前设置覆盖</div>
    <div class="body" v-for="(item,key,index) in newdata" :key="index">
       
      <h2>{{key}}</h2>
        <span v-for="(item1, index1) in item" :key="index1">
        <input name="right_61" type="checkbox" :value="item1['id']" @click="icheck" ref="icheck" checked='checked'>
        {{item1["menu_name"]}}
      </span>
     
    </div>
      <div align="center" class="sub">
    <label><input type="checkbox" id="checkall" @click="allcheck" ref="allcheck" checked='checked'>全选</label>
    <input type="submit" value="提 交" @click="setpermission">
    <a class="button" href="javascript:history.back()">返 回</a>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newdata: {},
      id:this.$route.query.id
    };
  },
  created() {
    this.getpermission();
    console.log(this.newdata,this.id);
    //  var allcheck = this.$refs.allcheck;
     
  },
  mounted() {
    this.getpermission();
    console.log(88, this.newdata,this.$route.query.id);
  },
  methods: {
    getpermission() {
      var that = this;
      var a={}
      this.axios.get("/api/v1/admin/rules").then(function(res) {
        var data = res["data"]["data"];
        console.log(data)
        for (var key in data) {
          var arr = [];
          var title = data[key]["menu_name"];
          var obj = data[key]["items"];
          if (obj.length!==0) {
               that.copy(obj,arr)
            // for (var key1 in obj) {
            //   if (obj[key1]["items"].length == 0) {
            //     arr.push(obj[key1]);
            //   } else {
            //     for (var key2 in obj[key1]["items"]) {
            //       arr.push(obj[key1]["items"][key2]);
            //     }
            //   }
            // }
          }else{
            arr.push(data[key])
            console.log(1)
          }  
        //   不能直接在数据里面加 重新赋值才会渲染上去
               a[title] = arr;
          // 每一项都把所有值多级变为一级
        }
        that.newdata=a
        console.log(that.newdata,title);
      });
    },
    copy(obj, arr) {
      for (var key in obj) {
        arr.push(obj[key]);
        if (obj[key]["items"].length !== 0) {
          this.copy(obj[key]["items"], arr);
        }else{
          obj[key]
        }
      }
    },
    setpermission(){
      var that = this
          var icheck = this.$refs.icheck;
          var id=[]
      for (var i = 0; i < icheck.length; i++) {
        // 把allchecked的状态赋值给每一个子选框
        if (icheck[i].checked) {
           id.push(icheck[i].value)
        }
      }
      console.log(id)
      that.axios.post("/api/v1/admin/user/editRoleGroup",{id:that.id,rules:id}).then(function(res){
        console.log(res)
        if (res["data"]["code"]==0) {
           that.$message("权限设置成功")
        }else{
          that.$message("权限提交失败")
        }
      })

    },
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
      if (event.target.checked) {
        event.target.parentNode.parentNode.style.backgroundColor = "#F8F8FA";
        console.log(event.target.parentNode);
      } else {
        event.target.parentNode.parentNode.style.backgroundColor = "";
      }
      allcheck.checked = flag;
    },
  }
};
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 20px;
  display: block;
  margin: 10px 0;
  font-size: 20px;
  padding-left: 15px;
}
span {
  line-height: 30px;
  display: inline-block;
  width: 150px;
}
.set {
  border-left: 3px solid #499ad1;
  font-size: 16px;
  font-weight: normal;
  color: #499ad1;
  padding-left: 15px;
  height: 25px;
  line-height: 25px;
  margin-top: 20px;
  font-size: 20px;
}
.zhuyi {
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  padding: 5px 10px;
  margin: 10px 0;
}
.a1 {
  padding-left: 20px;
}
.sub{
  margin-top: 20px;
  input,a{
        border: 0;
    border-radius: 3px;
    background: #489BD1;
    cursor: pointer;
    color: #fff;
    padding: 2px 10px;
  }
}
</style>