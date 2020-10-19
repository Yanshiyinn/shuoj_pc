<template>
  <div class="code">
    <!-- <h1>编码页{{ $route.params.id }}</h1> -->
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card>
            <CodeProb></CodeProb>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card>
            <CodeAnswer></CodeAnswer>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CodeProb from './CodeProb'
import CodeAnswer from './CodeAnswer'

export default {
  name: "Code",
  components:{
    CodeAnswer,
    CodeProb
  }
};
</script>

<style scoped>
.el-card {
  margin-top: 10px;
  margin-bottom: 20px;
  height: 480px;
  overflow: scroll;
}

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>