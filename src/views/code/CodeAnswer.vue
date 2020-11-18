<template>
  <div style="text-align: left">
    <el-card :body-style="{ padding: '0px' }" id="card">
      <div class="wrap">
        <el-select v-model="language" placeholder="选择语言">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
        ><el-tooltip
          class="item"
          effect="dark"
          content="上传文件"
          placement="right"
        >
          <el-button
            size="small"
            type="primary"
            icon="el-icon-upload2"
            circle
          ></el-button>
        </el-tooltip>
      </div>
      <codemirror
        ref="cmEditor"
        :value="code"
        :options="cmOptions"
        @ready="onCmReady"
        @focus="onCmFocus"
        @input="onCmCodeChange"
      />
    </el-card>
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
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
// import base style
import "codemirror/lib/codemirror.css";
import { judge } from "@/api/judge";

export default {
  name: "CodeAnswer",
  components: {},
  data() {
    return {
      code: `int main(){
        int a = 10;
        return 0;
      }`,
      cmOptions: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        // more CodeMirror options...
      },
      options: [
        {
          value: "c",
          label: "C",
        },
        {
          value: "cpp",
          label: "C++",
        },
        {
          value: "python",
          label: "Python",
        },
        {
          value: "java",
          label: "Java",
        },
      ],
      language: "c",
      msg: "上传文件",
    };
  },
  methods: {
    onCmReady(cm) {
      console.log("the editor is readied!", cm);
    },
    onCmFocus(cm) {
      console.log("the editor is focused!", cm);
    },
    onCmCodeChange(newCode) {
      console.log("this is new code", newCode);
      this.code = newCode;
    },
    handleClick() {
      // this.$emit("submit", { a: 100 });
      // register({ commit }, userInfo) {
      // const { username, password } = userInfo
      // 等正式判题方式出来后可改
      this.$store
        .dispatch("judge/judge", {
          language: this.language,
          code: this.code,
        })
        .then((response) => {
          // console.log(response)
          this.$emit("submit", response);
          // this.$router.push({ path: this.redirect || "/" });
          // this.loading = false;
        })
        .catch((error) => {
          // this.loading = false;
          // console.log(1)
          console.log(error);
        });
      // }
    },
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror;
    },
  },
  mounted() {
    console.log("the current CodeMirror instance object:", this.codemirror);
    // you can use this.codemirror to do something...
  },
};
</script>

<style>
.CodeMirror {
  text-align: left;
  height: 67vh;
  width: 100%;
  position: absolute;
  bottom: 0px;
}
</style>

<style scoped>
.el-select {
  margin-bottom: 10px;
  margin-right: 2px;
}

.wrap {
  padding: 2vh 0px 2vh 20px;
}

.el-card {
  margin-top: 10px;
  margin-bottom: 10px;
  /* height: 77%; */
  /* overflow-y: scroll; */
  /* position: fixed; */
  /* bottom: 20px; */
  height: 77vh;
  position: relative;
}

.el-button {
  margin-left: 8px;
}
</style>