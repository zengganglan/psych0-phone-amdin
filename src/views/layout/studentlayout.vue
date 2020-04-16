<template>
  <div class="app-wrapper">
    <div class="headtop">
      <top/>
    </div>
    <div class="main-container">
      <Navbar/>
      <div>
        <headson/>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import top from "./head";
import Navbar from "./studentnavbar";
import headson from "../../components/headson";
export default {
  name: "layout",
  components: {
    top,
    Navbar,
    headson
  }
};
</script>

<style scoped>
.app-wrapper {
  padding-top: 40px;
}
.headtop {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 40px;
  z-index: 999;
}
.main-container {
  /* 由两个子元素撑开 */
  display: flex;
  min-height: 1260px;
}
.main-container > div:nth-child(2) {
  flex: 1;
  background-color: #f8f8fa;
  /* 右边部分不影响其他盒子也不被别人影响· */
  overflow: hidden;
}
</style>