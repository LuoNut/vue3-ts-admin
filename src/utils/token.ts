/**
 * 设置token的功能函数
 * @param token
 */
export function SET_TOKEN(token: string) {
  localStorage.setItem('TOKEN', token)
}

/**
 * 获取token的功能函数
 */
export function GET_TOKEN() {
  return localStorage.getItem('TOKEN')
}
