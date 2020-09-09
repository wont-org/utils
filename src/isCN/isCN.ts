/**
 * @description 校验是否符合中文
 * @function isCN
 * @returns {number} true/false
 * @param {number} val - 需要校验的值
 * @author liukun <919590347@qq.com>
 * @example
 * import { isCN } from '@wont/utils'
 * isCN('今天天气真好')  // returns true
 */

export function isCN(val: string): boolean {
    const reg = /^[\u4e00-\u9fa5]+$/
    return reg.test(val)
}
