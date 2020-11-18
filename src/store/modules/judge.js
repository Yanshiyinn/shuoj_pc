import { judge } from '@/api/judge'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { MessageBox, Message } from 'element-ui'
// import { reject } from 'core-js/fn/promise'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // judeg
  judge({ commit }, info) {
    const { language, code } = info
    return new Promise((resolve, reject) => {
      judge({
        problem_id: "1000", //待传入
        problem_region: "global",
        src: code,
        language: language,
        judge_type: "OI",
        output: true
      })
        .then((data) => {
          // const { data, result } = response;
          // commit('SET_TOKEN', data.token)
          // setToken(data.token)
          // console.log(data)
          if (data.err_msg) {
            Message({
              message: data.err_msg,
              type: "error"
            })
          } else {
            Message({
              message: data.err_msg || "提交成功"
            })
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  //get verification code
  getVeriCode({ commit }, mobile) {
    console.log(mobile.trim())
    return new Promise((resolve, reject) => {
      getVeriCode({ mobile: mobile.trim() }).then(response => {
        const { data } = response
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user quick login
  quickLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      quickLogin({ mobile: username.trim(), verification_code: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password, role: "net_friend" }).then(response => {
        const { data } = response
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        // resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

