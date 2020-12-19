export default [
    //主体页面
    {
        path: '/home',
        name: 'home',
        component: () => import("@/views/Home/home.vue"),
        children: [
            //首页页面
            {
                path: '/swipe',
                name: 'swipe',
                component: () => import("@/views/Swipe/swipe.vue")
            },
            //购物车页面
            {
                path: '/shppen',
                name: 'shppen',
                component: () => import("@/views/Shppen/shppen.vue")
            },
            //全部商品
            {
                path: '/whole',
                name: 'whole',
                component: () => import("@/views/Whole/whole.vue"),
                children: [
                    //详情页页面
                    {
                        path: '/mediacont/:id',
                        name: 'mediacont',
                        component: () => ("@/views/Mediacont/mediacont.vue")
                    },

                ]
            },
            {
                path: '/huawei',
                name: 'huawei',
                component: () => ("@/views/Whole/huawei.vue")
            },

        ]
    },
    {
        path: '/',
        redirect: '/home'
    },
]