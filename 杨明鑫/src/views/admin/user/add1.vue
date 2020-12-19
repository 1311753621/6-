<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-alert
        title="添加商品信息"
        center
        type="info"
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="active - 0"
        align-center
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 左侧 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          tab-position="left"
          v-model="active"
          :before-leave="beforeLeave"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="catelist"
                :props="cateProps"
                expandTrigger="hover"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="item in manylist"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cb"
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">角色管理</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-form-item label="">
              <el-upload
                :action="actionPath"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :headers="headersObj"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <img :src="imgsrc" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getcatelist, getmanylist } from "../../../request/http";
export default {
  name: "",
  data() {
    return {
      active: "0",
      addForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: "",
        pics: [],
      },
      addFormRules: {
        goods_name: {
          required: true,
          message: "请输入商品名称",
          trigger: "blur",
        },
        goods_price: {
          required: true,
          message: "请输入商品价格",
          trigger: "blur",
        },
        goods_weight: {
          required: true,
          message: "请输入商品重量",
          trigger: "blur",
        },
        goods_number: {
          required: true,
          message: "请输入商品数量",
          trigger: "blur",
        },
        goods_cat: {
          required: true,
          message: "请输入活动名称",
          trigger: "blur",
        },
        pics: { required: true, message: "请输入商品分类", trigger: "blur" },
      },
      //进入页面时获取的表单
      catelist: [],
      manylist: [],
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      actionPath: "https://www.liulongbin.top:8888/api/private/v1/upload",
      headersObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
      dialogVisible:false,
      imgsrc:'',
    };
  },
  mounted() {},
  computed: {},
  methods: {
    getcatelist() {
      getcatelist().then((res) => {
        console.log(res);
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取列表失败");
        }
        this.catelist = res.data.data;
      });
    },
    handleChange(value) {
      console.log(value);
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
      }
    },
    beforeLeave(activeName, oldActiveName) {
      console.log(activeName);
      console.log(oldActiveName);
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("请先选择商品分类");
        return flase;
      }
      if (activeName === "1") {
        getmanylist(this.addForm.goods_cat[2]).then((res) => {
          console.log(res);
          if (res.data.meta.status !== 200) {
            return this.$message.error("获取失败");
          }
          res.data.data.forEach((item) => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
          });
          this.manylist = res.data.data;
          console.log(this.manylist);
        });
      }
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
      // file.response.data.tmp_path
      let i = this.addForm.pics.findIndex(
        (x) => x.tmp_path === file.response.data.tmp_path
      );
      this.addForm.pics.splice(i, 1);
      console.log(this.addForm);
    },
    //点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(file)
      // file.response.data.url
      this.imgsrc=file.response.data.url
    },
    //文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      console.log(response);
      const picInfo = { pic: response.data.tmp_path };
      this.addForm.pics.push(picInfo);
      console.log(this.addForm);
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  },
  created() {
    this.getcatelist();
  },
};
</script>

<style lang='scss' scoped>
.el-card {
  margin-top: 20px;
}
.el-steps {
  margin-top: 20px;
}
.el-tabs {
  margin-top: 20px;
}
</style>
