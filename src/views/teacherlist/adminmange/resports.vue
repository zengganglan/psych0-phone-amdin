<template>
  <div class="main">
    <!-- <headson :headson="headson"></headson> -->

    <div class="search">
      <ul>
        <li>
          <el-checkbox-group v-model="type" @change="changefun()">
            <el-checkbox-button
              v-for="(item,index) in group"
              :label="item['type']"
              :key="index"
            >{{item['name']}}</el-checkbox-button>
          </el-checkbox-group>
        </li>
        <li>
          <!-- <el-button type="primary" plain @click="archive">
            <i class="iconfont icon-daochu1"></i>浏览档案
          </el-button> -->

          <!-- <input type="text" value id="person">
              <i class="iconfont icon-sousuo" @click="showtable()"></i>
          <span class="iconfont icon-wenhao"></span>-->
        </li>
      </ul>
    </div>
    <div class="body">
      <div class="block">
        <el-timeline>
          <!-- <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>-->
          <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
            <el-timeline-item
              placement="top"
              color="#C0D3E1"
              size="large"
              icon="el-icon-more"
              type="primary"
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              <el-card
                :class="{aClass: activity.types==1,bClass: activity.types==2,mClass: activity.types==3,nClass: activity.types==4}"
              >
                <el-checkbox :label="activity.idnumber" :key="activity.id">
                  <h4>{{activity.timestamp}}</h4>

                  <p v-if="activity.types==1">留言内容：{{activity.content}}</p>
                  <p v-else-if="activity.types==2">咨询内容：{{activity.problem}}</p>
                  <p v-else-if="activity.types==3">访谈干预内容：{{activity.proc_idea}}</p>
                  <p v-if="activity.types==4">测评量表{{activity.scale_name}}</p>
                </el-checkbox>
              </el-card>
               <!-- <el-checkbox :label="activity.idnumber" :key="activity.id">
                  <h4>{{activity.timestamp}}</h4>

                  <p v-if="activity.types==1">留言内容：{{activity.content}}</p>
                  <p v-else-if="activity.types==2">咨询内容：{{activity.problem}}</p>
                  <p v-else-if="activity.types==3">访谈干预内容：{{activity.proc_idea}}</p>
                  <p v-if="activity.types==4">测评量表{{activity.scale_name}}</p>
                </el-checkbox> -->
            </el-timeline-item>
          </el-checkbox-group>
          <!-- <el-timeline-item  placement="top"  color="#C0D3E1" size="large" icon="el-icon-more" type='primary'  v-for="(activity, index) in activities"  :key="index" :timestamp='activity.timestamp'>
          <el-card>
                   <h4>{{activity.timestamp}}</h4>
            <p>{{activity.content}}</p>
          
          </el-card>
          </el-timeline-item>-->
        </el-timeline>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import headson from "../../../components/headson";
