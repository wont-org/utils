/**
 * @description 组合功能函数，按顺序执行
 * @function compose
 * @returns {Next} 返回一个执行函数
 * @param {any[]} fns - fns
 * @author liukun <919590347@qq.com>
 * @example
 * import { compose } from '@wont/utils'
 * const trim = (str) => str.trim()
 * const toLowerCase = (str) => str.toLowerCase()
 * const split = (str, sep = ',') => str.split(sep)
 * const getResult = compose([trim, toLowerCase, split])
 * getResult('a,b,c ') // returns [a, b, c]
 */

type Next = (param: any) => any
export function compose(fns: any[]): Next {
    return (param) => fns.reduce((arg, fn) => fn(arg), param)
}
