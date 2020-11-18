import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  // console.log(data)
  return request({
    url: '/user/login',
    method: 'post',
    data:qs.stringify(data),
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    }
  })
}

export function register(data) {
  // console.log(data)
  return request({
    url: '/user/register',
    method: 'post',
    data:qs.stringify(data),
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    }
  })
}

export function getVeriCode(data) {
  // console.log(data)
  return request({
    url: '/user/get_verification_code',
    method: 'post',
    data:qs.stringify(data),
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    }
  })
}

export function quickLogin(data) {
  // console.log(data)
  return request({
    url: '/user/quick_login',
    method: 'post',
    data:qs.stringify(data),
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/me',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function getAllUsers(){
  return request({
    url:'/user/manage/get_all_users',
    method:'get'
  })
}

export function changeInfo(data){
  return request({
    url: '/user/manage/change_info',
    method: 'post',
    data:qs.stringify(data),
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    }
  })
}

export function deleteUser(data){
  return request({
    url: '/user/manage/delete_user',
    method: 'post',
    data:qs.stringify(data),
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    }
  })
}