<template>
  <div class="menu">
    <el-menu
      :default-active="$route.path"
      class="el-menu"
      mode="vertical"
      @select="handleSelect"
      router
      ref="menu"
    >
      <el-menu-item index="/manage/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户</span>
      </el-menu-item>
      <el-menu-item index="/manage/contest">
        <i class="el-icon-trophy"></i>
        <span slot="title">比赛</span>
      </el-menu-item>
      <el-menu-item index="/manage/problem">
        <i class="el-icon-collection"></i>
        <span slot="title">题库</span>
      </el-menu-item>
      <el-submenu index="/manage">
        <template slot="title">
        <i class="el-icon-files"></i>
        <span>班级</span>
        </template>
        <el-menu-item  index="/manage/assign">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">班级管理</span>
        </el-menu-item>
        <el-menu-item index="/manage/analyze">
        <i class="el-icon-s-data"></i>
        <span slot="title">统计</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "ManageMenu",
  // props: {
  //   activeIndex: {
  //     type: String,
  //     default: "1",
  //   },
  // },
  data() {
    return {
      // activeIndex: "/",
      // user:{
      //   username:'admin'
      // }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    this.$refs.menu.open("/manage")
    // console.log(this)
  },
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
  float: right;
} */

/* #userinfo {
  float: right;
} */
.el-menu {
  width: 200px;
  /* display: inline-block; */
  margin: 0px;
  text-align: left;
  position:absolute;
  bottom:0;
  top:69px;
  /* overflow: scroll; */
}
/* .menu {
  width: 200px;
  overflow: hidden;
} */

</style>