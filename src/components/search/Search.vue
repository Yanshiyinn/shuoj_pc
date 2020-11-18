<template>
<div class="search">
  <el-input v-model="search" :placeholder="content|mapPH"></el-input>
  <el-button size="medium" icon="el-icon-search" @click="handleSearch">搜索</el-button>
</div>
</template>

<script>
const PHMap={
  'problem':'搜索题号、标题、内容',
  'user':'搜索用户号、用户名、编号'
}

export default {
  name:"Search",
  data() {
    return {
      search:"",
    }
  },
  props:{
    content:{
      type:String,
      default:""
    }
  },
  methods:{
    handleSearch() {
      console.log(this.content)
    }
  },
  filters:{
    mapPH(content){
      return PHMap[content]
    }
  }
}
</script>

<style scoped>
.search {
  width:85%;
  /* display: inline-block; */
  margin-bottom: 15px;
  text-align: left;
  float: left;
}

.el-button {
  /* width: 30%; */
  /* display: inline-block; */
  margin-left: 15px;
}

.el-input {
  width: 70%;
  /* display: inline-block; */
}

</style>