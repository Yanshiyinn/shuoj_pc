<template>
<div style="text-align:left;">
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
import { codemirror } from 'vue-codemirror'
// import base style
import 'codemirror/lib/codemirror.css'


export default {
  name:"CodeAnswer",
  data () {
    return {
      code: 'const a = 10',
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        // more CodeMirror options...
      }
    }
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focused!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  },
  mounted() {
    console.log('the current CodeMirror instance object:', this.codemirror)
    // you can use this.codemirror to do something...
  }
}
</script>

<style>
.CodeMirror {
  text-align: left;
  height: 440px;
}
</style>