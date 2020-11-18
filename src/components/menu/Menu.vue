<template>
  <div class="menu">
    <el-menu
      :default-active="activeMenu"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/"> 首页</el-menu-item>
      <el-menu-item index="/contest"> 比赛</el-menu-item>
      <el-menu-item index="/collect"> 题库</el-menu-item>
      <el-menu-item index="/assign"> 作业</el-menu-item>
      <el-menu-item index="/history">
        提交记录
      </el-menu-item>
      <el-menu-item index="/manage/user">
        管理
      </el-menu-item>
      <el-menu-item index="/login" class="right">
        登录
      </el-menu-item>
      <el-menu-item index="/register" class="right">
        注册
      </el-menu-item>
      <el-submenu index="" class="right">
        <template slot="title">
          {{user.username}}
        </template>
        <el-menu-item index="/profile">个人中心</el-menu-item>
        <el-menu-item index="/setting">设置</el-menu-item>
        <!-- <el-divider></el-divider> -->
        <el-menu-item index="" @click="handleLogout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { logout } from "@/api/user";

export default {
  name: "Menu",
  // props: {
  //   activeIndex: {
  //     type: String,
  //     default: "1",
  //   },
  // },
  data() {
    return {
      // activeIndex: "/",
      user:{
        username:'admin'
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key==="/logout") {
        logout()
      }
    },
    handleLogout() {
      this.$store
        .dispatch('user/logout')
        .then(()=>{
          this.$router.push({ path: this.redirect || "/" });
        })
        .catch(()=>{})
    }
  },
  // mounted() {
  //   this.activeIndex = activeIndex;
  // },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.apiActiveMenu) { // 注意这里很重要
        return meta.apiActiveMenu
      }
      return path
    }
  }
};
</script>

<style scoped>
/* .block {
  vertical-align: middle;
  display: inline-block;
  float: right;
} */

.el-menu--horizontal > .el-menu-item.right {
  float: right;
}

.el-menu--horizontal > .el-submenu.right {
  float: right;
}
</style>