/**
 * @description 格式化数组对象为value、label形式，方便ui组件下拉
 * @function formatOptions
 * @param {array} arr - 要格式化的数组
 * @param {object} [fieldNames={value: 'key',label: 'value'}] - 转换结果对应数组中的key
 * @param {string} fieldNames.key - 要转换的数组的键名
 * @param {string} fieldNames.value - 要转换的数组的值名
 * @returns {array} 转换结果
 * @author liukun <919590347@qq.com>
 * @example
 * import { formatOptions } from '@wont/utils'
 * formatOptions([
 *  {
 *    key: 'a',
 *    value: 1,
 *  },
 *  {
 *    key: 'b',
 *    value: 2,
 *  },
 * ])  // return [{value: 'a', label: 1}, {value: 'b', label: 2}]
 */

export const formatOptions = (
  arr: Record<string, string | number>[],
  fieldNames = {
    value: 'key',
    label: 'value',
  },
) => arr.map((item) => ({
  value: item[fieldNames.value],
  label: item[fieldNames.label],
}))
