import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/shou',
        name: 'Shou',
        component: () => import('../views/shou/index.vue')
      }, {
        path: '/all',
        name: 'All',
        component: () => import('../views/shou/all.vue'),
        children: [
          {
            path: '/iphone',
            name: 'Iphone',
            component: () => import('../views/shou/iphone.vue')
          },
          {
            path: '/television',
            name: 'television',
            component: () => import('../views/shou/television.vue')
          }
        ]
      },
      {
        path: '/card',
        name: 'card',
        component: () => import('../views/shou/card.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/') return next();
//   const tokenStr = window.sessionStorage.getItem('token');
//   if (!tokenStr) return next('/');
//   next();
// })

//获取原型对象上的push函数!!!!!!!非必须代码！！！！只为解决无关紧要的报错
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
