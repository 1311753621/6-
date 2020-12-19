import { Loading } from 'vant';
<template>
  <div>
    <el-container>
      <!-- 头部导航区域 -->
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/swipe' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>全部商品</el-breadcrumb-item>
          <el-breadcrumb-item>分类</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>

      <!-- 主体区域 -->
      <el-main>
        <!-- 选项卡切换区域 -->
        <el-tabs type="card" @tab-click="handleClick">
          <el-tab-pane label="全部">
            <!-- 图文配区域 -->
            <div class="nice" @click="toshppen">
              <el-row>
                <el-col :span="4" v-for="(item,index) in shoulist" :key="index">
                  <el-card :body-style="{ padding: '0px' }">
                    <img
                      :src="'http://47.115.85.237:3000/'+item.product_picture"
                      alt
                      style="width: 100%;height: 350px;"
                    />
                    <div style="padding: 14px;">
                      <p class="nav1">{{item.product_name}}</p>
                      <p class="nav2">{{item.product_title}}</p>
                      <p class="navs">
                        <span class="nav3">{{item.product_selling_price}}元</span>
                        <span class="nav4">{{item.product_price}}元</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <!-- 分页区域 -->
            </div>
          </el-tab-pane>
          <el-tab-pane v-for="(item,index) in xuanlist" :key="index" :label="item.category_name">
          </el-tab-pane>
        </el-tabs>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 图文配数据
      shoulist: [],
      xuanlist: []
    };
  },
  mounted() {
    this.getdatas();
    this.getlist();
  },
  computed: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if(tab.index == "1"){
      this.$router.push('/huawei')
      }
    },

    // 获取图文配数据事件
    getdatas() {
      this.$axios.post("/product/getAllProduct").then(res => {
        // console.log(res);
        this.shoulist = res.data.Product;
      });
    },

    //选项卡数据获取
    getlist() {
      this.$axios.post("/product/getCategory").then(res => {
        console.log(res);
        this.xuanlist = res.data.category;
      });
    },

    //列表进入详情页逻辑代码
    toshppen() {
      this.$router.push("/shppen");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  height: 80px;
  .el-breadcrumb {
    margin-top: 20px;
    .el-breadcrumb-item {
      font-size: 25px;
    }
  }
}

.cards {
  font-size: 20px;
  font-weight: bold;
  color: #000;
}

.nice {
  width: 100%;
  height: 100%;
}

.nav1 {
  font-size: 16px;
  text-align: center;
  color: #000;
}

.nav2 {
  font-size: 14px;
  color: #999;
  text-align: center;
}

.navs {
  text-align: center;
}

.nav3 {
  font-size: 18px;
  color: orange;
}

.nav4 {
  font-size: 16px;
  color: #ddd;
}
</style>