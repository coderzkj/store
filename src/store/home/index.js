import {
  reqCateGoryList,
  reqGetBannerList,
  reqGetFloorList
} from '@/api/index'

//home模块的小仓库
const state = {
  //state中数据不能瞎写 服务器返回对象就设为对象 服务器返回数组就返回数组
  cateGoryList: [],
  //banner图数据
  getBannerList: [],
  getFloorList:[]
}
const mutations = {
  CATEGORYLIST(state, data) {
    state.cateGoryList = data
  },
  GETBANNERLIST(state, data) {
    state.getBannerList = data
  },
  GETFLOORLIST(state, data) {
    state.getFloorList = data
  }
}
const actions = {
  //通过api接口请求数据
  cateGoryList({
    commit
  }) {
    reqCateGoryList().then(res => {
      if (res.code == 200) {
        commit("CATEGORYLIST", res.data)
      }
      console.log(res);
    }, err => {})

  },
  //banner
  getBannerList({
    commit
  }) {
    reqGetBannerList().then(res => {
      if (res.code == 200) {
        commit("GETBANNERLIST", res.data)
        console.log(res);
      }
    }, err => {})
  },
  //floor
  getFloorList({
    commit
  }) {
    reqGetFloorList().then(res => {
      if (res.code == 200) {
        commit("GETFLOORLIST", res.data)
        console.log(res);
      }
    }, err => {})
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