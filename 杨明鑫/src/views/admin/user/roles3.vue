<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogFormVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="rolesList" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              class="rolesbottom"
              v-for="item1 in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染的一级权限 -->
              <el-col :span="6">
                <el-tag closable> {{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染的二三级权限 -->
              <el-col :span="18">
                <el-row
                  class="rolesbottom"
                  v-for="item2 in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag closable type="success">
                      {{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      @close="rolesListId(scope.row, item3.id)"
                    >
                      {{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"> </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              @click="rolesBian(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              @click="del(scope.row.id)"
              >删除</el-button
            >
            <el-button type="warning" icon="el-icon-share" size="mini"
              >权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加对话框 -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="活动名称" prop="pass">
            <el-input v-model="ruleForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="rolesListAdd">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑对话框 -->
      <el-dialog title="收货地址" :visible.sync="eitdialogFormVisible">
        <el-form :model="eitList">
          <el-form-item label="活动名称">
            <el-input v-model="eitList.roleName" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="活动名称" >
            <el-input v-model="eitList.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="getrolseGai"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  rolesgetrolseList,
  rolesListId,
  rolesrolesListAdd,
  rolesrolesBian,
  rolesgetrolseGai,
  rolesdeld
} from "../../../request/index";
export default {
  name: "",
  data() {
    return {
      rolesList: [],
      ruleForm: {
        roleName: "",
        roleDesc: "",
      },
      eitList:{},

      dialogFormVisible: false,
      eitdialogFormVisible:false,
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getrolseList();
  },
  mounted() {},
  computed: {},
  methods: {
    async getrolseList() {
      const { data: res } = await rolesgetrolseList(this.id);
      console.log(res);

      this.rolesList = res.data;
    },

    //根据id删除权限
    async rolesListId(err, rightId) {
      const confirmList = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmList !== "confirm") {
        return this.$message.info("取消删除");
      }

      const { data: res } = await rolesListId(err.id, rightId);
      console.log(res);
      if (res.meta.status != 200) {
        return this.$message.info("删除失败");
      }
      this.$message.success("删除成功");

      err.children = res.data;
    },

    //添加
    async rolesListAdd() {
      const { data: res } = await rolesrolesListAdd(this.ruleForm);
      console.log(res);

      this.getrolseList();
      this.dialogFormVisible = false;
    },

    // 编辑
    async rolesBian(id){
      this.eitdialogFormVisible = true
      const {data:res} = await rolesrolesBian(id)
      console.log(res);
      this.eitList = res.data
    },
    async getrolseGai(){
        const {data:res} = await rolesgetrolseGai(this.eitList.roleId,{
          roleName:this.eitList.roleName,
          roleDesc:this.eitList.roleDesc,

        })
        console.log(res);
        this.eitdialogFormVisible=false
        this.getrolseList()
    },

    //删除
    async del(id){
      const comfirmlist = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch((err)=>err)
        if(comfirmlist!=="confirm"){
          return this.$message.info('取消删除')
        }
        const {data:res} = await rolesdeld(id)
        console.log(res);
        if(res.meta.status!=200){
          return this.$message.info('删除失败')
        }
        this.$message.success('删除成功')

        this.getrolseList()
    }
  },
};
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-tag {
  margin-top: 5px;
}
.rolesbottom {
  border-bottom: 1px solid #eee;
}
</style>
