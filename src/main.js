// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import './assets/js/rem'
import ElementUI from 'element-ui';
import $ from 'jquery'
// 引入方式
import { global } from './global/global';//全局功能函数随处调调用
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import Axios from './http'
import layer from 'vue-layer'
import echarts from 'echarts'
// 弹窗组件
Vue.prototype.$layer = layer(Vue);
// echart
Vue.prototype.$echarts = echarts;
Vue.prototype.axios = Axios;
Vue.use(ElementUI);
import router from './router/index'
import store from './store/index'
//引入公共样式文件
import "./assets/css/common.css"
import "./assets/css/iconfont.css"
//axios挂载在vue上面
Vue.prototype.axios = Axios;
import { routerMatch, asyrouter } from './router/index'

// var permission = [{ path: "/data/game/gameCenter", permission: [1, 2, 3] }, { path: "/data/game/gamedetail", permission: [1, 2, 3] }]
// if (store.state.list.length === 0) {
//   // 如果没有权限列表就重新请求拿到权限开始匹配动态生成路由
//   routerMatch(permission, asyrouter).then(res => {
//     console.log(res[0])
//     router.addRoutes(res[0])
//     // 看不到但是已经存在具有权限的路由  
//   }).catch(() => {
//     router.replace('/')
//   })
// }

//路由
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  //如果跳转页面存在uid表示登陆过 可以跳转，否则不能跳转
  var whitelist = ["/login","/loginindex", "/register", "/getUserPassword", '/studentindex/gpartical']
  if (store.getters.token) {
    next()
    var role = store.state.userInfo
    if (typeof (role) == 'string') {
      role = JSON.parse(role)
    }
    console.log(role['type'])
    if (role['type'] == 1 || role['type'] == 2) {
      //只有管理员返回成功出现弹窗。可以点击进入系统/跳转相关页面
      store.state.loginsucess = false;
    }

  } else {
    // 如果要去的路由是白名单即使没有token 也可以跳转
    if (whitelist.indexOf(to.path) !== -1) {
      store.state.loginsucess = true;
      next()
    } else {
      //执行的时候uid还没设置上,刷新时候uid才放到数据库才能正确判断。当第一次登陆应该设置cokie跳转本应该可以跳转可是路由监测还没有存在uid,因为cookie.js,没有很快获取到放到数据，刚开始登陆的时候需要我们手动设置
      store.state.loginsucess = true;
      next('/login')

      alert("没有登陆，请去登陆")
      console.log(from, to)
    }
  }

})
store.commit("setGroup")
// 根据学校分类了。没登录没有权限获取
if (store.getters.token) {
  store.commit("column")
}

/* eslint-disable no-new */
const Bus = new Vue()

new Vue({
  el: '#app',
  data:{
    Bus
  },
  router,
  store,
  components: { App },
  template: '<App/>'
})

