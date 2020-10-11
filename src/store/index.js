import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    probData: [
      {
        id: 1,
        content: {
          description: "最简单的A+B问题",
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
        sources: [{}, {}],
        tags: [
          "Basic"
        ],
        region: "Shanghai",
        lowestUserIdentity: "USER",
        whitelist: ["user1", "user2"],
        AC:0.5
      },
      {
        id: 2,
        content: {
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
        sources: [{}, {}],
        tags: [
          "Middle",
          "wierdy"
        ],
        region: "Global",
        lowestUserIdentity: "USER",
        whitelist: ["user1", "user2"],
        AC:0.3
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
