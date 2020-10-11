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
      <el-submenu index="" id="userinfo">
        <template slot="title">
          {{user.username}}
        </template>
        <el-menu-item index="/profile">个人中心</el-menu-item>
        <el-menu-item index="/setting">设置</el-menu-item>
        <!-- <el-divider></el-divider> -->
        <el-menu-item index="/logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
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
    },
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
.block {
  vertical-align: middle;
  /* display: inline-block; */
  float: right;
}

#userinfo {
  float: right;
}
</style>