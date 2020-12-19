
import { Request } from "../utils/Request";

// //登录接口
export const login = (data)=>Request({
    url:`/login`,
    method:"post",
    params:data
})

//左侧区域
export const menus = (data)=>Request({
    url:`/menus`,
    method:"get",
    params:data
})
// 用户列表数据
export const Listusers=(data)=>Request({
    url:"/users",
    method:"get",
    params:data
})
//添加接口
export const Addusers= (form)=>Request({
    url:'/users',
    method:"post",
    data:{
        email:form.email,
        mobile:form.mobile,
        password:form.password,
        username:form.username,
    }
})

// 用户修改
export const Modifyusers=(url,data)=>Request({
    url:url,
    method:"get",
    data 
})
//编辑用户提交
export const TiJiao=(id,data)=>Request({
    url:`users/${id}`,
    method:"put",
    data
})
// 用户查询
export const Findusers=(data)=>Request({
    url:"/users",
    method:"get",
    params:data
})
// 用户删除
export const Dealusers=(url)=>Request({
    url:url,
    method:"delete",

})
// 修改用户状态
export const Modifystatus=(id,state)=>Request({
    url:`/users/${id}/state/${state}`,
    method:"put",
    
})
 
//权限列表
export const quanxian=(data)=>Request({
    url:`/rights/list`,
    method:"get",
    data
})

//角色列表
export const juese=(data)=>Request({
    url:`/roles`,
    method:"get",
    data
})

//获取角色列表
export const rolesList=(data)=>Request({
    url:`/roles`,
    method:"get",
    data
})

//角色查询id
export const juesecha=(id,data)=>Request({
    url:`/roles/${id}`,
    method:"get",
    data
})

export const juesexiu=(id,data)=>Request({
    url:`roles/${id}`,
    method:"put",
    data
})

//角色列表添加
export const jueseadd=(data)=>Request({
    url:`/roles`,
    method:"post",
    data
})

//角色删除
export const juesedel=(id)=>Request({
    url:`/roles/${id}`,
    method:"delete",
    
})
//权限 添加角色

export const rolesADD=(data)=>Request({
    url:`/roles`,
    method:"post",
    data
})
//删除角色指定权限
export const jueseshan=(role,rightId)=>Request({
    url:`/roles/${role}/rights/${rightId}`,
    method:"delete",
    
})
//查询修改
export const rolesxiu=(id)=>Request({
    url:`/roles/${id}`,
    method:"GET",
})

export const rolesgai=(id,data)=>Request({
    url:`/roles/${id}`,
    method:"put",
    data
})

export const rolesshan=(role,rightId)=>Request({
    url:`/roles/${role}/rights/${rightId}`,
    method:"delete",
    
})
//删除
export const rolesListshan=(id)=>Request({
    url:`/roles/${id}`,
    method:"delete",
    
})


//获取所有权限列表
export const juesehuo=(data)=>Request({
    url:`/rights/tree`,
    method:"get",
    data
})

//角色授权
export const jueseshou=(roleId)=>Request({
    url:`/roles/${roleId}/rights`,
    method:"post",
})

//商品分类数据列表
export const shengp=(data)=>Request({
    url:`/categories`,
    method:"get",
    data
})

//获取商品列表
export const shengpLie=(data)=>Request({
    url:`/goods?query=${data.query}&pagenum=${data.pagenum}&pagesize=${data.pagesize}`,
    method:"get",
    data:{
        query:data.query,
        pagenum:data.pagenum,
        pagesize:data.pagesize,
    }
})

//删除商品
export const shengpShan=(id)=>Request({
    url:`/goods/${id}`,
    method:"DELETE",
    
})

//获取商品列表添加页面
export const getcatelist=()=>Request({
    url:'/categories',
    method:"GET",
})

export const getmanylist=(id)=>Request({
    url:`/categories/${id}/attributes?sel=many`,
    method:"GET",
    data:{
        sel:"many"
    }
})


//获取参数列表

export const getSanList=(id,err)=>Request({
    url:`/categories/${id}/attributes?sel=${err}`,
    method:"GET",
    data:{
        sel:err
    }
})
//订单获取
export const getrodersList=(id,err)=>Request({
    url:`/orders/${id}/attributes?sel=${err}`,
    method:"GET",
    data:{
        sel:err
    }
})





