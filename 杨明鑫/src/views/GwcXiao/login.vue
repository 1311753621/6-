<template>
  <div>
    <el-container>
      <el-header>
        <div class="tou">
          <ul>
            <li >
              <span v-if="!flag" @click="dialogFormVisible = true">登录|注册</span> 
              <span v-else @click="Lougth()">欢迎{{this.ruleForm.userName}} </span>
              </li>
            <li>我的订单</li>
            <li>我的收藏</li>
            <router-link to="/goshopping"
              ><li>
                <i class="el-icon-shopping-cart-full"></i> 购物车<span>()</span>
              </li></router-link
            >
          </ul>
        </div>
      </el-header>
      <el-main>
        <el-card>
          <div class="div1">
            <img src="../../../dist/img/微信图片_20201215203308.png" alt="" />
            <div class="div2">
              <ul>
                <li><router-link to="/shou" tag="li">首页</router-link></li>
                <li>
                  <router-link to="/shang" tag="li">全部商品</router-link>
                </li>
                <li>关于我们</li>
              </ul>
              <el-input placeholder="请输入内容" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div> </el-card
        ><router-view></router-view>
      </el-main>

      <el-footer>
        <img src="../../../dist/img/微信图片_20201215204313.png" alt="" />
      </el-footer>
    </el-container>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item>登录</el-form-item>
        <el-form-item prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getLogin" style="width: 100%"
          >登录</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getLoginList, loginLun } from "../../request/index";
export default {
  name: "",
  data() {
    return {
      carousel: {},
      dialogFormVisible: false,
      flag:sessionStorage.getItem('flag')||false,
      ruleForm: {
        userName: "jiyun",
        password: "password",
      },
      rules: {
        userName: [
          { required: true, message: "请输入正确的用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    // 登录
    async getLogin() {
      const { data: res } = await getLoginList(this.ruleForm);
      console.log(res);
      this.dialogFormVisible = false;

      if (res.code == "001") {
        this.flag=true
        sessionStorage.setItem("token", res.user.user_id);
        sessionStorage.setItem("flag", this.flag);

        this.$message.success("登录成功");
        this.$router.push("/shou");
        var obj=res.user
        this.$store.commit('getLogin',obj)
      } else {
        this.$message.error("登录失败");
      }
      
    },

    Lougth(){
       
      
    }
  },
};
</script>

<style lang='scss' scoped>
li {
  list-style: none;
}
.tou {
  width: 480px;
  height: 60px;
  float: right;
  ul {
    width: 480;
    display: flex;
    li {
      width: 120px;
      height: 60px;
      justify-content: space-between;
      align-content: center;
      list-style: none;
      text-align: center;
      color: white;
    }
    li:hover {
      color: #000;
      background: orange;
    }
  }
}
.el-header,
.el-footer {
  background-color: #2f2f2f;
  color: #333;
  line-height: 60px;
}
.el-footer {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: white;
  color: #333;
  height: 100%;
  .div1 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 50px;
    }
    ul {
      width: 300px;
      height: 50px;
      margin-left: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        width: 100px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
      }
      li:hover {
        color: blue;
        border-bottom: 2px solid blue;
      }
    }
    .el-input {
      width: 300px;
    }
  }
  .div2 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-breadcrumb {
    margin-top: 15px;
  }
}
</style>
