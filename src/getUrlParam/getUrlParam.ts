/**
 * @description 获取url参数
 * @function getUrlParam
 * @returns {string} url参数name对应的值
 * @param {string} name - url参数
 * @param {string} [url=window.location.href] 可选，url
 * @author liukun <919590347@qq.com>
 * @example
 * import { getUrlParam } from '@wont/utils'
 * getUrlParam('id', 'http://localhost:8088/#/index?type=hash&id=8080&index=0')  // returns '8080'
 */
export function getUrlParam(name: string, url?: string): string {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const href = url || window.location.href
  const result = href.match(reg)
  return (result && decodeURI(result[2])) || ''
}
