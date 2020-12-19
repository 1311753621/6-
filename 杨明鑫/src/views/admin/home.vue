<template>
  <div>
    <el-container>
      <el-header>
        <div>电商后台管理系统</div>
        <el-button @click="open">退出</el-button>
      </el-header>

      <!-- 左侧菜单 -->
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleto">|||</div>
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in menulist"
              :key="item.id"
            >
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/' + subItem.path + ''"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavState('/' + subItem.path)"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { menus } from "../../request/http";
export default {
  name: "",
  data() {
    return {
      menulist: [],
      iconsObj: {
        125: "iconfont icon-users",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      //是否折叠
      isCollapse: false,

      //被激活的链接地址
      activePath: "",
    };
  },
  created() {
    this.created();
    this.activePath = window.sessionStorage.getItem('activePath')
  },

  mounted() {},
  computed: {},
  methods: {
    //获取所有的菜单
    async created() {
      const { data: res } = await menus();
      // console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;

      // console.log(res);
    },

    //左侧菜单展开折叠
    toggleto() {
      this.isCollapse = !this.isCollapse;
    },

    //保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath
    },

    //退出登录
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示h", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then((res) => {
          sessionStorage.removeItem("user_token"); //2. 跳转到登录页面
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.el-header,
.el-footer {
  background-color: #373d41;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #333744;
  color: #333;
  text-align: left;
  // height: 100%;
  height: 700px;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #e9eef3;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  div {
    font-size: 23px;
    font-weight: bold;
  }
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 2px;
  cursor: pointer;
}

</style>
