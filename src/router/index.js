import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Error from '../views/Error.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/contest',
    name:'Contest',
    meta:{
      title:'比赛'
    },
    component: () => import(/* webpackChunkName: "contest" */ '../views/contest/Contest.vue')
  },
  {
    path:'/collect',
    name:'Collect',
    meta:{
      title:'题库'
    },
    component: () => import(/* webpackChunkName: "collect" */ '../views/collect/Collect.vue')
  },
  {
    path:'/collect/:id',
    name:'Code',
    meta:{
      title:'题库'
    },
    component: () => import(/* webpackChunkName: "collect" */ '../views/code/Code.vue')
  },
  {
    path:'/assign',
    name:'Assign',
    meta:{
      title:'作业'
    },
    component: () => import(/* webpackChunkName: "assign" */ '../views/assign/Assign.vue')
  },
  {
    path:'/history',
    name:'History',
    meta:{
      title:'提交记录'
    },
    component:()=>import(/* webpackChunkName: "history" */ '../views/history/History.vue')
  },
  {
    path:'/profile',
    name:'Profile',
    meta:{
      title:'个人中心'
    },
    component:()=>import(/* webpackChunkName: "history" */ '../views/profile/Profile.vue')
  },
  {
    path:'/manage',
    name:'Manage',
    meta:{
      title:'管理',
      // roles:['teacher','admin']
    },
    component:()=>import(/* webpackChunkName: "manage" */ '../views/manage/Manage.vue'),
    children:[
      {
        path:'/user',
        name:'ManageUser',
        meta:{
          title:'用户管理',
          // roles:['admin']
        },
        component:()=>import(/* webpackChunkName: "manageuser" */ '../views/manage/ManageUser.vue'),
      },
      {
        path:'/problem',
        name:'ManageProb',
        meta:{
          title:'题目管理',
          // roles:['admin']
        },
        component:()=>import(/* webpackChunkName: "manageprob" */ '../views/manage/ManageProb.vue'),
      },
      {
        path:'/assign',
        name:'ManageAssign',
        meta:{
          title:'作业管理',
          // roles:['admin','teacher']
        },
        component:()=>import(/* webpackChunkName: "manage" */ '../views/manage/ManageAssign.vue'),
      },
      {
        path:'/contest',
        name:'ManageContest',
        meta:{
          title:'比赛管理',
          // roles:['admin']
        },
        component:()=>import(/* webpackChunkName: "managecontest" */ '../views/manage/ManageContest.vue'),
      }
    ]
  },
  {
    path: '*',
    name:'Error',
    component:Error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
