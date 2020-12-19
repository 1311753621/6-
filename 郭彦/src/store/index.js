import Vue from  "vue";

import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        ruleForm:[]
    },
    //操作state中的数据
    mutations:{
        login(state,a){
            //console.log('login',a)
            state.ruleForm = a
        }
    },

    //类似于VUE中的计算属性  对于state中的数据紧急性计算
    getters:{

    },

    //操作muntatios中的方法  同步操作
    cactios:{

    },

    //把vuex=进行模块处理
    modules:{
        
    }
})