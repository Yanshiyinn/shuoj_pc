import { login, logout, getInfo, quickLogin, getVeriCode, register, 
  getAllUsers, changeInfo, deleteUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

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
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ 
        identity_info: username.trim(), 
        password: password 
      }).then(response => {
        // const { data } = response
        // console.log(response)
        commit('SET_TOKEN', getToken())
        // setToken()
        resolve(response)
        // resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //get verification code
  getVeriCode({commit}, mobile) {
    console.log(mobile.trim())
    return new Promise((resolve,reject)=>{
      getVeriCode({mobile:mobile.trim()}).then(response=>{
        const {data}=response
        resolve()
      }).catch(error=>{
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
      register({ username: username.trim(), password: password, role:"net_friend" }).then(response => {
        const { data } = response
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get all users
  getAllUsers(){
    return new Promise((resolve,reject)=>{
      getAllUsers().then(response=>{
        const data=response
        if(!data){
          return reject('当前权限不支持此操作。')
        }
        resolve(data)
      }).catch(error=>{
        reject(error)
      })
    })
  },

  //change user info
  changeInfo({commit},userInfo){
    return new Promise((resolve,reject)=>{
      changeInfo(userInfo).then(response=>{
        const data=response
        // if(!data){
        //   return reject('当前权限不支持此操作。')
        // }
        resolve(data)
      }).catch(error=>{
        reject(error)
      })
    })
  },

  deleteUser({commit},id){
    return new Promise((resolve,reject)=>{
      deleteUser({id:id}).then(response=>{
        const data=response
        // if(!data){
        //   return reject('当前权限不支持此操作。')
        // }
        resolve(data)
      }).catch(error=>{
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = response

        // if (!data) {
        //   return reject('Verification failed, please Login again.')
        // }

        // const { name, avatar } = data

        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
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

