<template>
<div class="probtable">
  <el-table :data="probData" border>
    <el-table-column prop="id" label="#" width="50"></el-table-column>
    <el-table-column label="姓名" width="auto">
      <template slot-scope="scope">
        <router-link
          :to="{path:`/collect/`+scope.row.id}"
          v-slot="{ href, navigate }">
          <el-link type="primary" :href="href" @click="navigate">
            {{scope.row.content.description}}
          </el-link>
        </router-link>
      </template>
    </el-table-column>
    <el-table-column label="标签" width="150">
      <template slot-scope="scope">
        <el-tag
          size="medium"
          class="tags"
          :key="index"
          v-for="(tag,index) in scope.row.tags">
          {{ tag }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="难度" width="80">
      <template> <!--slot-scope="scope">-->
        <el-tag size="medium" class="tags" type="success">简单</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="通过率" width="100">
      <template slot-scope="scope">
        <el-progress
          :show-text="false"
          :stroke-width="10"
          :percentage="scope.row.AC*100"></el-progress>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "Problems",
  data() {
    return {
      
    };
  },
  computed: {
    probData() {
      return this.$store.state.probData
    }
  }
};
</script>

<style scoped>
.probtable {
  margin: 20px;
  /* display: inline-block; */
  width: 80%;
  float: left;
  max-width: 800px;
  min-width: 500px;
}

.tags {
  margin:0px 3px;
}

/* .el-progress__text {
  display:none;
  color: white;
} */
</style>