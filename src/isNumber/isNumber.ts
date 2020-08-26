/**
 * @description 校验是否符合纯数字
 * @function isNumber
 * @returns {boolean} true/false
 * @param {string} val - 需要校验的值
 * @author liukun <919590347@qq.com>
 * @example
 * import { isNumber } from '@wont/utils'
 * isNumber('')  // returns false
 * isNumber('1')  // returns true
 */

export function isNumber(val: string): boolean {
    return /^\d+$/.test(val)
}
