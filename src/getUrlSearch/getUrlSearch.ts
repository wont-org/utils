/**
 * @description 传入对象，转换为url参数，结果符合`window.location.search`
 * @function getUrlSearch
 * @param {object} obj - 需要转换的对象
 * @returns {string} 返回结果符合`window.location.search`
 * @author liukun <919590347@qq.com>
 * @example
 * import { getUrlSearch } from '@wont/utils'
 * getUrlSearch({a:'1',b:'2'})  // a=1&b=2'
 */

export const getUrlSearch = (obj: Record<string, string>): string => {
  const searchParams = new URLSearchParams(obj)
  return searchParams.toString()
}
