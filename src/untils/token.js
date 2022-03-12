//保存token
export function setToken(token) {
  localStorage.setItem("TOKEN", token)
}
//获得token
export function getToken() {
  return localStorage.getItem("TOKEN")
}
//移除token
export function removeToken() {
  localStorage.removeItem('TOKEN')
}