import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'

//配置axios
// import axios from "axios"

// axios.defaults.baseURL = "http:127.0.0.1:8888/api/private/v1/"
// axios.interceptors.reques.use(config=>{
//   console.log(config);
//   //在最后必须return config
//   return config
// })
// Vue.prototype.$http = axios;




//Element ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI)


import './assets/fonts/iconfont.css';

//配置echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts;

Vue.filter('dateFormat',function(originVal){
   const dt =  new Date(originVal)

   const y =  dt.getFullYear()
   const m =  (dt.getMonth()+ 1 +'').padStart(2,'0')
   const d =  (dt.getDate()+'').padStart(2,'0')

   const hh =  (dt.getHours()+'').padStart(2,'0')
   const mm =  (dt.getMinutes()+'').padStart(2,'0')
   const ss =  (dt.getSeconds()+'').padStart(2,'0')

   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  utils,
  render: h => h(App)
}).$mount('#app')
