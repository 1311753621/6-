<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-alert title="警告提示的文案" type="warning" :closable="false" show-icon> </el-alert>
      <el-row class="cat_cop">
        <el-col>
          <span>选择商品分类:</span>
          <el-cascader
            v-model="selectedCatkey"
            :options="cateList"
            expandTrigger="hover"
            :props="cateProps"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab 页签取悦 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type='primary' size='mini' :disabled='isBtnDisable'>添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type='primary' size='mini' :disabled='isBtnDisable'>添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getcatelist ,getSanList} from "../../../request/http";
export default {
  name: "",
  data() {
    return {
      //商品分类列表
      cateList: [],
      //级联选择框的配置对象
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      //级联选择框双向绑定到的数组
      selectedCatkey: [],
      //被激活的页签的名称
      activeName: "many",
    };
  },
  created() {
    this.getcatelist();
  },
  mounted() {},
  computed: {
    //如果按钮需要被禁用，则返回true 否则返回false
    isBtnDisable(){
        if(this.selectedCatkey.length !==3){
          return true
        }
        return false
    }
  },
  methods: {
    async getcatelist() {
      const { data: res } = await getcatelist(this.id);
      console.log(res);

      if (res.meta.status != 200) {
        return this.$message.error("获取的商品分类失败");
      }

      this.cateList = res.data;
    },
    //级联选择框选中项变化，会触发这个函数
   
    //证明选中的不是三级分类
    async handleChange(cee) {
      
      if (this.selectedCatkey.length !== 3) {
        return (this.selectedCatkey = []);
      }
      
      //证明选中的是三级分类
      // console.log(this.selectedCatkey);

      //根据所分类的Id，和当前所处的面板，获取对应的参数
      console.log(this.cateId);
     const {data:res} = await getSanList(cee[2],this.activeName)
      console.log(res);
    },

    //tab页签点击事件的处理函数
    handleTabClick() {
      console.log(this.activeName);
    },

    //当前选中的三级分类的id
    cateId(){
      if(this.selectedCatkey.length === 3){
       
        return this.selectedCatkey[2] 
        
      }
      return null
    }
  },
};
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.cat_cop {
  margin: 15px 0;
}
</style>
