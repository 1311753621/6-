<template>
    
  <div>
    <div class="card">
      <p>
        <i class="el-icon-shopping-cart-full" style="color: orange"></i>
        &nbsp;我的购物车&nbsp;<span
          >温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span
        >
      </p>
    </div>
    <el-table :data="card" style="width: 80%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="productName" label="商品名称"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://47.115.85.237:3000/' + scope.row.productImg"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价"> </el-table-column>
      <el-table-column prop="num" label="数量"> </el-table-column>
      <el-table-column label="小计">
        <template slot-scope="scope">
          <div>
            {{ scope.row.num * scope.row.price }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="del(scope.$index)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { card } from "@/api/user";
export default {
  name: "",
  data() {
    return {
      card: [],
    };
  },
  created() {
    this.getShoppingCart();
  },
  computed: {},
  methods: {
    //获取信息
    async getShoppingCart() {
      const { data: res } = await card(this.card);
      console.log(res);
      this.card = res.shoppingCartData;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: chocolate 2px solid;
  p {
    font-size: 26px;
    span {
      font-size: 12px;
    }
  }
}
.el-table {
  margin-left: 100px;
}
</style>
