/**
 * @description 获取url参数，解析为一个对象
 * @function getUrlParams
 * @param {string} [url=window.location.href] - 合法的url
 * @returns {Object} 解析url的参数，结果为对象
 * @author liukun <919590347@qq.com>
 * @example
 * import { getUrlParams } from '@wont/utils'
 * getUrlParams('https://wont-org.github.io?a=1&b=2')  // returns {a:'1',b:'2'}
 */

export function getUrlParams(
  url: string = window.location.href,
): Record<string, string> {
  const result = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => {
    result[k] = v;
    return v;
  });
  return result;
}
