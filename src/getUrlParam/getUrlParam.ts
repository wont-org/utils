/**
 * @description 获取url参数
 * @function getUrlParam
 * @returns {string} url参数对应的值
 * @param {string} name - url参数
 * @param {string} url - url
 * @throws {TypeError} 异常的描述
 * @author  liukun <919590347@qq.com>
 * @example
 * getUrlParam()  // returns '8080'
 */
export function getUrlParam(
    name = 'id',
    url = 'http://localhost:8088/#/index?type=hash&id=8080&index=0',
) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const href = url || window.location.href
    const result = href.match(reg)
    return (result && decodeURI(result[2])) || ''
}
