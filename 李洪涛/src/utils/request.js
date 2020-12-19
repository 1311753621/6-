/*jshint esversion: 8 */
import axios from 'axios';


//通过axios实例配置请求的公共接口
const request = axios.create({
    baseURL:'/api',
    timeout: 5000//请求超时
});
//配置请求拦截
// 添加请求拦截器
request.interceptors.request.use(function (config){
    // config.headers['Authorization'] = sessionStorage.getItem('token') || '';
    // console.log( sessionStorage.getItem('token'));
    
    return config;
},function(error){
    return Promise.reject(error);
});
//配置响应拦截
//添加响应拦截器
request.interceptors.response.use(function (response){
    return response;
},function(error){
    return Promise.reject(error);
});

export default request//导出axios对象
