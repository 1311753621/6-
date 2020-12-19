<template>
  <div class="login">
    <div class="photo">
      <img src="../../assets/logo.png" alt="" />
    </div>
    <div class="main">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model.number="ruleForm.username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="ymx_doLogin()">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from "../../request/http"
export default {
  name: "",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        pass: "",
        checkPass: "",
        age: "",
      },
     
      rules: {
        username: [
          { required: true, message: "请输入正确的用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  computed: {},
  methods: {
     async ymx_doLogin(){
          if(this.ruleForm.username =="" || this.ruleForm.password ==""){
         this.$message({
           type:"error",
           message:"用户名密码不能为空"
         })
         return false
      }
      const {data:res} = await login(this.ruleForm);
      console.log(res);
       
     if(res.meta.status==200){
                this.$message.success(res.meta.msg)
                sessionStorage.setItem("token",res.data.token)
                this.$router.push("/home")
              }else{
                 this.$message.error(res.meta.msg)
              }
      
},
      
     
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang='scss' scoped>
.login {
  width: 100%;
  background: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  .main {
    background: white;
    padding: 20px;
    padding-top: 100px;
  }
  .el-form-item {
    width: 500px;
  }
  .photo {
    width: 150px;
    height: 150px;
    background: #ffffff;
    border-radius: 50%;
    overflow: hidden;
    padding: 15px;
    position: absolute;
    top: 15%;
    img {
      width: 150px;
      height: 150px;
      background: #eeeeee;
      border-radius: 100%;
    }
  }
}
</style>
