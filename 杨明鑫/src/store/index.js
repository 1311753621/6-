import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //token数据持久化，防止页面刷新丢失
    token: localStorage.getItem('token') || '',
    user:[]
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    getLogin(state,obj){
      state.user.push(obj)
    }
  },
  actions: {

  },
  getters: {
    //根据token是否存在，设置计算属性isLogin
    isLogin(state) {
      return !!state.token
    }
  }
})
