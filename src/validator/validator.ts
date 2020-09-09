/**
 * @description 校验是否符合中文名
 * @function validator
 * @returns {number} true/false
 * @param {string} val - 需要校验的值
 * @param {number} type - 需要校验的类型
 * @author liukun <919590347@qq.com>
 * @example
 * import { validator } from '@wont/utils'
 * validator('mobile', '13233333333')  // returns true
 */

const rulesInfo = {
    mobile: {
        label: '手机号',
        rules: /^1[3456789]\d{9}$/,
    },
    email: {
        label: '邮箱',
        rules: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
    },
    address: {
        label: '地址',
        rules: /^[\u4E00-\u9FA5A-Za-z\d\-_]{5,60}$/,
    },
    bank: {
        label: '银行卡号',
        rules: /^[1-9]\d{15,19}$/,
    },
    CN: {
        label: '中文',
        rules: /^[\u4e00-\u9fa5]+$/,
    },
    CName: {
        label: '中文名',
        rules: /^(([\u4e00-\u9fa5]{1,10})(·{0,1})([\u4e00-\u9fa5]{1,10})){1,5}$|^(([A-z]{1,20})([,.·]{0,1})([A-z]{1,20})){1,100}$/,
    },
    idCard: {
        label: '身份证号',
        rules: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    },
    number: {
        label: '数字',
        rules: /^\d+$/,
    },
    url: {
        label: 'url地址',
        rules: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
    },
}

export function validator(type: string, val: string): boolean {
    const rules = rulesInfo[type].rules
    return rules.test(val)
}
