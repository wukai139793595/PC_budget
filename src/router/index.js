import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {getCookie,setCookie} from '@/common/js/cookie';
import { Message, MessageBox } from 'element-ui';

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 客户登录
const component = {
  login: r => require.ensure([], () => r(require('@/views/login')), 'login'),
  layout: r => require.ensure([], () => r(require('@/components/layout')), 'layout')
};


Vue.use(Router);
const routers = [
  {path: '', redirect: '/login'},
  {path: '/', redirect: '/login'},
  {
    path: '/budget',
    name: 'budget',
    component: component.layout,
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: component.login,
    meta: {
      title: '登录',
      requireLogin: false
    }
  },
  // { path: '*', redirect: '/budget/home'} // 404 统一跳首页
];

function pushRouter(name, thisArray) {
  for (var i in routers) {
    if (routers[i].name == name) {
      for (var j in thisArray) {
        routers[i].children.push(thisArray[j]);
      }
    }
  }
}

// 客户登录 -- 引入模块路由添加进路由
import budget from './budget'

pushRouter('budget', budget);


const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: routers
});
  // const accountInfo={"areaId":"1","areaLvl":2,"areaName":"浙江","roleId":1,"waterMark":"王树志:13306814207"}
  // setCookie('token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.rXoGO6aBp_UhPOi0-ld6YxWXWT894SOhb0Dk7oCYG10')
  // window.sessionStorage.setItem('SysUserCode',13306814207)
  // window.sessionStorage.setItem('accountInfo',JSON.stringify(accountInfo))
  // window.sessionStorage.setItem('userName','王树志')
// 路由跳转之前
router.beforeEach((to, from, next) => {
  debugger
  // 显示loading过渡效果
  // store.dispatch("ChangeLoading", true);
  if(to.meta.requireLogin) {
      if(getCookie('token')) {
          next();
      } else {
          next('/login');
      }
  } else {
      next();
  }



  let token = getCookie('token');
  if(!token && to.path != '/login'){
    Message({
      type:'error',
      message:'登录失效，请重新登录',
    })
    router.push({path:'/login'});
  } 

  next();
  

  // 更新页面title
  window.document.title = to.meta.title ? `${to.meta.title}--浙江电信经营预算管理系统` : '浙江电信经营预算管理系统'
});


// 路由跳转之后
router.afterEach(function (to) {
  // 关闭loading过渡效果
  // store.dispatch("ChangeLoading", false);
});
export default router;
