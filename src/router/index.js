import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManage from '../views/UserManage'
import AddUser from '../views/AddUser'
import Index from '../views/Index'
import UserUpdate from '../views/UserUpdate'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"用户管理",
    component:Index,
    show:true,
    redirect:"/login",
    children:[
      {
        path:"/UserManage",
        name:"查询用户",
        component:UserManage
      },
      {
        path:"/AddUser",
        name:"添加用户",
        component:AddUser
      }
    ]
  },
  {
    path:'/update',
    component:UserUpdate,
    show:false
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
