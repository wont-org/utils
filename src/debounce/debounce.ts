/**
 * @description 函数防抖。
 * 1. 传入一个要防抖的函数，和一个延迟毫秒数
 * 2. 延迟时间后，执行回调，如果一定时间内多次触发，则重新计时，只执行最后一次
 * @function debounce
 * @param {Function} fn - 要防抖的函数
 * @param {number} [delay=300] - 延迟毫秒数
 * @returns {Function} 返回新的（防抖）函数
 * @author liukun <919590347@qq.com>
 * @example
 * import { debounce } from '@wont/utils'
 * const testFn = () => {
 *     console.log('debounce running...')
 * }
 * window.addEventListener('mousemove', debounce(testFn, 500))
 */

type Func = (...rest: any[]) => void
export function debounce(fn: Function, delay: number = 300): Func {
    let timer: NodeJS.Timeout
    return function next(this: Func, ...rest: any[]) {
        if (timer) {
            clearTimeout(timer)
        } else {
            timer = setTimeout(() => {
                fn.apply(this, rest)
            }, delay)
        }
    }
}
