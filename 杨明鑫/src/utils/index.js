// import axios from 'axios'
// import router from '../router'


// var instance = axios.create({
//     baseURL:`https://www.liulongbin.top:8888/api/private/v1/`,
//     timeout:'5000'
// })
// instance.interceptors.request.use(// 请求拦截器
//     (config)=>{
//         //读取sessionStorage中的数据  然后添加到请求头中
//         const token = sessionStorage.getItem('token')
//         if(token){
//             config.headers.Authorization = token
//         }
//         return config
//     },
//     (err)=>{


//     }
// )




// // 响应拦截器
// instance.interceptors.response.use((res)=>{
//     if(res.data.meta.status == 410){
//         sessionStorage.removeItem('token')
//         router.push('/login')
//     }
//     return res
// })


// export default instance;