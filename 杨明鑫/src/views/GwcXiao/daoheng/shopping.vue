<template>
  <div>
    <p><i class="el-icon-shopping-cart-full"></i>购物车</p>
    <el-table :data="goodList" style="width: 80%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="productName" label="商品名称" width="180">
          <template slot-scope="scope">
              <div>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="'http://47.115.85.237:3000/' + scope.row.productImg"
                ></el-image>
              </div>
            </template>
      </el-table-column>
      <el-table-column prop="price" label="单价" width="180"> </el-table-column>
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
import { Goodshopping } from "../../../request/index";
export default {
  name: "",
  data() {
    return {
      goodList: [],
    };
  },
  created() {
    this.getgoodList();
  },
  mounted() {},
  computed: {},
  methods: {
    async getgoodList() {
      const { data: res } = await Goodshopping(this.goodList);
      console.log(res);
      this.goodList = res.shoppingCartData;
    },

     // 删除
    del(index) {
      this.$store.commit("delCart", index);
    },
  },
};
</script>

<style lang='scss' scoped>
.el-icon-shopping-cart-full {
  color: coral;
}
.el-table{
    margin-left: 150px;
    img{
        width: 50px;
    }
}
</style>
