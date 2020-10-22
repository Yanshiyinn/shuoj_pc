<template>
  <div class="code">
    <!-- <h1>编码页{{ $route.params.id }}</h1> -->
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '15px' }">
            <div class="prob-info">
              <h4 id="title">{{ problem.content.title }}</h4>
              <template>
                <el-tag size="small" type="success">{{ problem.level }}</el-tag>
              </template>
              <template v-for="(tag, index) in problem.tags">
                <el-tag size="small" :key="index">{{ tag }}</el-tag>
              </template>
            </div>
            <CodeProb
              :active="activeName"
              :content="problem.content"
            ></CodeProb>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }" id="card">
            <CodeAnswer></CodeAnswer>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div class="footer-container">
      <el-row class="footer">
        <el-button
          @click="drawer = true"
          type="primary"
          size="medium"
          icon="el-icon-more-outline"
        >
          题目列表
        </el-button>
        <el-button
          @click="handleClick"
          type="primary"
          size="medium"
          style="float: right"
          icon="el-icon-s-promotion"
        >
          提交
        </el-button>
        <el-button
          @click="handleClick"
          type="primary"
          size="medium"
          style="float: right"
          icon="el-icon-magic-stick"
        >
          执行
        </el-button>
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
      problem: {
        tags: ["Wierd","math"],
        sources: [
          {
            name: "abc",
            link: "www.google.com",
          },
        ],
        level:'Basic',
        content: {
          title: "A+B之和",
          description: "问题描述",
          input: "输入内容",
          output: "输出内容",
          examples: [
            {
              inputExample: "输入样例1",
              outputExample: "输出样例1",
            },
            {
              inputExample: "输入样例2",
              outputExample: "输出样例2",
            },
          ],
          hint: "提示",
        },
      },
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
    handleClick() {
      this.activeName = "second";
    },
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

.el-card {
  margin-top: 10px;
  margin-bottom: 10px;
  /* height: 77%; */
  overflow: scroll;
  /* position: fixed; */
  /* bottom: 20px; */
  height: 77vh;
  position: relative;
}

#code {
  position: absolute;
  bottom: 0px;
}

/* .el-card__body{
  padding: 10px important!;
} */

.el-row {
  /* margin-bottom: 20px; */
  text-align: left;
}
.el-col {
  border-radius: 4px;
  height: 100%;
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

.el-tag {
  margin:10px 10px 10px 0;
}

#title {
  margin:4px 0px;
}
</style>