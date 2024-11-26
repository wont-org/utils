import {
  decode as decodeAll, isValid, encode, encodeURI,
} from 'js-base64';

/**
 * @description base64.encode base64编码，用来接口传输
 * @function encode
 * @param {string} str - 要编码的字符串
 * @returns {string} 返回编码后的结果
 * @author liukun <919590347@qq.com>
 * @example
 * import { base64 } from '@wont/utils'

 * const query = '(ip.port="443") && country=="中国"'
 * base64.encode(query)  // returns KGlwLnBvcnQ9IjQ0MyIpICYmIGNvdW50cnk9PSLkuK3lm70i
 */

/**
 *
 * @description base64.encodeURI  base64编码为url safe的字符串，用来作为URL参数跳转
 * @function encodeURI
 * @param {string} str - 要编码为url safe的字符串
 * @returns {string} 返回编码后的结果
 * @author liukun <919590347@qq.com>
 * @example
 * import { base64 } from '@wont/utils'

 * const query = '(ip.port="443") && country=="中国"'
 * base64.encodeURI(query)  // url safe returns KGlwLnBvcnQ9IjQ0MyIpICYmIGNvdW50cnk9PSLkuK3lm70i
 */

/**
 * @description base64.decode  base64解码，能解码base64.encode和base64.encodeURI
 * @function decode
 * @param {string} str - 要解码的字符串
 * @returns {string} 返回编码后的结果
 * @author liukun <919590347@qq.com>
 * @example
 * import { base64 } from '@wont/utils'

 * const query = '(ip.port="443") && country=="中国"'
 * base64.encode(query)  // returns KGlwLnBvcnQ9IjQ0MyIpICYmIGNvdW50cnk9PSLkuK3lm70i
 * base64.encodeURI(query)  // url safe returns KGlwLnBvcnQ9IjQ0MyIpICYmIGNvdW50cnk9PSLkuK3lm70i
 * base64.decode(KGlwLnBvcnQ9IjQ0MyIpICYmIGNvdW50cnk9PSLkuK3lm70i)  // '(ip.port="443") && country=="中国"'
 */

const hasInvalidEncoding = (str: string): boolean => /[�]/.test(str);

const decode = (str: string): string => {
  if (typeof str !== 'string') {
    return '';
  }
  try {
    if (!isValid(str)) {
      return str;
    }
    const result = decodeAll(str);
    if (hasInvalidEncoding(result)) {
      return str;
    }
    return result;
  } catch (error) {
    return str;
  }
};

export const base64 = {
  encode,
  encodeURI,
  decode,
  hasInvalidEncoding,
  isValid,
};
