import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => {
      return import("@/views/admin/login")
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => {
      return import("@/views/admin/home")
    },
    redirect: "/welcome",
    children: [{
        path: '/welcome',
        name: 'Login',
        component: () => {
          return import("../components/Welcome.vue")
        }
      },
      {
        path: '/users',
        name: 'users',
        component: () => {
          return import("../views/admin/user/users.vue")
        }
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => {
          return import("../views/admin/user/roles.vue")
        }
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => {
          return import("../views/admin/user/rights.vue")
        }
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => {
          return import("../views/admin/user/goods.vue")
        }
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => {
          return import("../views/admin/user/categories.vue")
        }
      },
      {
        path: '/goods/add',
        name: 'add',
        component: () => {
          return import("../views/admin/user/add.vue")
        }
      },
      {
        path: '/goods/add1',
        name: 'add',
        component: () => {
          return import("../views/admin/user/add1.vue")
        }
      },
      {
        path: '/params',
        name: 'params',
        component: () => {
          return import("../views/admin/user/params.vue")
        }
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => {
          return import("../views/admin/user/orders.vue")
        }
      }, {
        path: '/reports',
        name: 'reports',
        component: () => {
          return import("../views/admin/user/reports.vue")
        }
      },



    ]
  },
  //Gow
  {
    path: '/gow',
    name: 'Gow',
    component: () => {
      return import("../views/GwcXiao/login")
    },
    children: [{
        path: '/shou',
        name: 'shou',
        component: () => {
          return import("../views/GwcXiao/daoheng/shou")
        }
      },
      {
        path: '/shang',
        name: 'shang',
        component: () => {
          return import("../views/GwcXiao/daoheng/shang")
        },
        children: [{
            path: '/oppo',
            name: 'oppo',
            component: () => {
              return import("../views/GwcXiao/daoheng/oppo")
            }
          },
          {
            path: '/dianshi',
            name: 'dianshi',
            component: () => {
              return import("../views/GwcXiao/daoheng/Dianshi")
            }
          },
        ]
      },

      {
        path: '/goshopping',
        name: 'goshopping',
        component: () => {
          return import("../views/GwcXiao/daoheng/shopping")
        }
      },
    ],

  },55555555555555555555555555555555555555555555555555555555555555555555555555555                                                                                                                                                      
  {
    path: '/',
    redirect: '/gow'
  }

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//获取原型对象上的push函数!!!!!!!非必须代码！！！！只为解决无关紧要的报错
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router