import axios from '../utils/request'

//登录接口
export function login(i) {
    return axios({
        url: '/users/login',
        method: "POST",
        data: {
            userName: i.userName,
            password: i.password
        }
    })
}

//轮播图数据
export function carousel() {
    return axios({
        url: '/resources/carousel',
        method: 'POST',
    })
}

//热门图片
export function product() {
    return axios({
        url: '/product/getHotProduct',
        method: "POST",
        data: {
            "categoryName": ["电视机", "空调", "洗衣机", "保护套", "保护膜", "充电器", "充电宝"]
        }
    })
}
//全部商品数据
export function all(data){
    return axios({
        url:'/product/getAllProduct',
        method:'POST',
        data
    })
}
//获取分类
export function fen(){
    return axios({
        url:'/product/getCategory',
        method:'POST',
    })
}
//商品分类数据
export function lei(data){
    return axios({
        url:'/product/getProductByCategory',
        method:'POST',
        data
    })
}
//购物车

export function card(){
    return axios({
        url:'/user/shoppingCart/getShoppingCart',
        method:'POST',
        data:{"user_id":1404}
    })
}
// 添加购物车接口
export function buy(){
    return axios({
        url:'/user/shoppingCart/addShoppingCart',
        method:'POST',
        data:{"user_id":1404,"product_id":3}
    })
}