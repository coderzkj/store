import {
  reqGetCode,
  reqRegister,
  reqLogin,
  reqUserInfo,
  reqLogOut
} from '@/api/index.js'
import {
  setToken,
  getToken,
  removeToken
} from '@/untils/token.js'
const state = {
  getPhoneCode: "",
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETPHONECODE(state, data) {
    state.getPhoneCode = data
  },
  LOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, data) {
    state.userInfo = data
  },
  CLEARUSER(state) {
    state.token = ""
    state.userInfo = {}
    //清除本地数据
    removeToken()
  }
}
const actions = {
  async getPhoneCode({
    commit
  }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETPHONECODE", result.data)
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async toRegister({
    commit
  }, {
    phone,
    code,
    password
  }) {
    let result = await reqRegister(phone, code, password)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async login({
    commit
  }, data) {
    let result = await reqLogin(data);
    if (result.code == 200) {
      commit("LOGIN", result.data.token)
      //在localstorage保存token(唯一标识)
      setToken(result.data.token)
      return "ok"
    } else {
      return Promise.reject(new Error("faile"))
    }
  },
  //获取用户信息
  async getUserInfo({
    commit
  }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("USERINFO", result.data)
      return "ok"
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //退出登录
  async logOut({
    commit
  }) {
    let result = await reqLogOut()
    if (result.code == 200) {
      //清除token userInfo
      commit("CLEARUSER")
      return "ok"
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