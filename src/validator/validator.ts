/**
 * @description 总体的描述
 * @function validator
 * @returns {boolean} 返回校验结果
 * @param {string} str - 要被验证的字符串
 * @author  liukun <919590347@qq.com>
 * @example
 * import utils from '@wont/utils'
 * utils.validator.isMobile('13233333333')  // returns true
 * // or
 * import validator from '@wont/utils/validator'
 * import { validator } from '@wont/utils'
 * const {
 *     isMobile,
 *     isNumber,
 * } = validator
 * isMobile('13233333333')  // returns true
 * isMobile('12233333333')  // returns false
 * isNumber('')  // returns false
 * isNumber('1')  // returns true
 */

function isMobile(str: string): boolean {
    return /^1[3456789]\d{9}$/.test(str)
}

function isNumber(str: string): boolean {
    return /^\d+$/.test(str)
}

export default {
    isMobile,
    isNumber,
}
