<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogFormVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <el-table :data="userlist" border style="width: 100%" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="create_time" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- {{ scope.row }} -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="ueseStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row.id)"
            ></el-button>
            <!-- 分配权限按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
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
        :total="total"
      >
      </el-pagination>

      <!-- 添加用户模态框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改用户模态框 -->
      <el-dialog title="修改用户" :visible.sync="editDialoagVisble" width="50%">
        <el-form :model="editForm">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input
              v-model="editForm.username"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="editForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
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
  Addusers,
  Listusers,
  Dealusers,
  Modifyusers,
  Findusers,
  Modifystatus,
  TiJiao,
} from "../../../request/http";
export default {
  name: "",
  data() {
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: "",
        //获取用户列表的参数对象
        pagenum: 1,
        //获取每页显示多少条数据
        pagesize: 2,
      },
      userlist: [],
      total: 0,
      //控制添加用户的模态框
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      formLabelWidth: "120px",
      editDialoagVisble: false,
      //查询到的用户信息对象
      editForm: {},
    };
  },
  created() {
    this.getUserList();
  },
  mounted() {},
  computed: {},
  methods: {
    async getUserList() {
      const { data: res } = await Listusers(this.queryInfo);

      // console.log(res);
      if (res.meta.status == 200) {
        this.userlist = res.data.users;
        this.total = res.data.total;
      }
    },

    //监听 pagesize 改变的时间
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听 页码值  改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },

    //监听 switch 开关
    async ueseStateChanged(userinfo) {
      // console.log(userinfo);

      const { data: res } = await Modifystatus(userinfo.id, userinfo.mg_state);
      // console.log(res);
      if (res.meta.status != 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error("更新用户状态失败");
      }
      this.$message.success("更新用户成功");
    },

    // 添加
    async add() {
      if (this.form.username == "" || this.form.password == "") {
        this.$message.error("用户名和密码不能为空");
      }
      console.log(this.form);
      const { data: res } = await Addusers(this.form);
      // this.$axios.post("users",this.users).then(res=>{
      // console.log(Addusers);
      console.log(res);
      // })
      this.dialogFormVisible = false;
      this.getUserList();
    },
    // 获取数据
    async getlist() {
      const { data: res } = await Listusers({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      // this.$axios.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`).then(res=>{
      console.log(res);
      if (res.meta.status == 200) {
        this.tableData = res.data.users;
        this.total = res.data.total;
      }
    },

    //查询用户信息
    async showEditDialog(id) {
      const { data: res } = await Modifystatus(id);
      console.log(res);
      if (res.meta.status != 200) {
        return this.$message.error("查询用户信息失败");
      }

      this.editForm = res.data;

      this.editDialoagVisble = true;
    },
    //修改
    async editUserInfo() {
      const { data: res } = await TiJiao(this.editForm.id, {
        email: this.editForm.email,
        mobile: this.editForm.mobile,
      });
      console.log(res);
      if (res.meta.status != 200) {
        return this.$message.error("修改失败");
      }

      //关闭对话框
      this.editDialoagVisble = false;
      //刷新数据列表
      this.getUserList();
      //提示修改成功
      this.$message.success("更新用户成功");
    },
    //删除
    async del(id) {
      console.log(id);
      this.$confirm("此操作将删除 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          const { data: res } = await Dealusers(`users/${id}`);
          console.log(res);
          this.getUserList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.el-table {
  margin-top: 15px;
  font-size: 13px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
