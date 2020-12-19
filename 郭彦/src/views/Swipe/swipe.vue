<template>
  <div>
    <!-- 轮播图区域 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in imagelist" :key="index">
        <img :src="'http://47.115.85.237:3000/'+item.imgPath" alt style="width: 100%;height: 600px;"/>
      </van-swipe-item>
    </van-swipe>

    <!-- 图文配区域 -->
    <div class="nice">
      <el-row>
        <el-col :span="4" v-for="(item,index) in shoulist" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="'http://47.115.85.237:3000/'+item.product_picture" alt style="width: 100%;height: 350px;">
            <div style="padding: 14px;">
              <p class="nav1">{{item.product_name}}</p>
              <p class="nav2">{{item.product_title}}</p>
              <p class="navs"><span class="nav3">{{item.product_selling_price}}元</span><span class="nav4">{{item.product_price}}元</span></p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 轮播图数据
      imagelist: [],

      // 图文配数据
      shoulist:[]
    };
  },
  mounted() {
    this.getdata();
    this.getdatas()
  },

  computed: {},
  methods: {
    // 获取轮播图数据事件
    getdata() {
      this.$axios.post("/resources/carousel").then(res => {
        // console.log(res);
        this.imagelist = res.data.carousel;
      });
    },

    // 获取图文配数据事件
    getdatas(){
      this.$axios.post('/product/getAllProduct').then(res=>{
        console.log(res)
        this.shoulist = res.data.Product
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.nice{
  width: 100%;
  height: 100%;
}

.nav1{
  font-size: 16px;
  text-align: center;
  color:#000;
}

.nav2{
  font-size: 14px;
  color: #999;
  text-align: center;
}

.navs{
  text-align: center;
}

.nav3{
  font-size: 18px;
  color: orange; 
}

.nav4{
  font-size: 16px;
  color: #ddd;
}

.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
