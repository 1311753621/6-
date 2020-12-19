<template>
    
  <div>
    <el-row>
      <el-col
        :span="5"
        v-for="index in lei"
        :key="index.id"
        style="padding: 10px"
      >
        <el-card :body-style="{ padding: '10px' }" shadow="hover">
          <img
            :src="'http://47.115.85.237:3000/' + index.product_picture"
            class="image"
          />
          <div style="padding: 14px">
            <p>{{ index.product_name }}</p>
            <p>{{ index.product_title }}</p>
            <p style="color: red">
              {{ index.product_selling_price }}元 &nbsp;&nbsp;&nbsp;&nbsp;<s
                style="color: #cccccc"
                >{{ index.product_price }}元</s
              >
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { lei } from "@/api/user";
export default {
  name: "",
  data() {
    return {
      query: {
        categoryID: [2],
        pageSize: 5,
        currentPage: 1,
      },
      lei: [],
    };
  },
  created() {
    this.getProductByCategory();
  },
  computed: {},
  methods: {
    async getProductByCategory() {
      const { data: res } = await lei(this.query);
      console.log(res);
      this.lei = res.Product;
    },
  },
};
</script>

<style scoped>
</style>
