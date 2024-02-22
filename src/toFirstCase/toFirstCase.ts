/**
 * @description 首字母大写
 * @function toFirstCase
 * @returns {string} 返回首字母大写
 * @param {string} word - 要转换的单词
 * @author liukun <919590347@qq.com>
 * @example
 * import { toFirstCase } from '@wont/utils'
 * toFirstCase('WORD')  // returns Word
 * toFirstCase('word')  // returns Word
 * toFirstCase('woRd')  // returns Word
 */

export function toFirstCase(word: string): string {
  const temp = word.toLowerCase()
  const result = temp.charAt(0).toUpperCase() + temp.slice(1)
  return result
}
