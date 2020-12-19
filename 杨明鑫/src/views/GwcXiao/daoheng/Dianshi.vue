<template>
  <div>
         <el-row>
          <el-col
            :span="8"
            v-for="item in addd"
            :key="item.id"
          >
            <el-card :body-style="{ padding: '0px' }"  shadow="hover">
             <img :src="'http://47.115.85.237:3000/' + item.product_picture" alt="">
              <div style="padding: 14px">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix"></div>
              </div>
            </el-card>
          </el-col> </el-row>
  </div>
</template>

<script>
import { ShangFenList } from "../../../request/index";

export default {
  name: '',
  data() {
    return {
        addd: {
        categoryID:[2],
        currentPage: 1,
        pageSize: 15,
      },
    };
  },
created() {
     this.Shoulist()
},
  mounted(){
  },
  computed:{
  },
  methods: {
       //商品分类
    async Shoulist() {
      const { data: res } = await ShangFenList(this.addd);
      console.log(res);
      this.addd = res.Product
    },
  },
};
</script>

<style lang='scss' scoped>
.el-card{
  margin: 10px;
}
</style>
