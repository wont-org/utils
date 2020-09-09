/**
 * @description 校验是否符合中文名
 * @function isCName
 * @returns {number} true/false
 * @param {number} val - 需要校验的值
 * @author liukun <919590347@qq.com>
 * @example
 * import { isCName } from '@wont/utils'
 * isCName('马哥')  // returns true
 */

export function isCName(val: string): boolean {
    const reg = /^(([\u4e00-\u9fa5]{1,10})(·{0,1})([\u4e00-\u9fa5]{1,10})){1,5}$|^(([A-z]{1,20})([,.·]{0,1})([A-z]{1,20})){1,100}$/
    return reg.test(val)
}
