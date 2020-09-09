/**
 * @description 校验是否符合身份证
 * @function isIdCard
 * @returns {boolean} true/false
 * @param {string} val - 需要校验的值
 * @author liukun <919590347@qq.com>
 * @example
 * 在线生成：https://welefen.com/lab/identify
 * import { isIdCard } from '@wont/utils'
 * isIdCard('612525199606069135')  // returns true
 */

export function isIdCard(val: string): boolean {
    const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    return reg.test(val)
}
