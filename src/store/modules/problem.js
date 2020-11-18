import { getProbList, getProblem } from '@/api/problem'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { reject } from 'core-js/fn/promise'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {}
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
  // get problem list
  getProbList() {
    // const { username, password } = userInfo
    return new Promise((resolve,reject)=>{
      getProbList().then(response=>{
        resolve(response)
      }
      ).catch(err=>{
        reject(err)
      })
    })
  },

  getProblem({commit},id) {
    console.log(`id`,id)
    return new Promise((resolve,reject)=>{
      getProblem(id).then(response=>{
        resolve(response)
      }).catch(err=>{
        reject(err)
      })
    })
  }
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

