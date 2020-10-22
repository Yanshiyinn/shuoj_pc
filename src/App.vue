<template>
  <div id="app">
    <Menu />
    <!-- <el-container> -->
      <!-- <el-main style="height:100%"> -->
    <router-view/>
      <!-- </el-main> -->
    <!-- </el-container> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Menu from './components/menu/Menu.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
    Menu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  /* height: 100vh; */
}
</style>
