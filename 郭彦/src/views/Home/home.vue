import { Icon } from 'vant';
<template>
  <div>
    <el-container>
      <!-- t头部导航栏区域 -->
      <el-header>
        <div class="box">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1" @click="addDialog = true">
              <span v-if="!$store.state.ruleForm.userName">登录|注册</span>

              <span v-else>欢迎{{$store.state.ruleForm.userName}}</span>
            </el-menu-item>

            <el-menu-item index="2">我的订单</el-menu-item>
            <el-menu-item index="3">我的收藏</el-menu-item>
            <el-menu-item index="4" class="el-icon-shopping-cart-full">
              <router-link to="/shppen">购物车()</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <!-- 主体内容区域 -->
      <el-main>
        <div class="toop">
          <img src="./image.png" alt />

          <ul>
            <li>
              <router-link to="/swipe" tag="li">首页</router-link>
            </li>
            <li>
              <router-link to="/whole" tag="li">全部商品</router-link>
            </li>
            <li>
              <router-link to="/swipe" tag="li">关于我们</router-link>
            </li>
          </ul>

          <el-input placeholder="请输入内容" style="width:300px;margin-left:100px;">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <div>
          <router-view></router-view>
        </div>
      </el-main>

      <el-footer></el-footer>
    </el-container>

    <!-- 登陆对话框区域 -->
    <el-dialog title="提示" :visible.sync="addDialog" width="40%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="width:100%" @click="login">登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      //查询到的用户信息对象
      addDialog: false,
      ruleForm: {
        userName: "jiyun",
        password: "password"
      },

      admin: "",

      // 账号及密码进行校验
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 5 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    //登录事件
    login() {
      this.$axios.post("/users/login", this.ruleForm).then(res => {
        console.log(res);
        this.addDialog = false;
        this.admin = res.data.user;
        console.log(this.admin)
        var a=this.admin
        console.log(a)
        this.$store.commit("login",a);
        console.log(this.$store.state.ruleForm);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  height: 60px;
  background: #000;
}

.el-menu {
  width: 450px;
  height: 60px;
  margin-left: 1300px;
  .el-menu-item {
    text-align: center;
  }
}

.el-main {
  width: 100%;
  height: 800px;
  .toop {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    // padding: 0 20px;
    border-bottom: 2px solid #ddd;
    img {
      width: 160px;
      height: 60px;
    }
    ul {
      width: 900px;
      height: 70px;
      display: flex;
      li {
        width: 300px;
        line-height: 80px;
        text-align: center;
        height: 70px;
      }
    }
  }
}
</style>