import moment from 'moment'
export default {
  data() {
    return {
      type: [],
      checkAll: false,
      isIndeterminate: true,
      checked: [],
      headson: ["学生个人档案", "个人档案资料导出记录"],
      group: [
        {
          type: 1,
          name: "留言"
        },
        {
          type: 2,
          name: "咨询"
        },
        {
          type: 3,
          name: "访谈"
        },
        {
          type: 4,
          name: "测评"
        }
      ],
      activities: [],
      activities1: [],
      useid: this.$route.query.id,
      alldata: []
    };
  },
  created() {
    console.log(this.checked);
    this.messages();
    // this.zixun()
    // this.fangtan()
  },
  methods: {
    alldata1() {
      // // 因为all是axios的静态方法所以虽然能正常请求但是控制台报错需要自己设置
      // this.axios.all([ this.messages(),this. zixun()
      // ]).then(this.axios.spread((mess,counse,coach)=>{
      //     console.log(mess,counse,coach)
      // }))
    },
    messages() {
      //  alert(`获取了${a}`);
      var that = this;
      this.axios
        .get(`/api/v1/admin/message/listByUID?uid=${this.useid}`)
        .then(res1 => {
          var data1 = res1["data"]["data"];
          data1.map((item1, index1) => {
            item1["types"] = 1;
            item1["timestamp"] = item1["create_time"];

            that.alldata.push(item1);
          });
          console.log(data1);
          this.axios
            .get(`/api/v1/admin/counsel/getClientListByUID?uid=${this.useid}`)
            .then(res2 => {
              console.log(res2);
              var data2 = res2["data"]["data"];
              data2.map((item2, index2) => {
                item2["types"] = 2;
                item2["timestamp"] = item2["start_time"];
                that.alldata.push(item2);
              });
              console.log(data2);
              this.axios
                .get(`/api/v1/admin/coach/listByUID?uid=${this.useid}`)
                .then(res3 => {
                  console.log(res3);
                  var data3 = res3["data"]["data"];
                  data3.map((item3, index3) => {
                    item3["types"] = 3;
                    item3["timestamp"] = item3["start_time"];
                    switch (item3["proc_idea"] - 0) {
                      case 0:
                        item3["proc_idea"] = "无";
                        break;
                      case 1:
                        item3["proc_idea"] = "无须干预";
                        break;
                      case 2:
                        item3["proc_idea"] = "预约面询";
                        break;
                      case 3:
                        item3["proc_idea"] = "危机干预";
                        break;
                      case 4:
                        item3["proc_idea"] = "联系领导";
                        break;
                      case 5:
                        item3["proc_idea"] = "跟踪随访";
                        break;
                    }
                    that.alldata.push(item3);
                  });
                                      that.getscale(that.useid)

               
                });
            });
        });
    },
    getscale(uid) {
      // 获得列表数据
      // console.log(w)
      //传递查询条件返回相应页码的数据条数 查询条件当前页码，和每页显示条数
    
      var that = this;
      this.axios
        .post("/api/v1/admin/scale/getTestResultList" , {
          page: 1,
          size: 60,
          w:{uid:uid},
        })
        .then(function(res) {
          if (res["data"].code == 0) {
            var tableData = res["data"]["data"]["list"];
            tableData.map((item, index) => {
                item["types"] = 4;
                item["timestamp"] = item["start_test_time"];
              if (item["birth_date"]) {
                var a = new Date().getTime() - new Date(item["birth_date"]);
                var hours = a / 1000 / 60 / 60;
                var year = Math.floor(hours / (24 * 30 * 12));
                console.log(year);
                item["age"] = year;
              } else {
                item["age"] = "null";
              }
              item["times"] = moment(
                moment(item["end_test_time"]) - moment(item["start_test_time"])
              ).format("HH:mm:ss");
              if (item.sex == 0) {
                item.sex = "女";
              } else {
                item.sex = "男";
              }
              if (item.valid == 0) {
                item.valid = "有效";
              } else {
                item.valid = "无效";
              }
              if (item.type == 2) {
                item.type = "自测";
              } else {
                item.type = "普查";
              }
                that.alldata.push(item)
            });
            // 四个请求请求完毕
               console.log(that.alldata)
                  that.alldata = that.sortDataArray(that.alldata);
                  that.alldata.map((item, index) => {
                    item["idnumber"] = index + 1;
                    that.checked.push(item["idnumber"]);
                  });

                  that.activities = that.alldata;
                  that.activities1 = that.alldata;
                  localStorage.setItem("alldata", JSON.stringify(that.alldata));
          }
        });
    },
    sortDataArray(dataArray) {
      return dataArray.sort(function(a, b) {
        return Date.parse(b.timestamp) - Date.parse(a.timestamp);
      });
    },

    zixun() {
      this.axios
        .get(`/api/v1/admin/counsel/getClientListByUID?uid=${this.useid}`)
        .then(res => {
          console.log(res);
        });
    },
    fangtan() {
      this.axios
        .get(`/api/v1/admin/coach/listByUID?uid==${this.useid}`)
        .then(res => {
          console.log(res);
        });
    },
    cepin() {},
    getlist() {
      var type = this.type;
      var data = [];
      this.activities1.map((item, index) => {
        type.map(item1 => {
          if (item.types == item1) {
            data.push(item);
          }
          console.log(item, item1);
        });
      });
      this.activities = data;
      console.log(data, type);
      this.handleCheckAllChange();
    },
    handleCheckAllChange(val) {
      if (this.checked) {
        this.checked = [];

        this.activities.map((item, index) => {
          this.checked.push(item.idnumber);
        });
      } else {
        this.checked = [];
      }
      // if (this.checked=val) {
      //                 this.checked=[ ]

      //      this.activities.map((item,index)=>{
      //         this.checked.push(item.id)
      //      })
      //  }else{
      //    this.checked=[]
      //  }
      // this.checked = val ? this.activities : [];
      console.log(val, this.checked);

      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.activities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.activities.length;
    },
    archive() {
      // 数组this.checked传到另一个页面。所有改变的数据存到locallstroage 去查询。
      localStorage.setItem("checked", JSON.stringify(this.checked));
      this.$router.push({
        path: "/student/archives",
        query: { useid: this.useid }
      });
    },
    changefun() {
      console.log(this.type);
      this.getlist();
    }
  },
  // 头部组件信息
  components: {
    headson: headson
  }
};
</script>

