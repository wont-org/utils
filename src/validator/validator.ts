/**
 * @description 校验是否符合中文名
 * @function validator
 * @returns {boolean} true/false
 * @param {ValidType} type - 需要校验的类型
 * @param {string} val - 需要校验的值
 * @author liukun <919590347@qq.com>
 * @example
 * import { validator } from '@wont/utils'
 * validator('mobile', '13233333333')  // returns true
 *
 * // bank
 * // 范校验，具体：https://gist.github.com/yanweijia/7fea45eab57a0ff355d71546411b004a
 * // 银行卡生成测试：https://ddu1222.github.io/bankcard-validator/bcBuilder.html
 * validator('bank', '4026589624604900')  // returns true
 * // idCard
 * // 在线生成：https://welefen.com/lab/identify
 * validator('idCard', '6125251996060691351')
 */

/**
 * @enum {ValidType} 需要校验的类型
 */

const rulesInfo = {
  mobile: {
    label: '手机号',
    rules: /^1[3456789]\d{9}$/,
  },
  tel: {
    label: '座机号',
    rules: /^\d{3}-\d{8}$|^\d{4}-\d{7,8}$/,
  },
  email: {
    label: '邮箱',
    rules: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
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
    rules:
      /^(([\u4e00-\u9fa5]{1,10})(·{0,1})([\u4e00-\u9fa5]{1,10})){1,5}$|^(([A-z]{1,20})([,.·]{0,1})([A-z]{1,20})){1,100}$/,
  },
  idCard: {
    label: '身份证号',
    rules:
      /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  },
  number: {
    label: '数字',
    rules: /^\d+$/,
  },
  url: {
    label: 'url地址',
    rules:
      /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
  },
}

type ValidType = keyof typeof rulesInfo
export function validator(type: ValidType, val: string): boolean {
  const rules = rulesInfo[type].rules
  return rules.test(val)
}
