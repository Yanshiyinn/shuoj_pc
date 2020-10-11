<template>
<div class="collect">
  <!-- <h1>题库页</h1> -->
  <Problems></Problems>
</div>
</template>

<script>
import Problems from '../../components/tables/Problems.vue'

export default {
  name:'Collect',
  components:{
    Problems
  },
}
</script>