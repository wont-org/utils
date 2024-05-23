import {
  decode as decodeAll, isValid, encode, encodeURI,
} from 'js-base64'

/**
 * @description base64 编码解码，包含encode、encodeURI、decode。decode时排除特殊字符
 * @function base64
 * @param {number} a - 参数a的描述
 * @returns {number} 返回值的描述
 * @throws {TypeError} 异常的描述
 * @author liukun <919590347@qq.com>
 * @example
 * import { decode } from '@wont/utils'
 * decode(1)  // returns 1
 */

const hasInvalidEncoding = (str: string): boolean => /[�]/.test(str)

const decode = (str: string): string => {
  if (typeof str !== 'string') {
    return ''
  }
  try {
    if (!isValid(str)) {
      return str
    }
    const result = decodeAll(str)
    if (hasInvalidEncoding(result)) {
      return str
    }
    return result
  } catch (error) {
    return str
  }
}

export const base64 = {
  encode,
  encodeURI,
  decode,
  hasInvalidEncoding,
  isValid,
}
