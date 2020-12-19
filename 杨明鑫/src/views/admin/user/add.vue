<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条区域 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏区域 -->
      <el-tabs v-model="activeIndex" :tab-position="'left'" style="height: 200px">
        <el-tab-pane label="基本信息" name='0'>商品名称</el-tab-pane>
        <el-tab-pane label="商品参数" name='1'>配置管理</el-tab-pane>
        <el-tab-pane label="商品属性" name='2'>角色管理</el-tab-pane>
        <el-tab-pane label="商品图片" name='3'>定时任务补偿</el-tab-pane>
        <el-tab-pane label="商品内容" name='4'>定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeIndex: "0",
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.el-steps {
  margin-top: 15px;
  margin-bottom: 15px;
}
.el-step__title {
  font-size: 14px;
}
</style>
