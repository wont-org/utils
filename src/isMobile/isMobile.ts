/**
 * @description 校验是否符合手机号
 * @function isMobile
 * @returns {boolean} true/false
 * @param {string} val - 需要校验的值
 * @author liukun <919590347@qq.com>
 * @example
 * import { isMobile } from '@wont/utils'
 * isMobile('13233333333')  // returns true
 * isMobile('12233333333')  // returns false
 */

export function isMobile(val: string): boolean {
    return /^1[3456789]\d{9}$/.test(val)
}
