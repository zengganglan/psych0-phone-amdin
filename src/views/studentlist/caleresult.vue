<template>
  <div class="container">
    <header>
      <span></span> 测评管理系统
      <span></span>
    </header>
    <main>
      <div class="top">{{scalename}}</div>
      <div class="but" style="margin-bottom:10px">
          <!-- <el-button type="primary" @click="goagain(1)">重测</el-button> -->
      </div>
      
      <div class="time">
        测评时间：
        <span>{{starttime}}</span>
      </div>

      <!-- <div class="a1">假如用十年寿命换未来十天。你怎么分配？</div> -->

      <div class="a3">
        <div class="a2">测试结果</div>
        <fieldset style="line-height:200%;">
          <legend>结果解释</legend>
          <div v-for="(item,key,index) in factors" :key="index" class="yz">
            <span
              v-if="item['desc']"
            >【{{item['desc']['factor']['name']}}】{{item['desc']['calc']['explain']}}。</span>
          </div>
         
        </fieldset>
      </div>

      <div class="buttom"></div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
         scalename: this.$route.query.name,
                starttime:this.$route.query.starttime, 
      detail: "",
      factors: "",
      answers: "",
      facname: [],
      score: []
    };
  },
  created() {
     this.getlist()
  },
  methods: {
        getlist() {
      var that = this;
      this.axios
        .get("/api/v1/scale/getTestResultDetail", {
          params: { id: this.$route.query.id }
        })
        .then(function(res) {
          if (res["data"]["code"] == 0) {
            that.detail = res["data"]["data"];
            that.factors = res["data"]["data"]["result"];
            that.answers = res["data"]["data"]["answer"];
            console.log(
              res["data"]["data"]["result"],
              that.factors,
              that.answers
            );
            var facname = [];
            var score = [];
            for (var key in that.factors) {
              if (that.factors[key]["calc"].length > 0) {
                that.facname.push(that.factors[key]["desc"]["factor"]["name"]);
                that.score.push(that.factors[key]["score"]);
              }
              // 没有对应的结算区间找不到他的因子
            }
            that.print(that.type);

            console.log(that.facname, that.score);
          }
        });
    },

    get() {},
     goagain(val){
       if (val==1) {
           this.$router.push({
        path: "/studentindex/caleindex",
        query: { id: this.$route.query.id, name: this.$route.query.name }
      });
       }else{
window.open('about:blank','_self').close()
       }
  }
  },
 
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  background: url("../../assets/images/bjl@2x.png") no-repeat;
  background-size: 100% 100%;
  header {
    width: 100%;
    height: 50px;
    background: url("../../assets/images/dbczl@2x.png") no-repeat;
    background-size: 100% 100%;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }
  main {
    margin: 0 20px;
    margin-top: 30px;
    color: white;
    .top {
      font-size: 25px;
    }
    .time {
      font-size: 12px;
    }
    .a1 {
      margin-top: 10px;
    }
    .a3 {
      margin-top: 15px;
      height: 760px;
      overflow: auto;
      border-radius: 20px;
      border: 3px solid #7d99e0;
      background-color: #e2ebfc;
      color: #7d99e0;
      .a2 {
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #6b85d3;
      }
    }
    .buttom {
      height: 100px;
      width: 100%;
      background: url("../../assets/images/cpt@2x.png");
      background-size: 100% 100%;
      position: relative;
      top: -60px;
    }
  }
}
</style>