<template>
   <div class="pagi">
      <div class="pagination">
        <span class="first iconfont icon-fenyezuiqianye" @click="first"></span>
        <span class="pre iconfont icon-fenyeshangyiye" @click="prev"></span>
        <input
          type="text"
          v-model="currentpage"
          class="page"
          @click="show"
          @keyup.enter="updatepage"
        >
        <span class="check iconfont icon-xuanzekuang" @click="show"></span>
        <span class="next iconfont icon-pagernext" @click="nex"></span>
        
        <span class="end iconfont icon-fenyezuihouye" @click="last"></span>

        <ul class="pages" v-if="flag" @click="check()">
          <!-- 根据allpage动态渲染 加滚动条 -->
          <li v-for="index in countpage" :key="index">{{index}}</li>
        </ul> 
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentpage: this.page.currentpage,
      countpage: this.page.countpage,
      pagesize: this.page.pagesize,
      flag: this.page.flag
    };
  },
  created() {
    console.log(this.page);
  },
  methods: {
    //分页下拉框显示
    show() {
      this.flag = !this.flag;
    },
    //点击下拉框选择时就请求数据重新刷新
    check() {
      var target = event.target;
      this.flag = false;
      this.currentpage = target.innerHTML;
      //调用请求数据方法
    },
    // 根据allpage/pagesize更新数据，手动输入enter键更新数据
    updatepage() {
      // 总数据
      console.log(1, this.countpage);
      this.flag = false
      //调用请求数据方法
    },
    //点击返回首页
    first() {
      this.currentpage = 1;
    },
    // 点击返回最后一页
    last() {
      this.currentpage = this.countpage;
    },
    //点击返回前一页
    prev() {
      if (this.currentpage > 1) {
        this.currentpage = this.currentpage - 1;
        console.log(this.currentpage);
      }
    },
    //点击返回后一页
    nex() {
      if (this.currentpage < this.countpage) {
        this.currentpage = this.currentpage - 0 + 1;
        console.log(typeof this.currentpage);
      }
    }
  },
  props: ["page"]
};
</script>

<style lang='scss' scoped>

.pagi {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: flex-end;
  margin-top: 20px;
}
.pagination {
  width: 200px;
  height: 30px;
  position: relative;
  cursor: pointer;
  input {
    border: 0;
    outline: none;
  }
  .first {
    position: absolute;
    top: 8px;
    display: inline-block;
  }
  .pre {
    position: absolute;
    top: 4px;
    left: 23px;
    width: 24px;
    border-radius: 5px;
    height: 24px;
    border: 1px solid #9f9a9b;
    line-height: 24px;
    text-align: center;
    font-size: 20px;
  }
  .page {
    position: absolute;
    top: 4px;
    left: 58px;
    width: 57px;
    padding-left: 20px;
    height: 24px;
    border: 1px solid #9f9a9b;
    border-radius: 5px;
    background-color: #f8f8fa;
  }
  .check {
    position: absolute;
    top: 5px;
    left: 110px;
    width: 20px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border-left: 1px solid #9f9a9b;
  }
  .next {
    position: absolute;
    top: 4px;
    left: 140px;
    width: 30px;
    height: 24px;
    border: 1px solid #9f9a9b;
    line-height: 24px;
    text-align: center;
    font-size: 20px;
    border-radius: 5px;
  }
  .end {
    position: absolute;
    top: 8px;
    left: 175px;
    display: inline-block;
  }
  .pre,
  .next {
    width: 30px;
    font-size: 12px;
  }

  .pages {
    max-height: 150px;
    overflow: auto;
    position: absolute;
    left: 60px;
    top: 30px;
    width: 50px;
    border: 1px solid #9f9a9b;
    text-align: center;

    background-color: white;
    > li {
      height: 20px;
      border-bottom: 1px solid #9f9a9b;
    }
  }
}
</style>