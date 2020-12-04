<template>
  <div class="container">
    <header>
      <span class="iconfont icon-angle-left" @click="golin"></span>
      {{name}}
      <span></span>
    </header>

    <main v-if="flag">
      <div class="top">
        <div class="top1">量表名称</div>

        <div class="content">
          <el-progress :percentage="prersent"></el-progress>

          <div class="th">
            <i>{{num}}</i>/
            <em>{{topic.length}}</em>
          </div>
          <!-- <div class="qus" data-df="{{df}}">
        <div class="title">
            <span>{{id}}</span>,<i>{{question}}</i>
        </div>
        {{each answers as value index}}
        <div class="a1">
            <input type="button" value="{{index}}, {{value}}" class="trans" data-index="{{index}}">
        </div>
        {{/each}}
          </div>-->
          <div class="qus">
            <div class="title">
              <span>{{num}}</span>,
              <i>{{qusetion}}</i>
              <span v-if="timu['type']==1">(这是单选)</span>
              <span v-else>(这是多选)</span>
            </div>
            <div class="a1">
              <!-- 单选1 多选2 -->
              <template v-if="timu['type']==1">
                <el-radio-group v-model="timu.select">
                  <el-radio
                    v-for="(item, index) in option"
                    :key="index"
                    :label="index+1"
                    @change="chooseAnswer()"
                  >{{item[0]}}</el-radio>
                </el-radio-group>
              </template>

              <template v-else>
                <div>
                  <el-checkbox-group v-model="selected" @change="chooseAnswer()">
                    <el-checkbox
                      :label="index+1"
                      v-for="(item, index) in option"
                      :key="index"
                    >{{item[0]}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="jh">
          <input type="button" value="上一题" class="left" :class="{'active':num>1}" @click="pre" />
          <input
            :disabled="disabled"
            type="button"
            value="下一题"
            class="right active show"
            @click="next"
            v-if="num<topic.length"
          />
          <input v-else type="button" value="提交" class="get active" @click="submit" />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  data() {
    return {
      selected: [],
      data: [
        { id: 1, name: 1 },
        { id: 2, name: 2 }
      ],
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      name: this.$route.query.name,
      topic: [],
      num: 1,
      qusetion: "",
      option: "",
      timu: "",
      prersent: 0,
      flag: true,
      starttime: "",
      disabled: true
    };
  },
  created() {
    this.getdata();
  },
  mounted() {},
  methods: {
    getdata() {
      var that = this;
      this.axios
        .get("/api/v1/scale/startSelfTest?id=" + this.$route.query.scaleid)
        .then(res => {
          if (res["data"]["code"] == 0) {
            that.starttime = res["data"]["data"]["start_test_time"];
            that.topic = res["data"]["data"]["topic"];
            that.show(that.num);
          } else {
            that.flag = false;
            that
              .$alert("<strong>" + res["data"]["msg"] + "</strong>", "提示", {
                dangerouslyUseHTMLString: true
              })
              .then(() => {
                that.$router.go(-1);
              });
          }
        });
    },
    show(num) {
      var that = this;
      var index = num;
      var number = num / that.topic.length;
      // 截取两位小数
      that.prersent = (number * 100).toFixed(2) - 0;
      that.timu = that.topic[index - 1];
      if (that.timu.type == 2) {
        //    如果是多选而且有selects属性赋值给select 单选是直接获取到自己的selected
        if (that.timu["selected"]) {
          that.selected = that.timu["selected"];
          // console.log(that.selected);
        }
      }
      //   如果有选着过的设置disabnled
      if (that.timu["selected"]) {
        that.disabled = false;
      } else {
        that.disabled = true;
      }
      // console.log(that.timu);
      that.qusetion = that.timu["topic"]["content"];
      that.option = that.timu["topic"]["option"];
    },
    pre() {
      var that = this;
      that.selected = [];

      if (that.num > 1) {
        that.num--;

        that.show(that.num);
      } else {
        alert("已是第一题");
      }
    },
    next() {
      var that = this;
      if (that.num < that.topic.length) {
        that.selected = []; //不然会继承前面选着的select，每次清空。如果选着过渲染时show会加上赋值

        that.num++;

        that.show(that.num);
      } else {
        that.$message("最后一题可以提交");
        // 切换按钮
        if (that.num == that.topic.length - 1) {
          // $('.jh .right').removeClass('show').addClass('hidden')
          // $('.jh .get').removeClass('hidden').addClass('show')
        }
      }
    },
    chooseAnswer() {
      // 只有选择了都有select的属性，可能为空值，没选一定没有这个属性 组件每一次都能从新得到新的值，不会和已选到的重合\
      var that = this;
      that.disabled = false;
      if (that.timu.type == 1) {
        var arr = [];
        arr.push(that.timu.select);
        that.topic[that.num - 1]["selected"] = arr;
      } else {
        that.topic[that.num - 1]["selected"] = that.selected;
      }
      setTimeout(() => {
        that.next();
      }, 500);

      console.log(that.topic[that.num - 1], that.selected);
    },

    submit() {
      var that = this;
      var answers = [];
      var noNnswer = [];
      this.topic.map((item, index) => {
        if (item["selected"] && item["selected"].length > 0) {
          console.log(item.selected);
          answers.push(item.selected);
        } else {
          answers.push(null);
          noNnswer.push(index+1);
        }
      });
      if (noNnswer.length > 0) {
        var msg = "无答题：";
        noNnswer.map((item, index) => {
          msg = msg + item + ",";
        });
        alert("有漏题，请答完题目在提交。" + msg);
        return;
      }

      answers.map((item, index) => {
        if (Array.isArray(item) && item.length == 1) {
          answers[index] = item[0];
        }
      });
      console.log(answers);
      var obj = {
        scale_id: that.$route.query.scaleid,
        start_test_time: that.starttime,
        answer: answers
      };
      if (that.$route.query.id) {
        obj["answer_id"] = that.$route.query.id;
      }
      this.axios.post("/api/v1/scale/submitAnswer", obj).then(res => {
        if (res["data"]["code"] == 0) {
          // that.$message("提交成功");
          that
            .$alert("<strong>" + "提交成功" + "</strong>", "提示", {
              dangerouslyUseHTMLString: true
            })
            .then(() => {
              that.$router.go(-1);
            });
        } else {
          that.$message(res["data"]["msg"]);
        }
      });
    },
    golin() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 768px;
  max-width: 768px;
  margin: 0 auto;
  background: url("../../../assets/images/bj1@2x.png") no-repeat;
  background-size: 100% 100%;
  header {
    width: 100%;
    height: 50px;
    background: url("../../../assets/images/dbczl@2x.png") no-repeat;
    background-size: 100% 100%;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    position: relative;
    .iconfont {
      font-size: 20px;
      color: #ffffff;
      position: absolute;
      top: 0;
      left: 10px;
      cursor: pointer;
    }
  }
  main {
    width: 100%;
    overflow: hidden;
    margin-top: 100px;

    .top {
      background: url("../../../assets/images/tb@2x.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 30px;
      // overflow: hidden;
      // height: 500px;
      .top1 {
        height: 30px;
        margin-top: 50px;
        font-size: 20px;
        color: white;
        text-align: center;
      }
      .content {
        width: 70%;
        margin: 0 auto;
        margin-top: 50px;

        .th {
          width: 70px;
          height: 20px;
          background-color: #3568fc;
          font-size: 12px;
          position: relative;
          top: -125px;
          left: -25px;
          border-radius: 20px;
          color: white;
          text-align: center;
          line-height: 20px;
        }
        .qus {
          height: 500px;
          width: 100%;

          .title {
            width: 100%;
            line-height: 30px;
          }
          .a1 {
            padding-left: 10px;
            margin-top: 20px;

            input[type="button"] {
              vertical-align: middle;
              height: 35px;
              width: 200px;
              border-radius: 20px;
              border: 1px solid white;
              // background-color: transparent;
            }
          }
        }
      }

      .jh {
        margin: 0 10px;
        // margin-top: 30px;
        color: white;
        overflow: hidden;
        .left {
          float: left;
          width: 100px;
          height: 40px;
          margin-left: 20px;
          border-radius: 20px;
          border: none;
        }
        .get,
        .right {
          float: right;
          width: 100px;
          height: 40px;
          margin-right: 20px;
          border-radius: 20px;
          border: none;
        }
      }
    }
  }
  .active {
    background-color: #5080fc;
  }
  .huise {
    background-color: #91a3b2;
  }
  .trans {
    background-color: transparent;
  }
  .show {
    display: block;
  }
  .hidden {
    display: none;
  }
}
</style>