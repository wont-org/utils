/**
 * @description 转换对象的key，比如将`camelCase`转换为`snake_case`，`convertObjKeys({camelCase: 1}, lodash.snakeCase)`
 * @function convertObjKeys
 * @param {Object|Array} data - 对象或数组对象，需要转换的原数据。
 * @param {Function} convertFn - key转换方法，可以直接使用`lodash.snakeCase`
 * @param {Object|Array} data - 对象或数组对象，转换后的数据。
 * @author liukun <919590347@qq.com>
 * @example
 * import { convertObjKeys } from '@wont/utils'
 * import {snakeCase} from 'lodash-es'
 *
 * convertObjKeys({camelCase: 1}, snakeCase)  // returns {camel_case: 1}
 */

export const convertObjKeys = (
  data: Record<string, any> | Record<string, any>[],
  convertFn: (key: string) => string,
): any => {
  if (!data || typeof data !== 'object') {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((item) => convertObjKeys(item, convertFn));
  }
  const newObj: Record<string, any> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const newKey = convertFn(key);
      const ele = data[key];
      newObj[newKey] = convertObjKeys(ele, convertFn);
    }
  }
  return newObj;
};
