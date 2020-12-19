<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全部商品</el-breadcrumb-item>
      <el-breadcrumb-item>分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 导航栏 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first" >
        <el-row>
          <el-col
            :span="8"
            v-for="item in userlist"
            :key="item.id"
            :offset="item > 0 ? 2 : 0"

          >
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img
               @click="addshoppingList"
                :src="'http://47.115.85.237:3000/' + item.product_picture"
                alt=""
              />
              <div style="padding: 14px">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix"></div>
              </div>
            </el-card>
          </el-col> </el-row
        ><!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="categoryID.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="categoryID.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-tab-pane>

      <el-tab-pane
        v-for="item in categoryName"
        :key="item.id"
        :label="item.category_name"
      >
       <router-view></router-view>
      </el-tab-pane>
     
    </el-tabs>
  </div>
</template>

<script>
import { ShangList, ShangGetList ,getaddshoppingList} from "../../../request/index";
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      categoryName: [],
      categoryID: {
        currentPage: 1,
        pageSize: 15,
      },

      total: 0,
      userlist: [],
      getrolesList: {},

      shoppingListadd:{
        user_id:'',
        product_id:''
      }
    };
  },
  created() {
    this.getshangList();
    this.likegetList();
    this.addshoppingList()
  },
  mounted() {},
  computed: {},
  methods: {
    //获取导航数据
    async getshangList() {
      const { data: res } = await ShangList(this.categoryName);
      // console.log(res);
      this.categoryName = res.category;
    },
    // 获取数据
    async likegetList() {
      const { data: res } = await ShangGetList(this.categoryID);
      // console.log(res);
      if (res.code == "001") {
        this.userlist = res.Product;
        this.total = res.total;
      }
    },

    handleClick(tab, event) {
      // console.log(tab, event);
      if (tab.index == "1") {
        this.$router.push("/oppo");
      }
      if (tab.index == "2") {
        this.$router.push("/dianshi");
      }
    },

    async addshoppingList(){
      const {data:res} = await getaddshoppingList(this.shoppingListadd.id)
      console.log(res);
    },

    handleSizeChange(newSize) {
      this.categoryID.pageSize = newSize;
      this.likegetList();
    },
    //监听 页码值  改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.categoryID.currentPage = newPage;
      this.likegetList();
    },
  },
};
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  margin: 15px;
  font-size: 14px;
}
.el-tabs {
  .el-card {
    margin: 10px;
  }
  .divv {
    span {
      width: 100%;
      text-align: center;
      padding-left: 20px;
    }
  }
}
</style>
