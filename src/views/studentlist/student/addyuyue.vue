<template>
  <div class="main">
    <headson :headson="headson"></headson>
       <div class="work">
           <a href=javascript:history.back() class="del">
                         <i class="iconfont icon-chehuisekuai"></i>
返回</a>
                
      </div>
    <div class="contain">
      <table>
        <tbody>
          <tr>
            <td width="20" align="left" valign="top">■</td>
            <td>
              说明：
              <br>1、请详尽和真实的填写下面所有信息，特别是联系方式，以便及时与您取得联系；
              <br>2、由于可用咨询时间变化很大，请在预约后等待接待人员与您核实具体咨询时间；
              <br>3、心理咨询可能需要持续几周或者更长时间，请事先做好充分的准备。
            </td>
          </tr>
          <tr>
            <td align="right">■</td>
            <td>您现在最需要接受帮助的主要问题是什么？</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <textarea name="question" id="question" class="text"></textarea>
            </td>
          </tr>
          <tr>
            <td align="right">■</td>
            <td>在近半年里，是否发生了对您有重大影响的事（如亲友的死亡、法律诉讼、失恋等）？</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <textarea name="question" id="question" class="text"></textarea>
            </td>
          </tr>
          <tr>
            <td align="right">■</td>
            <td>请把您最方便的联系方式写在下面：</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input type="text" name id>
            </td>
          </tr>
        </tbody>
      </table>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="咨询师列表：" width="180"></el-table-column>
        <el-table-column prop="name" label width="180"></el-table-column>
        <el-table-column prop="address" label></el-table-column>
      </el-table>
        <div class="jinji">
          <span @click="addnumber">点击选择咨询师和咨询时间:</span>
          <i>咨询师：咨询师H，日期：2019-04-24，时间：08:55-11:22</i>
        </div>
        <div class="add" @click="submit">提交</div>
      <el-dialog title="沙盘添加" :visible.sync="dialogFormVisible">
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="editsure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headson from "../../../components/headson";

export default {
  data() {
    return {
      dialogFormVisible: false,
      headson: ["心理咨询预约", "可以预约想要的时间段和咨询师"],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    addnumber() {
      this.dialogFormVisible = true;
    },
    editsure() {
      this.dialogFormVisible = false;
    },
    submit(){

    }
  },
  components: {
    headson: headson
  }
};
</script>

<style lang="scss" scoped>
.contain {
  padding: 20px;
  min-height: 1000px;
  border: 1px solid #e6e6e8;
  margin: 0 auto;
  width: 1000px;
  margin-top: 30px;
  background-color: #ffffff;
  tbody {
    tr {
      display: block;
      margin-top: 20px;
      vertical-align: inherit;
      border-color: inherit;
      font-size: 14px;
      textarea {
        padding: 10px;
        background: #fff;
        border: 1px solid #cae7f7;
        color: #09c;
        width: 600px;
        min-height: 50px;
      }
      input{
           border: 1px solid #cae7f7;
           height: 30px;
      }
    }
  }
}
.jinji {
      border: 1px solid #ccc;
      margin-top: 20px;

      span,
      i {
        display: inline-block;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #e7f3ff;
      }

      span {
          cursor: pointer;
        width: 200px;
        color: #06c;
        border-right: 1px solid #ccc;
      }
    }
    .add,
  .complete {
    width: 310px;
    height: 25px;
    margin: 0 auto;
    text-align: center;
    margin-top: 20px;
    line-height: 25px;
    position: relative;
    color: gray;
    border: 1px solid #dfd7d7;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
  }
    .work {
      margin: 33px auto;
     width: 1000px;
      a {
        display: inline-block;
        float: right;
        width: 60px;
        height: 20px;
        background-color: #ffffff;
        font-size: 12px;
        text-align: center;
        line-height: 15px;
        border-radius: 5px;
        border: 1px solid #9f9a9b;
        cursor: pointer;
        i {
          font-size: 20px;
             position: relative;
          top:3px
        }
      }
      span:nth-child(1) {
        margin-left: 20px;
      }
    }
</style>