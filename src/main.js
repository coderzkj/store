import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import TypeNav from '@/components/TypeNav/typeNav.vue'
import Carousel from '@/components/Carousel/carousel.vue'
import Pagination from '@/components/Pagination/pagination.vue'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入api接口
import * as API from '@/api'
//引入mockjs
import '@/mock/mockServer'
//引swiper样式
import 'swiper/css/swiper.css'
//引入vee验证
//引入自定义插件
import jch from '@/plugins/jch';
//Vue.use使用这个插件的时候，会出发自定义插件对象的install方法
Vue.use(jch);

import '@/plugins/valadiate.js'
//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    beforeCreate() {
        //初始化事件总线
        Vue.prototype.$bus = this
        Vue.prototype.$api = API
    },
    router,
    store,
    ElementUI
}).$mount('#app')