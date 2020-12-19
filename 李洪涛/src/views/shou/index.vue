<template>
    
  <div>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in this.carousel" :key="item.id">
        <img :src="'http://47.115.85.237:3000/' + item.imgPath" />
      </el-carousel-item>
    </el-carousel>
    <div class="pic">
      <el-row>
        <el-col :span="6" v-for="index in product" :key="index.id">
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="'http://47.115.85.237:3000/' + index.product_picture"
              class="image"
            />
            <div style="padding: 14px">
              <p>{{ index.product_name }}</p>
              <p>{{ index.product_title }}</p>
              <p style="color:red">
                {{ index.product_selling_price
                }}元 &nbsp;&nbsp;&nbsp;&nbsp;<s style="color:#cccccc ">{{ index.product_price }}元</s>
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

</div>
</template>

<script>
import { carousel, product } from "@/api/user";
export default {
  name: "",
  data() {
    return {
      carousel: [],
      currentDate: new Date(),
      product: [],
    };
  },
  created() {
    this.postPic();
    this.getHotProduct();
  },
  computed: {},
  methods: {
    // 获取轮播图数据
    async postPic() {
      const { data: res } = await carousel(this.carousel);
      this.carousel = res.carousel;
      // console.log(res);
    },
    //获取热门内容数据
    async getHotProduct() {
      const { data: res } = await product(this.product);
      console.log(res);
      this.product = res.Product;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-carousel {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
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
</style>
