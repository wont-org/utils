/**
 * @description 函数组合。将两个或两个以上的函数组合生成一个新函数，新函数会按照栈顺序执行传入函数
 * @function compose
 * @param {Array.Function} funcs - 函数组成的数组
 * @returns {Function} 返回一个执行函数，可传入需要处理的参数
 * @author liukun <919590347@qq.com>
 * @example
 * import { compose } from '@wont/utils'
 * const trim = (str) => str.trim()
 * const toLowerCase = (str) => str.toLowerCase()
 * const split = (str, sep = ',') => str.split(sep)
 * const getResult = compose([trim, toLowerCase, split])
 * getResult('a,b,c ') // returns [a, b, c]
 */

type Fn = (...rest: any[]) => any
export function compose(funcs: Function[]): Fn {
    return (param) => funcs.reduce((arg, fn) => fn(arg), param)
}
