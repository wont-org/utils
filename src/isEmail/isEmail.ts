/**
 * @description 校验是否符合邮箱
 * @function isEmail
 * @returns {boolean} true/false
 * @param {string} val - 需要校验的值
 * @author liukun <919590347@qq.com>
 * @example
 * import { isEmail } from '@wont/utils'
 * isEmail('919590347@qq.com')  // returns true
 */

export function isEmail(val: string): boolean {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    return reg.test(val)
}
