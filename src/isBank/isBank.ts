/**
 * @description 校验是否符合银行卡号
 * @function isBank
 * @returns {boolean} true/false
 * @param {string} val - 需要校验的值
 * @author liukun <919590347@qq.com>
 * @example
 * 范校验，具体：https://gist.github.com/yanweijia/7fea45eab57a0ff355d71546411b004a
 * 银行卡生成测试：https://ddu1222.github.io/bankcard-validator/bcBuilder.html
 * import { isBank } from '@wont/utils'
 * isBank('4026589624604900')  // returns true
 */

export function isBank(val: string): boolean {
    const reg = /^[1-9]\d{15,19}$/
    return reg.test(val)
}
