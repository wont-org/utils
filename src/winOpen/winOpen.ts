/**
 * @description 新开标签页，使用`noopener noreferrer`防止安全漏洞，例如xss
 * @function winOpen
 * @param {object} [obj={ path, query = {}, target = '_blank' }] - 跳转所需信息
 * @param {string} obj.path - url路径
 * @param {object} obj.query - url参数对象
 * @param {string} [obj.target='_blank'] - 新开窗口
 * @author liukun <919590347@qq.com>
 * @example
 * import { winOpen } from '@wont/utils'
 * winOpen({path: 'https://wont-org.github.io', query: {a:'1',b:'2'}})  // 新开窗口路径为 'https://wont-org.github.io?a=1&b=2'
 */

export interface IWinOpenParams {
  path: string
  target?: string
  query?: string | string[][] | Record<string, string> | URLSearchParams
}
export const winOpen = (obj: IWinOpenParams): void => {
  const { path, query = {}, target = '_blank' } = obj;
  const urlParamsStr = new URLSearchParams(query).toString();
  const paramsStr = urlParamsStr ? `?${urlParamsStr}` : '';
  const newWindow = window.open(
    `${path}${paramsStr}`,
    target,
    'noopener noreferrer',
  );
  if (newWindow) {
    newWindow.opener = null;
  }
};
