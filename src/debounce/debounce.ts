/**
 * @description 函数防抖。
 * 1. 传入一个要防抖的函数，和一个延迟毫秒数
 * 2. 延迟时间后，执行回调，如果一定时间内多次触发，则重新计时，只执行最后一次
 * @function debounce
 * @param {Function} func - 要防抖的函数
 * @param {number} [wait=300] - 延迟毫秒数
 * @param {boolean} [immediate=false] - 是否立即执行func
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
export function debounce(func: Function, wait = 300, immediate = false): Func {
  let timer: NodeJS.Timeout | null
  return function next(this: Func, ...rest: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      !timer && func.apply(this, rest)
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        func.apply(this, rest)
        timer = null
      }, wait)
    }
  }
}
