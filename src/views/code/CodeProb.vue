<template>
  <div class="code-prob">
    <el-card :body-style="{ padding: '15px' }" v-loading="loading">
      <div class="prob-info">
        <h4 id="title">{{ problem.title }}</h4>
        <template>
          <el-tag size="small" type="success">{{ problem.difficulty | difficultCN }}</el-tag>
        </template>
        <template v-for="(tag, index) in problem.tags">
          <el-tag size="small" :key="index">{{ tag }}</el-tag>
        </template>
      </div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleChange"
        style="overflow: auto"
      >
        <el-tab-pane label="题目详情" name="first">
          <!-- <h4>{{ content.title }}</h4> -->
          <h4 id="desc">题目描述</h4>
          <p v-html="parseToMD(problem.problem.description)"></p>
          <template v-if="problem.problem.inputExplain">
          <h4>输入内容</h4>
          <p v-html="parseToMD(problem.problem.inputExplain)"></p>
          </template>
          <template v-if="problem.problem.outputExplain">
          <h4>输出内容</h4>
          <p v-html="parseToMD(problem.problem.outputExplain)"></p>
          </template>
          <!-- <h4>输入样例</h4> -->
          <p style="height: 10px"></p>
          <div v-for="(exmp, index) in problem.problem.examples" :key="index">
            <h5>示例{{ index + 1 }}</h5>
            <p>输入</p>
            <p class="code">
              <code>
                {{ exmp.inputExample }}
              </code>
            </p>
            <p>输出</p>
            <p class="code">
              <code>
                {{ exmp.outputExample }}
              </code>
            </p>
          </div>
          <!-- <h4>输出样例</h4>
        <code v-for="(exmp,index) in content.examples" :key="index">
          {{exmp.outputExample}}
        </code> -->
        </el-tab-pane>

        <el-tab-pane label="提交记录" name="second">
          <!-- {{problemId}} -->
          <!-- {{result}} -->
          <template v-if="this.results===this.result">
            <p class="no-data">暂无提交</p>
          </template>
          <template v-else>
            <Submits :results="results" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="讨论" name="third">讨论</el-tab-pane>
        <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
      </el-tabs>
    </el-card>
    <el-button
      @click="drawer = true"
      type="primary"
      size="medium"
      icon="el-icon-more-outline"
    >
      题目列表
    </el-button>
  </div>
</template>

<script>
import Submits from "@/components/tables/Submits";
import { getProblem } from "@/api/problem";
import { parseMD } from "@/utils/parse"

export default {
  name: "CodeProb",
  components: {
    Submits,
  },
  props: {
    // data:{
    //   title:'A+B之和'
    // }
    active: {
      type: String,
      default: "first",
    },
    // content: {
    //   type: Object,
    //   default: {},
    // },
    problemId: {},
    results: {
      type: Array,
      default: [],
    },
    result:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      // activeName:,
      loading: true,
      problem: {
        id: 1000,
        title: null,
        problem: {
          description: "",
          inputExplain: "",
          outputExplain: "",
          examples: [
            {
              inputExample: null,
              outputExample: null,
            },
            {
              inputExample: null,
              outputExample: null,
            },
          ],
          hint: null,
          maxCpuTime: null,
          maxMemory: null
        },
        tags: [],
        sources: null,
        difficulty: null,
        acceptTimes: 0,
        submitTimes: 0,
        acceptRate: 0.0,
        defaultMaxCpuTime: null,
        defaultMaxMemory: null
      },
    };
  },
  computed: {
    activeName: {
      get() {
        return this.active || "first";
      },
      set() {
        // this.active
      },
    },
    // results: {
    //   get() {
    //     // console.log([this.result])
    //     return [this.result];
    //   },
    // },
  },
  filters:{
    difficultCN(diff){
      const mapDiff={
        "Naive":"简单",
        "Navie":"简单",
        "Middle":"中等",
        "Hard":"困难"
      }
      return mapDiff[diff]
    }
  },
  methods: {
    handleChange(tab) {
      this.$emit("tabChange", tab);
    },
    parseToMD(str){
      // console.log(typeof str,str)
      str=parseMD(str)
      // console.log(str)
      return str
    }
  },
  updated() {
    // this.activeName=this.active
    // console.log(this.activeName,this.active)
    // console.log(`results`,this.results)
  },
  created() {
    // console.log(this.results)
    const promise = new Promise((resolve, reject) => {
      getProblem(this.problemId)
        .then((response) => {
          const { data } = response;
          // commit('SET_TOKEN', data.token)
          // setToken(data.token)
          // console.log(data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    promise
      .then((data) => {
        this.problem = data.problem;
        this.loading=false;
        // console.log(this.problem);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // mounted(){
  //   console.log(this.activeName,this.active)
  // }
};
</script>

<style>
.el-tabs__header {
  margin: 0 0 18px;
}
</style>

<style scoped>
.code-prob {
  text-align: left;
  /* overflow: scroll; */
  /* padding: 0px; */
}

/* .el-tabs__header {
  margin: 0px !important;
} */

/* .el-card__body {
  padding: 0px;
} */

p {
  font-size: 14px;
  line-height: 170%;
}

h4 {
  /* margin-top: 0px; */
  margin: 18px 0px;
}

h5 {
  margin: 14px 0px;
  font-size: 14px;
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

.el-card {
  margin: 10px 0;
  overflow-y: scroll;
  height: 77vh;
}

.el-tag {
  margin: 10px 10px 10px 0;
}

#title {
  margin: 4px 0px;
}

.no-data {
  color: #C0C4CC;
  text-align: center;
}
</style>