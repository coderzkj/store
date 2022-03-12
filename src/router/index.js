import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/home.vue'
import Detail from '@/pages/Detail/detail.vue'
import Login from '@/pages/Login/login.vue'
import Search from '@/pages/Search/search.vue'
import Register from '@/pages/Register/register.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
import Trade from "@/pages/Trade/index.vue"
import Pay from "@/pages/Pay/index.vue"
import PaySuccess from '@/pages/PaySuccess/index.vue'
import Center from '@/pages/Center/index.vue'
//center的二级路由
import myOrder from '@/pages/Center/childern/myOrder.vue'
import groupOrder from "@/pages/Center/childern/groupOrder.vue"
import store from '@/store'

Vue.use(Router)

const routes = [{
        path: '/center',
        name: 'Center',
        component: Center,
        //定义组件是否显示footer组件
        meta: {
            show: true
        },
        //二级路由
        children: [{
                path: 'myOrder',
                component: myOrder,
            },
            {
                path: 'groupOrder',
                component: groupOrder,
            },
            {
                path: '/center',
                redirect: 'myOrder',
            }
        ]
    },
    {
        path: '/paySuccess',
        name: 'PaySuccess',
        component: PaySuccess,
        //定义组件是否显示footer组件
        meta: {
            show: true
        }
    },
    //支付页面
    {
        path: '/pay',
        name: 'Pay',
        component: Pay,
        //定义组件是否显示footer组件
        meta: {
            show: true
        }
    },
    //订单页面
    {
        path: '/trade',
        name: 'Trade',
        component: Trade,
        //定义组件是否显示footer组件
        meta: {
            show: true
        }
    },
    {
        path: '/detail/:skuid',
        name: 'detail',
        component: Detail,
        //定义组件是否显示footer组件
        meta: {
            show: true
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        //定义组件是否显示footer组件
        meta: {
            show: true
        }
    },
    {
        path: '/',
        redirect: 'home'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            show: true
        }
    },
    {
        path: '/search/:keycode?',
        name: 'search',
        component: Search,
        meta: {
            show: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            show: true
        }
    },
    //购物车成功页面
    {
        path: '/AddCartSuccess',
        name: 'AddCartSuccess',
        component: AddCartSuccess,
        //定义组件是否显示footer组件
        meta: {
            show: true
        }
    },
    //购物车列表
    {
        path: '/ShopCart',
        name: 'ShopCart',
        component: ShopCart,
        //定义组件是否显示footer组件
        meta: {
            show: true
        }
    }

]
const router = new Router({
    routes,
    //解决滚动行为
    scrollBehavior(to, from, savedPosition) {
        return {
            y: 0
        }
    }
})
//路由导航守卫
//to:将要进去的地方
//from:从哪个地方来的
//next:前往的地方
//next() 全放行
//next('/home') 向指定路由跳转
//next(false) 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        //说明已经登录了 并且想去login页面
        if (to.path == "/login") {
            next('/home')
        } else {
            if (name) {
                //说明userInfo有信息
                next()
            } else {
                try {
                    //再派发一次信息
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    //说明此时token失效  重新去登陆
                    await store.dispatch("logOut")
                    next('/login')
                }
            }
        }
    } else {
        let toPath = to.path
        //如果用户未登录：去交易页面trade、去支付页面pay、支付成功页面paysuccess、个人中心 center/myorder  center/grouporder
        if (toPath.indexOf("trade") != -1 || toPath.indexOf("pay") != -1 || toPath.indexOf("center") != -1) {
            //跳到login页面进行登录 登录之后直接跳转到该页
            next(`/login?redirect=` + toPath)
        } else {
            //其他放行
            next()
        }
    }


})


export default router