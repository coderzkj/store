import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart/shopCart.js'
import user from './user/index.js'
import trade from "./trade/index.js"

Vue.use(Vuex)
export default new Vuex.Store({
  //实现模块式开发储存数据
  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade
  }
})