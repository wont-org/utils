/**
 * @description 是否是文件名称，windows系统不支持一些特殊字符，例如`\ / : * ? " < > |`
 * @function isFileName
 * @param {string} val - 需要校验的字符串
 * @returns {Promise<string>} 返回Promise，如果string为''则代表验证通过
 * @author liukun <919590347@qq.com>
 * @example
 * import { isFileName } from '@wont/utils'
 * const isValid = await isFileName('1')  // isValid=''
 */

export const isFileName = (val: string): Promise<string> => {
  const allSpaceReg = /^\s*$/
  const specCharsReg = /[\\/:*?"<>|]/
  if (!val) {
    return Promise.resolve('')
  }
  if (specCharsReg.test(val)) {
    return Promise.resolve('文件名称不可输入\\ / : * ? " < > |')
  }
  if (allSpaceReg.test(val)) {
    return Promise.resolve('文件名称不可只输入空格')
  }
  return Promise.resolve('')
}
