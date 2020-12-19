<template>
    
  <div>
    <el-container>
      <el-header>
        <div class="box">
          <p @click="dialogVisible = true">
            <span v-if="!login">登录|注册</span><span v-else>欢迎<span style="color:green">{{this.ruleForm.userName}}</span></span>
          </p>
          <p>我的订单</p>
          <p>我的收藏</p>
          <router-link to="/card" tag="p">
            <p><i class="el-icon-shopping-cart-full"></i>购物车()</p>
          </router-link>
          
        </div>
        <!-- 登录弹框 -->
        <el-dialog
          title="登录"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="userName">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                style="width: 100%"
                >立即登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-header>

      <el-main>
        <div class="top">
          <img src="../assets/微信图片_20201215202409.png" alt="" />
          <ul>
            <li>
              <router-link to="/shou" tag="li">首页</router-link>
            </li>
            <li><router-link to="/all" tag="li">全部商品</router-link></li>
            <li><router-link to="/shou" tag="li">关于我们</router-link></li>
          </ul>
          <el-input placeholder="请输入内容" style="width: 250px">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="bottom">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer>
        <img src="../assets/微信图片_20201215203736.png" alt="" />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      login:sessionStorage.getItem('login')||false,
      ruleForm: {
        userName: "jiyun",
        password: "password",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {},
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submitForm(formName) {
      this.dialogVisible = false;
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await login(this.ruleForm);
        console.log(res);
        if (res.code == "001") {
          window.sessionStorage.setItem("token", res.user.user_id);
          this.$message.success(res.msg);
          this.login = true;
          sessionStorage.setItem("login",this.login)
          var obj = res.user;
          this.$store.commit('getlogin',obj)
        } else {
          this.$message.error(res.msg);
        }
      });
    },

  },
};
</script>

<style lang="scss" scoped>
.el-footer {
  // width: 100%;
  height: 100% !important;
  background-color: #2f2f2f;
  img {
    width: 100%;
    // height: 100%;
  }
}
.el-header {
  background-color: #080808;
  color: #ffffff;
  .box {
    width: 40%;
    height: 100%;
    float: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 12px;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      cursor:pointer;
    }
    p:hover {
      background: chocolate;
    }
  }
}
.el-main {
  background-color: #ffffff;
  .top {
    background: #ffffff;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    img {
      width: 170px;
    }
    ul {
      width: 250px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .bottom {
    min-height: 250px;
  }
}
</style>
