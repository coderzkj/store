import {
  reqGetSearchInfo,
  reqGetDetailList
} from '@/api/index'

//search的小仓库
const state = {
  //search的数据
  getSearchInfo: {},
  //detail的数据
  getDetailList: {}
}
const mutations = {
  GETSEARCHINFO(state, data) {
    state.getSearchInfo = data
  },
  GETDETAILLIST(state, data) {
    state.getDetailList = data
  }
}
const actions = {
  getSearchInfo({
    commit
  }, data) {
    reqGetSearchInfo(data).then(res => {
      if (res.code == 200) {
        commit("GETSEARCHINFO", res.data)
      }
      console.log(res);
    }, err => {})
  },
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
  }
}
//通过getters将数据划分好 这样不用在search页面中利用复杂的方法写了
const getters = {
  attrsList(state) {
    //后边跟个数组是为了怕像网络不好这些情况而没有请求过来数据,导致报错
    return state.getSearchInfo.attrsList || []
  },
  goodsList(state) {
    return state.getSearchInfo.goodsList || []
  },
  trademarkList(state) {
    return state.getSearchInfo.trademarkList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}