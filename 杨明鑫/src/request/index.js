import {
    Request
} from "../utils/Request";

export const roleList = (data) => Request({
    url: `/roles`,
    method: "get",
    data
})
export const rolesremoveByid = (err, rightId) => Request({
    url: `/roles/${err}/rights/${rightId}`,
    method: "DELETE",
})
export const rolesrolesaddList = (data) => Request({
    url: `/roles`,
    method: "post",
    data
})
export const rolesshowEditDialog = (id, data) => Request({
    url: `/roles/${id}`,
    method: "get",
    data
})
export const rolesroleslistadd = (id, data) => Request({
    url: `/roles/${id}`,
    method: "put",
    data
})
export const rolesdel = (id, data) => Request({
    url: `/roles/${id}`,
    method: "delete",
    data
})

export const rolesgetrolseList = (data) => Request({
    url: `/roles`,
    method: "get",
    data
})
export const rolesListId = (id, rigthId) => Request({
    url: `/roles/${id}/rights/${rigthId}`,
    method: "delete",
})

export const rolesrolesListAdd = (data) => Request({
    url: `/roles`,
    method: "post",
    data
})

export const rolesrolesBian = (id, data) => Request({
    url: `/roles/${id}`,
    method: "get",
    data
})

export const rolesgetrolseGai = (id, data) => Request({
    url: `/roles/${id}`,
    method: "put",
    data
})

export const rolesdeld = (id, data) => Request({
    url: `/roles/${id}`,
    method: "delete",
    data
})




// Gow
// 登录
export const getLoginList = (data) => Request({
    url: `api/users/login`,
    method: "Post",
    data
})
// // 主页轮播图接口
export const loginLun = (data) => Request({
    url: `api/resources/carousel`,
    method: "post",
    data
})

// 热门
export const reList = () => Request({
    url: `api/product/getHotProduct`,
    method: "post",
    data: {
        "categoryName": ["电视机", "空调", "洗衣机", "保护套", "保护膜", "充电器", "充电宝"]
    }
})

//商品导航数据
export const ShangList = (data) => Request({
    url: `api/product/getCategory`,
    method: "post",
    data
})

// 商品数据
export const ShangGetList = (data) => Request({
    url: `api/product/getAllProduct`,
    method: "post",
    data
})

// 商品分类
export const ShangFenList = (data) => Request({
    url: `api/product/getProductByCategory`,
    method: "post",
    data
})


// 购物车数据
export const Goodshopping = (data) => Request({
    url: `api/user/shoppingCart/getShoppingCart`,
    method: "post",
    data: {
        "user_id": 1404
    }
})

export const getaddshoppingList = (data) => Request({
    url: `api/user/shoppingCart/addShoppingCart`,
    method: "post",
    data
})