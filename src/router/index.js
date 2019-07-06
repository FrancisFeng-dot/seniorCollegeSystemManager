import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const router = new Router({
  routes: [{ //注册
    path: '/',
    name: 'register',
    component: resolve => require(['@/pages/register'], resolve)
  }, { //登录
    path: '/login',
    name: 'login',
    component: () =>
      import ('@/pages/login')
  }, { //改密码
    path: '/chansword',
    component: () =>
      import ('@/pages/chansword')
  }, { //阅读章程
    path: '/charter',
    component: () =>
      import ('@/components/register/charter')
  }, { //提交学校信息表单
    path: '/application',
    component: () =>
      import ('@/components/register/application')
  }, { //提交成功下载
    path: '/applicasuc',
    name: 'statuspage',
    component: () =>
      import ('@/components/register/applicasuc')
  }, { //下载的pdf
    path: '/applicadetail',
    component: () =>
      import ('@/components/register/applicadetail')
  }, { //审核状态
    path: '/reviewsuc',
    component: () =>
      import ('@/components/register/reviewsuc')
  }], 
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
});

// router.beforeEach((to, from, next) => {
//   console.log('beforeEach');
//   next();
// if (process.env.NODE_ENV === 'development' || to.path === '/') {
//   next();
// } else {
//   /*线上环境暂时不允许访问除首页外*/
// }
//});
// router.beforeResolve((to, from, next) => {
//   console.log('beforeResolve');
//   next();
// })
// router.afterEach((to, from) => {
//   console.log('afterEach');
// });

export default router