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
      <!-- 角色列表区域 -->
      <el-table :data="roleList" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightbuId(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级权限 -->
              <el-col :span="19">
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      closable
                      @close="removeRightbuId(scope.row, item2.id)"
                      type="success"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3, i3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightbuId(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="form.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" :label-width="formLabelWidth">
            <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="getListadd()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="30%"
        @click="serRightList"
      >
        <!-- 树形框件 -->
        <el-tree
          :data="rightsList"
          :props="tresProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="defKeys"
          ref="treeRef"
        ></el-tree>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addotList">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改模态框 -->
      <el-dialog title="修改用户" :visible.sync="editDialoagVisble" width="50%">
        <el-form :model="editForm">
          <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="editForm">
          <el-form-item label="角色描述" :label-width="formLabelWidth">
            <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialoagVisble = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  juese,
  jueseadd,
  juesedel,
  jueseshan,
  juesehuo,
  jueseshou,
  juesecha,
  juesexiu,
} from "../../../request/http";
export default {
  name: "",
  data() {
    return {
      roleList: [],
      dialogFormVisible: false,
      form: {
        roleName: "",
        roleDesc: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      //默认分配权限的对话框
      setRightDialogVisible: false,
      rightsList: [],
      // 树形控件的属性绑定对象
      tresProps: {
        label: "authName",
        children: "children",
      },
      //默认选中的节点
      defKeys: [],
      //当前即将分配权限的角色id
      roleId: "",

      //控制修改模态框的显示隐藏
      editDialoagVisble: false,
      //查询用户到的用户信息对象
      editForm: {},
    };
  },
  created() {
    this.gerRolesList();
  },
  mounted() {},
  computed: {},
  methods: {
    //获取数据
    async gerRolesList(id) {
      const { data: res } = await juese(this.id);
      // console.log(res)
      if (res.meta.status != 200) {
        return this.$message.error("获取失败");
      }
      this.roleList = res.data;
      // console.log(this.roleList);
    },

    //角色列表添加
    async getListadd() {
      const { data: res } = await jueseadd(this.form);
      // console.log(res);

      (this.dialogFormVisible = false), this.gerRolesList();
    },

    //编辑修改
    async showEditDialog(id) {
      // console.log(id);

      const { data: res } = await juesecha(id);
      console.log(res);

      if (res.meta.status != 200) {
        return this.$message.error("获取用户失败");
      }
      this.editForm = res.data;

      this.editDialoagVisble = true;
    },

    //修改
    async editUserInfo() {
      const { data: res } = await juesexiu(this.editForm.roleId, {
        roleDesc: this.editForm.roleDesc,
        roleName: this.editForm.roleName,
      });
      console.log(res);
      if (res.meta.status != 200) {
        return this.$message.error("修改失败");
      }

      //关闭对话框
      this.editDialoagVisble = false;
      //刷新数据列表
      this.gerRolesList();
      //提示修改成功
      this.$message.success("更新用户成功");
    },

    //删除
    async del(id) {
      // console.log(id);
      const confirmResuit = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResuit !== "confirm") {
        return this.$message.info("删除已取消");
      }
      const { data: res } = await juesedel(id);
      console.log(res);

      if (res.meta.status != 200) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");

      this.gerRolesList();
    },
    //根据id删除对应的权限
    async removeRightbuId(role, rightId) {
      //  console.log(role);
      //  console.log(rightId)
      const conformResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (conformResult !== "confirm") {
        return this.$message.info("取消删除");
      }
      const { data: res } = await jueseshan(role.id, rightId);
      console.log(res);

      if (res.meta.status != 200) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      //  this.gerRolesList();
      role.children = res.data;
    },

    //展示分类权限的对话框
    async showSetRightDialog(see) {
      this.roleId = see.id;
      //获取所有的权限数据
      const { data: res } = await juesehuo(this.see);
      console.log(res);
      if (res.meta.status != 200) {
        return this.$message.error("获取权限数据失败");
      }
      //获取到的权限
      this.rightsList = res.data;

      //递归获取三级节点的id
      this.getLeafKey(see, this.defKeys);

      this.setRightDialogVisible = true;
    },

    //通过递归的形式  获取角色下所有的三级权限id 并保存在defKeys数组中
    getLeafKey(node, arr) {
      //如果当前节点不包含children 属性 这是三级节点
      if (!node.children) {
        return arr.push(node.id);
      }

      node.children.forEach((item) => this.getLeafKey(item, arr));
    },

    //监听分配权限对话框的关闭事件
    serRightList() {
      this.defKeys = [];
    },

    //点击为角色分配权限
    async addotList() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const idStr = keys.join(",");
      // const { data: res } = await jueseshou(
      //   `roles/${this.roleId}/rights`,
      //   { rids: idStr }
      // )
      // console.log(res);
    },
  },
};
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-top: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
