<template>
  <div>
      <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
     <el-card>
       <el-row>
         <el-row>
             <el-button type="primary" @click="dialogFormVisible = true"
              
            >添加分类</el-button
          >
         </el-row>

         <!-- 表格 -->


         <!-- 分页 -->
       </el-row>
     </el-card>

  </div>
</template>

<script>
import {shengp} from '../../../request/http'
export default {
  name: '',
  data() {
    return {
      //查询条件
       querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      //商品分类的数据列表
      cateList:[],
      //总数据条数
      total:0
    };
  },
  created() {
    this.getCateList()
  },
  mounted(){
  },
  computed:{
  },
  methods: {
    //获取商品分类数据
    async getCateList() {
     
      const { data: res } = await shengp({params:this.querInfo})
        
      

      if(res.meta.status!=200){
        return this.$message.error('获取商品分类失败')
      }
       console.log(res.data);
      //把数据列表 赋值给cateList
      this.cateList = res.data.result
      //为总数据条数赋值
      this.total = res.data.total
    },
  },
};
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
</style>
