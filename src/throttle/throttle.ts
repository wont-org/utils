/**
 * @description 函数节流。在wait秒内最多只执行一次func，且执行第一次触发的func
 * @function throttle
 * @param {Function} func - 要节流的函数
 * @param {number} [wait=300] - 需要节流的毫秒
 * @returns {Function} 返回节流函数
 * @author liukun <919590347@qq.com>
 * @example
 * import { throttle } from '@wont/utils'
 * const testFn = () => {
 *     console.log('throttle running...')
 * }
 * window.addEventListener('mousemove', throttle(testFn, 500))
 */

type Func = (...rest: any[]) => void
export function throttle(func: Function, wait = 300): Func {
  let lastTime = 0
  return function next(this: Func, ...rest) {
    const nowTime = Date.now()
    if (nowTime - lastTime >= wait || !lastTime) {
      func.apply(this, rest)
      lastTime = nowTime
    }
  }
}
