import { Slider } from 'vant';
<template>
  <div>
    <div class="top">
      <p>
        <span class="el-icon-shopping-cart-full btn_che"></span>
        <span class="btn_che1">我的购物车</span><span class="btn_che2">温馨提示:产品是否购买成功,以下最终下单为准哦,请尽快结清</span>
      </p>
    </div>

    <el-table :data="shppenlist" border style="width: 90%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="productImg" label="图片"></el-table-column>
      <el-table-column prop="address" label="商品名称"></el-table-column>
      <el-table-column prop="date" label="单价"></el-table-column>
      <el-table-column prop="name" label="小计"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <el-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
            <el-button>x</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      shppenlist:[]
    };
  },
mounted(){
  this.getdata()
},
  computed: {},
  methods: {
    getdata(){
      this.$axios.post('/user/shoppingCart/addShoppingCart').then(res=>{
        console.log(res)
        this.shppenlist = res.data.shoppingCartData
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-left: 100px;
}

.top{
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  border-bottom: 3px solid orange;
  p{
    line-height: 60px;
    .btn_che{
      font-size: 30px;
      font-weight: bold;
      color: orange;
      margin-right: 10px;
    }
    .btn_che1{
      font-size: 26px;
       margin-right: 10px;
    }
    .btn_che2{
      font-size: 12px;
      color: #ddd;
    }
  }
}
</style>
