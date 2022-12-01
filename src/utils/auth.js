// token
import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
// 获取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 本地存储token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 清除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
