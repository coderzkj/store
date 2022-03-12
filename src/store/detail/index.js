import {
  reqGetDetailList,
  reqGetAddToCart
} from '@/api/index'
import getUuid from '@/untils/uuid_token'

//search的小仓库
const state = {
  //detail的数据
  getDetailList: [],
  uuid_token: getUuid()
}
const mutations = {
  GETDETAILLIST(state, data) {
    state.getDetailList = data
  }
}
const actions = {
  //reqGetDetailList
  getDetailList({
    commit
  }, data) {
    reqGetDetailList(data).then(res => {
      if (res.code == 200) {
        commit("GETDETAILLIST", res.data)
      }
      console.log(res);
    }, err => {})
  },
  //reqGetAddToCart
  async addUpdateShopCart({
    commit
  }, {
    skuId,
    skuNum
  }) {
    let result = await reqGetAddToCart(skuId, skuNum);
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
//通过getters将数据划分好 这样不用在search页面中利用复杂的方法写了
const getters = {
  categoryView(state) {
    return state.getDetailList.categoryView || {}
  },
  skuInfo(state) {
    return state.getDetailList.skuInfo || {}
  },
  //spuSaleAttrList
  spuSaleAttrList(state) {
    return state.getDetailList.spuSaleAttrList || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters
}