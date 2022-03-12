import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//引入进度条的样式
import "nprogress/nprogress.css";
//引入store仓库
import store from '@/store'

const requests = axios.create({
  //配置对象
  baseURL: "/api",
  //超时时间
  timeout: 5000
});
//请求拦截器:在发送请求之前 请求拦截器可以检测到,可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
  //config:配置对象 对象中有一个属性很重要,就是headers请求头
  //console.log(nprogress);
  //进度条开始
  if (store.state.detail.uuid_token) {
    //向请求头中添加uuid 叫什么名字可以事先与后台沟通好
    config.headers.userTempId = store.state.detail.uuid_token
  }
  //在请求头中添加token
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start();
  return config
})
//响应拦截器
requests.interceptors.response.use((res) => {
  //进度条结束
  nprogress.done();
  return res.data
}, (error) => {
  console.log('响应失败', error);
  return Promise.reject(new Error('faile'))
})
export default requests;