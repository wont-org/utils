/**
 * @description 数组转对象
 * @function arrayToObject
 * @param {array} [arr=[]] - 要转换的数组
 * @param {object} [fieldNames={key: 'value',value: 'label'}] - 转换结果对应数组中的key
 * @param {string} fieldNames.key - 要转换的数组的键名
 * @param {string} fieldNames.value - 要转换的数组的值名
 * @returns {object} 转换结果
 * @author liukun <919590347@qq.com>
 * @example
 * import { arrayToObject } from '@wont/utils'
 * arrayToObject([
 *  {
 *    value: 1,
 *    label: 'a',
 *  },
 *  {
 *    value: 2,
 *    label: 'b',
 *  },
 * ])  // return {a:1, b:2}
 */

export const arrayToObject = (
  arr: Record<string, string | number>[],
  fieldNames = {
    key: 'value',
    value: 'label',
  },
) => {
  const result = {}
  arr.forEach((item) => {
    const key = item[fieldNames.key]
    const value = item[fieldNames.value]
    result[key] = value
  })
  return result
}
