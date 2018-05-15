import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/view/home'
import store from './../store'
const load = (view) => () => import(`@/view/${ view }`)

Vue.use(Router)

let routes = [
    {
      path: '/',
      name: '首页',
      redirect: '/index'
    },
    {
      path: '/auth',
      name: '登陆',
      component: load('auth'),
    },
    {
      path: '/index',
      name: '',
      component: load('home'),
      children: [
        {
          path: 'sidebar',
          component: load('sidebar')
        },
        {
          path: 'table',
          name: '表格',
          component: load('table')
        },
        {
          path: 'theme',
          name: '切换主题',
          component: load('theme')
        }
      ]
    },
//  {
//    path: '*',
//    hidden: true,
//    component: load('errors/404')
//  }
    
  ]


const router = new Router({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  let requiredAuth = !to.path.match(/\/(auth|errors)/)
  let authed = store.getters.getUser

  if(requiredAuth) {
    if (!authed) {
      next('/auth')
    } else {
      //next()
      if (to.matched.length === 0) {                                        //如果未匹配到路由
        from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
      } else {
        next();                                                                            //如果匹配到正确跳转
      }     
    }    
  } else {
    next()
  }

   
  

});

export default router
