<template>
  <!-- <h1>管理端</h1> -->
  <div>
    <!-- <router-link to="/manage/user">/manage/user</router-link>
    <router-link to="/manage/problem">/manage/problem</router-link> -->
    <el-container>
      <el-aside width="200px">
        <ManageMenu />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ManageMenu from '@/components/menu/ManageMenu.vue'

export default {
  name:'Manage',
  components:{
    ManageMenu
  }
}
</script>

<style scoped>
/* .el-main {
  text-align: center;
} */
</style>