<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-top: 15px"
    >
      <el-breadcrumb-item :to="{ path: '/shou' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全部商品</el-breadcrumb-item>
      <el-breadcrumb-item>分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="box" style="margin-top: 15px">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <el-row>
            <el-col
              :span="4"
              v-for="index in all"
              :key="index.id"
              style="padding: 10px"
            >
              <el-card :body-style="{ padding: '10px' }" shadow="hover" >
                <img
                  :src="'http://47.115.85.237:3000/' + index.product_picture"
                  class="image"
                  @click="addShoppingCart"
                />
                <div style="padding: 14px">
                  <p>{{ index.product_name }}</p>
                  <p>{{ index.product_title }}</p>
                  <p style="color: red">
                    {{ index.product_selling_price }}元
                    &nbsp;&nbsp;&nbsp;&nbsp;<s style="color: #cccccc"
                      >{{ index.product_price }}元</s
                    >
                  </p>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <!-- 分页器 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-tab-pane>
        <!-- 分类 -->
        
        <el-tab-pane
          v-for="item in fen"
          :key="item.id"
          :label="item.category_name"
        >
          <router-view></router-view>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { all, fen, lei,buy } from "@/api/user";
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      all: [],
      fen: [],
      total: 0,
      query: {
        pageSize: 5,
        currentPage: 1,
      },
      buy:{
        user_id:1404,
        product_id:3
      }
      // leis: {
      //   categoryID: [1],
      //   currentPage: 1,
      //   pageSize: 6,
      // },
      // lei: [],
    };
  },
  created() {
    this.getCategory();
    this.getAllProduct();
  },
  computed: {},
  methods: {
    //获取商品数据
    async getCategory() {
      const { data: res } = await fen(this.fen);
      // console.log(res);
      this.fen = res.category;
    },
    //全部商品
    async getAllProduct() {
      const { data: res } = await all(this.query);
      // console.log(res);
      this.all = res.Product;
      this.total = res.total;
    },
    handleSizeChange(newSize) {
      this.query.pageSize = newSize;
      this.getAllProduct();
    },
    //监听 页码值  改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.query.currentPage = newPage;
      this.getAllProduct();
    },
    // //分类
    // async getProductByCategory() {
    //   const { data: res } = await lei(this.leis);
    //   console.log(res);
    // },
    handleClick(tab, event) {
      console.log(tab, event);
      if(tab.index == "1"){
        this.$router.push('/iphone')
      }
      if(tab.index == "2"){
        this.$router.push('/television')
      }
      
    },
    async addShoppingCart(){
      const {data:res} = await buy(this.buy);
      console.log(res);
      console.log(123);
    }
  },
};
</script>

<style lang="scss" scoped>
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
</style>
