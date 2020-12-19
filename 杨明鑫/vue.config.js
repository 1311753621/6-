// gzip压缩
// const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'nprogress': 'NProgress',
        'axios': 'axios',
        'elementui': 'ELEMENT',
    },
    // cdn的css链接
    css: [
        'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css',
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    // cdn的js链接
    js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
        'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
        'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
        'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
        'https://unpkg.com/element-ui/lib/index.js'
    ]
}


// 本地环境是否需要使用cdn
const devNeedCdn = false
module.exports = {
    productionSourceMap: false,
    devServer:{
        host:'localhost',
        port:'8080',
        https:false,
        open:true,
        proxy:{
            "/api":{
                target:'http://47.115.85.237:3000/',
                changeOrigin:true,
                pathRewrite:{
                    "^/api":''
                }
            }
        }
    },
    // chainWebpack:confirm =>{
    //     confirm.when(process.env.NODE_ENV) === 'prodiction',confirm=>{
    //         confirm.entity('app').clear().add('./src/main-prod.js')
    //     }
    //     confirm.when(process.env.NODE_ENV) === 'developemt',confirm=>{
    //         confirm.entity('app').clear().add('./src/main-dev.js')
    //     }

    // }
}