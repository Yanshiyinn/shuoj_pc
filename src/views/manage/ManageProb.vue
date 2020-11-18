<template>
<div class="prob-container">
  <Problems/>
</div>
</template>

<script>
import Problems from "@/components/tables/Problems.vue"

export default {
  name:'ManageProb',
  components:{
    Problems
  }
}
</script>

<style scoped>
.prob-container {
  text-align: center;
}
</style>