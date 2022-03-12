import {
  getShopCart,
  reqShopNum,
  reqDeleteShop,
  reqChangeState
} from '@/api/index.js'

let state = {
  shopCartInfo: [],
}
let mutations = {
  SHOPCARTINFO(state, data) {
    state.shopCartInfo = data
  }
}
let actions = {
  async shopCartInfo({
    commit
  }) {
    let result = await getShopCart()
    if (result.code == 200) {
      commit("SHOPCARTINFO", result.data)
      console.log(result);
    }
  },
  //修改购物车物品数量
  async changeShopNum({
    commit
  }, {
    skuId,
    skuNum
  }) {
    let result = await reqShopNum(skuId, skuNum);
    console.log(result);
  },
  //删除购物车数据
  async deleteShop({
    commit
  }, {
    skuId
  }) {
    let result = await reqDeleteShop(skuId)
    if (result.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error("faile"))
    }
  },
  //修改商品状态
  async changeState({
    commit
  }, {
    skuID,
    isChecked
  }) {
    let result = await reqChangeState(skuID, isChecked)
    console.log(result);
  },
  //删除选中部分的商品
  deleteAllChecked({
    getters,
    dispatch
  }) {
    let PromiseAll = []
    //数组有多少数据就会执行多少次删除操作
    getters.shopCartInfo.cartInfoList.forEach(shop => {
      let promise = (shop.isChecked == 1) ? dispatch("deleteShop", { skuId: shop.skuId }) : ''
      PromiseAll.push(promise)
    });
    //如果数组有一个失败 就失败 如果都成功 则成功
    return Promise.all(PromiseAll)
  },
  //全选状态
  allChooseState({getters,dispatch },{isChecked}) {
    let PromiseAll = []
    getters.shopCartInfo.cartInfoList.forEach(shop => {
      let promise =  dispatch("changeState", { skuID: shop.skuId,isChecked })
      PromiseAll.push(promise)
    });
    return Promise.all(PromiseAll)

  }
}
let getters = {
  //获取购物车数据列表
  cartInfoList(state) {
    return state.shopCartInfo[0].cartInfoList || []
  },
  //购物车的全部数据
  shopCartInfo(state) {
    return state.shopCartInfo[0] || {}
  }

}
export default {
  state,
  mutations,
  actions,
  getters
}