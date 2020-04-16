import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import Axios from '../http'

Vue.use(Vuex);
const store = new Vuex.Store({
  // ...
  state: {
    uid: Cookies.get('userId'),
    token: Cookies.get('userToken'),
    userInfo: Cookies.get('role'),
    roles: [],
    adminGroup: "",
    // 菜单栏权限生成动态路由需要
    list:[],
    // 操作按钮权限。根据自定义指令显示或者判断是否存在权限
    btnList:['permission'],
    sandgroups:"",
    loginsucess: true,
    columns:"",
    navdata:JSON.parse(localStorage.getItem('content')) || {}
  },
  mutations: { //同步操作
    setnav(state,nav){
      state.navdata=nav.content
      // console.log(nav)
    },
    // 点击登陆设置uid标识
    setToken: (state,data) => {
      state.token = data.token;
      state.userInfo = data.role;
      // console.log(data)

    },
    //确定cookie放到状态管理数据中
    getToken(state) {
      // console.log(state.token,state.userInfo)
    },
    loginout: (state, uid) => {
      //    localStorage.removeItem('token');
      //     state.token = null
    },
    //用户登录获得的用户角色和对应的权限 列表 
    SET_ROLES: (state, roles) => {
      state.roles = roles
      console.log(roles)
    },
     setList:(state,data)=>{
        state.list=data
     },
    // 全局搜索功能

    //  全局角色组数据
    setGroup:function(state){
      Axios.get("/api/v1/admin/user/roleGroup").then(function (res) {
        let data = res["data"]["data"]
        state.adminGroup=data
        console.log(data)
      }).catch(function (err) {
        alert(err)
      })
    
    },
    sandgroup(state){
      Axios.post("/api/v1/admin/sand/group/select").then(function (res) {
        console.log(res)
        if (res['data']['code']==0) {
           state.sandgroups=res['data']['data']
        }else{
        }
      })
    },
   
  // 获取文章栏目类型列表
  column(state){
    Axios.post("/api/v1/admin/tool/select/article/column").then(function (res) {
      state.columns=res['data']
    })
  }
  },
  actions: {
    getpermission({commit}){
      Axios.get("/api/v1/admin/user/roleGroup").then(function (res) {
        // let data = res["data"]["data"]
        // state.adminGroup=data
        // console.log(data)
        var data=[1,2]
        store.commit("setList",data)
      }).catch(function (err) {
        alert(err)
      })
    },
    sandgroup(){
      Axios.post("/api/v1/admin/sand/group/select").then(function (res) {
        console.log(res)
      })
    },
    // 前端 登出
 
  },
  

  //时时检测uid是否实际改变
  getters: {
    uid: state => state.uid, //用户id//模块化的原因user模块
    token: state => state.token, //用户令牌
    userInfo: state => state.userInfo, //用户所有信息
    roles: state => state.roles,


  }

})
export default store
