<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row  :gutter='20'>
      <el-col :span="8">
        <el-input v-model="queryInfo.query" clearable @clear='getGoodsList'
          placeholder="请输入内容"
        >
          <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="goAddpage"
          >添加商品</el-button
        >
      </el-col>
      </el-row>

        <!-- 表格区 -->
      <el-table :data="goodsList" border stripe>
          <el-table-column type='index'></el-table-column>
          <el-table-column label='商品名称' prop='goods_name'></el-table-column>
          <el-table-column label='商品价格(元)' prop='goods_price' width='95px'></el-table-column>
          <el-table-column label='商品重量' prop='goods_weight'  width='70px'></el-table-column>
          <el-table-column label='创建时间' prop='add_time'  width='180px'>
            <template slot-scope="scope">
                {{scope.row.add_time | dateFormat}}
            </template>
          </el-table-column>
          <el-table-column label='操作'  width='130px'>
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size='mini'></el-button>
                <el-button type="danger" icon="el-icon-delete" size='mini'
                @click="removeByid(scope.row.goods_id)"
                ></el-button>
            </template>
          </el-table-column>
      </el-table>

      <!-- 分页区 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" background>
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {shengpLie,shengpShan} from '../../../request/http'
export default {
  name: "",
  data() {
    return {
      queryInfo:{
        query:"",
        pagenum:1,
        pagesize:10
      },
      //商品列表
      goodsList:[],
      //总数据条数
      total:0
    };
  },
  created() {
     this. getGoodsList()
  },
  mounted() {},
  computed: {},
  methods: {
    //根据分页获取对应的商品列表
    async getGoodsList(){
      const {data:res} = await shengpLie(this.queryInfo)
      // console.log(res);
      if(res.meta.status!=200){
          return this.$message.error('获取商品数据失败')
      }
      this.$message.success("获取商品数据成功")
      // console.log(res.data);
      this.goodsList = res.data.goods
      this.total = res.data.total
    },

    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize

      this.getGoodsList()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
      
    },

    //删除
    async removeByid(goods_id){
     
       this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // this.$message({
            // type: 'success',
            // message: '删除成功!'
          // });
           const {data:res} = await shengpShan(goods_id)
           console.log(res);

          this.getGoodsList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    //
    goAddpage(){
        this.$router.push('/goods/add1')
    }
  },
};
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
</style>
