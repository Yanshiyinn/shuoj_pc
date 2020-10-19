<template>
  <div class="code-prob">
    <el-tabs v-model="activeName" style="overflow: auto;">
      <el-tab-pane label="题目详情" name="first">
        <h4>{{ content.title }}</h4>
        <h4>题目详情</h4>
        <p>{{ content.description }}</p>
        <h4>输入内容</h4>
        <p>{{content.input}}</p>
        <h4>输出内容</h4>
        <p>{{content.output}}</p>
        <h4>输入样例</h4>
        <div v-for="(exmp,index) in content.examples" :key="index">
          <h5>样例{{index}}</h5>
          <p>输入</p>
          <code>
          {{exmp.inputExample}}
          </code>
          <p>输出</p>
          <code>
            {{exmp.outputExample}}
          </code>
        </div>
        <!-- <h4>输出样例</h4>
        <code v-for="(exmp,index) in content.examples" :key="index">
          {{exmp.outputExample}}
        </code> -->
      </el-tab-pane>

      <el-tab-pane label="提交记录" name="second">提交记录</el-tab-pane>
      <el-tab-pane label="讨论" name="third">讨论</el-tab-pane>
      <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "CodeProb",
  components:{

  },
  props: {
    // data:{
    //   title:'A+B之和'
    // }
  },
  data() {
    return {
      activeName: "first",
      content: {
        title:"A+B之和",
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
    };
  },
};
</script>

<style scoped>
.code-prob {
  text-align: left;
  overflow: scroll;
  /* padding: 0px; */
}

.el-card__body {
  padding: 0px;
}

p{
  font-size: 14px;
}
</style>