<style scoped lang='scss'>
.top1 {
  height: 112px;
  //  border-bottom: 1px solid #BDC0C3;
  padding-left: 24px;
  padding-top: 18px;
  background-color: #ffffff;
  box-shadow: #bdc0c3 1px 1px 10px;
  > .left {
    display: inline-block;
    width: 75px;

    text-align: center;
  }
  > .right {
    display: inline-block;
    > .help {
      margin-bottom: 10px;
      > span {
        margin-right: 40px;
      }
    }
    > .dear {
      margin-bottom: 10px;
    }
    > .btn {
      background-color: #fff;
    }
  }
}
.search {
  height: 80px;
  margin: 0 auto;
  background-color: #fafafc;
  border: 1px solid #eff2f9;
  box-shadow: #eff2f9 1px 1px 20px;
  ul {
    width: 100%;
    display: flex;
    padding-top: 25px;
    justify-content: space-between;
    // li:nth-child(1) {
    //   margin-left: 50px;
    //   margin-right: 150px;
    //   margin-top: 10px;
    //   .schoolcheck1 {
    //     position: relative;
    //     top: -30px;
    //     left: 40px;
    //     width: 250px;
    //   }
    // }
    li:nth-child(1) {
      select {
        border: 2px solid #e2e2e2;
        width: 200px;

        height: 35px;
      }
    }
    li:nth-child(2) {
      // width: 500px;
      float: right;
      margin-left: 50px;
      // #person {
      //   height: 32px;
      //   outline: none;
      //   width: 200px;
      //   outline: none;
      //   border: none;

      //   border: 2px solid #e2e2e2;
      // }
      // .icon-sousuo {
      //   display: inline-block;
      //   font-size: 22px;
      //   vertical-align: middle;
      //   height: 32px;
      //   width: 30px;
      //   line-height: 32px;
      //   text-align: center;
      //   color: #bad6fc;
      //   position: relative;
      //   left: -5px;
      //   top:-1px;
      //   border: 2px solid #e2e2e2;
      //   border-left: none;
      // }
      // .icon-wenhao {
      //   color: #169bd5;
      //   font-size: 25px;
      // }
    }
  }
}
.body {
  width: 59%;
  margin-top: 100px;
  margin-left: 50%;
  transform: translateX(-40%);
  .el-timeline-item {
    width: 102%;
    height: 100px;
  }
}
.aClass {
  background-color: #bdd8e1;
}
.bClass {
  background-color: rgb(232, 193, 186);
}
.mClass {
  background-color: rgb(206, 188, 228);
}
.nClass {
  background-color: #d8dad9;
}
</style>