<template>
  <div style="text-align: left;overflow: scroll;">
    <div class="wrap">
    <el-select v-model="language" placeholder="选择语言">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <span v-tip.dark="msg">
    <el-button size="small" type="primary" icon="el-icon-upload2" circle></el-button>
    </span>
    </div>
    <codemirror
      ref="cmEditor"
      :value="code"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
    />
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
// import base style
import "codemirror/lib/codemirror.css";

export default {
  name: "CodeAnswer",
  data() {
    return {
      code: "const a = 10",
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
          value: "c++",
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
      language: "",
      msg:"上传文件",

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
  height: 66vh;
  position: absolute;
  bottom: 0px;
}

.el-select {
  margin-bottom: 10px;
  margin-right: 10px;
}

.wrap {
  padding:2vh 0px 2vh 20px;
}
</style>