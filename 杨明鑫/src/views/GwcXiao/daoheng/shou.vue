<template>
  <div>
    <!-- 轮播图区域 -->
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in getLunList" :key="item.id">
        <img :src="'http://47.115.85.237:3000/' + item.imgPath" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div>
      <p>手机</p>
      <el-row>
        <el-col
          :span="5"
          v-for="item in remenList"
          :key="item.id"
        >
          <el-card >
            <img  :src="'http://47.115.85.237:3000/' + item.product_picture" alt="">
            <div style="padding: 14px">
              <span class="span1">{{item.product_name}}</span>
              <p>{{item.product_title}}</p>
              <p>{{item.product_price}}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { loginLun, reList } from "../../../request/index";
export default {
  name: "",
  data() {
    return {
      getLunList: {},
      remenList: {
        categoryName: [
          "电视机",
          "空调",
          "洗衣机",
          "保护套",
          "保护膜",
          "充电器",
          "充电宝",
        ],
      },
    };
  },
  created() {
    this.LunList();
    this.getremenList();
  },
  mounted() {},
  computed: {},
  methods: {
    // 轮播图
    async LunList() {
      const { data: res } = await loginLun(this.getLunList);
      console.log(res);
      this.getLunList = res.carousel;
    },

    async getremenList() {
      const { data: res } = await reList(this.remenList);
      console.log(res);
      this.remenList = res.Product;
    },
  },
};
</script>

<style lang='scss' scoped>
// 轮播图
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel {
  width: 100%;
  height: 100%;
  background: white;
  img {
    width: 100%;
    height: 100%;
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
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
  clear: both;
}

.span1{
    font-size: 13px;
}
.el-card{
    height: 400px;
    margin: 20px;
}
</style>
