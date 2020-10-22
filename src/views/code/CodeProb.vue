<template>
  <div class="code-prob">
    <el-tabs v-model="activeName" style="overflow: auto;">
      <el-tab-pane label="题目详情" name="first">
        <!-- <h4>{{ content.title }}</h4> -->
        <h4 id="desc">问题描述</h4>
        <p>{{ content.description }}</p>
        <h4>输入内容</h4>
        <p>{{content.input}}</p>
        <h4>输出内容</h4>
        <p>{{content.output}}</p>
        <h4>输入样例</h4>
        <div v-for="(exmp,index) in content.examples" :key="index">
          <h5>样例{{index}}</h5>
          <p>输入</p>
          <p class="code">
          <code>
          {{exmp.inputExample}}
          </code>
          </p>
          <p>输出</p>
          <p class="code">
          <code>
            {{exmp.outputExample}}
          </code>
          </p>
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
    active:{
      type:String,
      default:"first"
    },
    content:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      
    };
  },
  computed:{
    activeName:{
      get() {
      return this.active||"first"
      },
      set() {}
    }
  }
  // updated(){
  //   this.activeName=this.active
  //   console.log(this.activeName,this.active)
  // },
  // mounted(){
  //   console.log(this.activeName,this.active)
  // }
};
</script>

<style scoped>
.code-prob {
  text-align: left;
  overflow: scroll;
  /* padding: 0px; */
}

/* .el-tabs__header {
  margin: 0px !important;
} */

/* .el-card__body {
  padding: 0px;
} */

p{
  font-size: 14px;
}

/* h4 {
  margin-top: 0px;
} */

h5 {
  margin:14px 0px;
}

.code {
  margin: 14px 0px;
  background-color: whitesmoke;
  padding: 10px;
  /* margin-top: 10px; */
  /* margin-bottom: 10px; */
}

#desc {
  margin-top: 0px;
}

</style>