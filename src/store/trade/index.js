import {
  reqTradeList,
  reqAddressList
} from '@/api'

const state = {
  tradeList: {},
  //地址信息
  addressList:[]
}
const mutations = {
  TRADELIST(state, data) {
    state.tradeList = data
  },
  ADDRESSLIST(state, data) {
    state.addressList = data
  }
}
const actions = {
  async tradeList({
    commit
  }) {
    let result = await reqTradeList()
    if (result.code == 200) {
      commit("TRADELIST", result.data)
      return "ok"
    } else {
      return Promise.reject(new Error("faile"))
    }
  },
  async addressList({ commit }) {
    let result = await reqAddressList()
    if (result.code == 200) {
      commit("ADDRESSLIST", result.data)
      return "ok"
    } else {
      return Promise.reject(new Error("faile"))
    }
  }

}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}