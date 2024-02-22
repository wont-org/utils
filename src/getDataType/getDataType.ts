/**
 * @description 获取数据类型
 * @function getDataType
 * @returns {string} 返回数据类型
 * @param {any} [data=undefined] - 可选，要检测的数据
 * @author liukun <919590347@qq.com>
 * @example
 * import { getDataType } from '@wont/utils'
 * getDataType(1)  // returns 'number'
 * getDataType([])  // returns 'array'
 * getDataType({})  // returns 'object'
 */

export function getDataType(data?: any): string {
  const typeStr = Object.prototype.toString.call(data)
  return typeStr.slice(typeStr.indexOf(' ') + 1, -1).toLowerCase()
}
