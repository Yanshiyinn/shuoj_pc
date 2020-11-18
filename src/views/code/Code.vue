<template>
  <div class="code">
    <!-- <h1>编码页{{ $route.params.id }}</h1> -->
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="grid-content bg-purple">
            <CodeProb
              :active="activeName"
              :problemId="$route.params.id"
              :results="results"
              @tabChange="handleTabChange"
            ></CodeProb>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
            <CodeAnswer @submit="handleSubmit"></CodeAnswer>
        </div>
      </el-col>
    </el-row>
    <div class="footer-container">
      <el-row class="footer">
      </el-row>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      direction="ltr"
      :before-close="handleClose"
      :with-header="false"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import CodeProb from "./CodeProb";
import CodeAnswer from "./CodeAnswer";

export default {
  name: "Code",
  components: {
    CodeAnswer,
    CodeProb,
  },
  data() {
    return {
      drawer: false,
      activeName: "",
      results:[],
    };
  },
  methods: {
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then((_) => {
      //     done();
      //   })
      //   .catch((_) => {});
      done();
    },
    handleSubmit(result) {
      this.results.push(result)
      this.activeName="second"
      // console.log(`submit`)
    },
    handleTabChange(tab) {
      // console.log(`tabchange`)
      this.activeName=tab.name
    }
  },
};
</script>

<style scoped>
/* .footer-container {
  height: 52px;
}

.footer {
  position: fixed;
  bottom: 0px;
  padding: 8px 0px;
} */

.code {
  margin: 0px 10px;
}

/* .el-card__body{
  padding: 10px important!;
} */

.el-row {
  /* margin-bottom: 20px; */
  text-align: left;
  /* margin: 0px 10px; */
}
.el-col {
  border-radius: 4px;
  height: 100%;
}
.bg-purple-dark {
  background: #99a9bf;
}
/* .bg-purple {
  background: #d3dce6;
} */
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