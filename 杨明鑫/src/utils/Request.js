
import axios from "axios";


//对axios的二次封装成函数 便于函数的调用

// axios.defaults.baseURL = "http://47.115.85.237:3000/"

axios.interceptors.request.use(config=>{

    // config.header.Authorization = sessionStorage.getItem("token")
    // return config
    let token = null
    let data = sessionStorage.getItem("token")
    
    // token添加到header头Authorization中
    config.headers['Authorization'] = data


    return config
})
axios.interceptors.response.use((config)=>{
   return config
})



let Request = (params)=>{
    return new Promise((resolve,reject)=>{
        axios({
            ...params
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}


export {Request}