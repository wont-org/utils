/**
 * @description 总体的描述
 * @function get 根据`object`对象的`path`路径获取值。 如果解析值是`undefined`会以`defaultValue`取代。
 * @returns {any} 返回解析的值
 * @param {object} object - 要检索的对象
 * @param {string} path - 要获取属性的路径
 * @param {any} [defaultValue=undefined] - 如果解析值是`undefined`，这值会被返回
 * @author liukun <919590347@qq.com>
 * @example
 * import { get } from '@wont/utils'
 * const obj = {
 *     a: {
 *         b: [
 *             {
 *                 c: 'c'
 *             }
 *         ]
 *     },
 *     d: 'd'
 * }
 * get(obj, 'a.b')  // returns [{c:'c'}]
 * get(obj, 'd')  // returns 'd'
 * get(obj, 'a.b[0].c')  // returns 'c'
 * get(obj, 'e')  // returns undefined
 * get(obj, 'a.b[1].c', '默认字符串')  // returns '默认字符串'
 */

export const get = (
  object: Record<string, unknown>,
  path: string,
  defaultValue?: unknown,
): unknown => {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = object;
  for (const key of paths) {
    result = Object(result)[key];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
};
