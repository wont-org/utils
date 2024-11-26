/**
 * @description 函数柯里化。
 * 1. 定义。柯里化（Currying）是一种处理函数中含有多个参数的方法，并在只允许单一参数的框架中使用这些函数。这种转变被称为 “柯里化” 的过程。数学和理论计算机科学中的柯里化函数一次只可传入一个参数，但js中可连续传入多个参数，所以可转变为以下实现步骤
 *
 * 2. 实现步骤。<br/>
 * a. func参数已收集完成，执行func执行结果。<br/>
 * b. func参数未收集完成，继续收集
 * @function curry
 * @param {Function} func - 处理函数
 * @param {number} [arity=func.length] - 处理函数需要收集的参数个数，默认处理函数的参数个数
 * @returns {Function} 返回新的柯里化（curry）函数。
 * @author liukun <919590347@qq.com>
 * @example
 * import { curry } from '@wont/utils'
 * const fn = (a, b, c) => [a, b, c]
 * const curried = curry(fn)
 * const expected = [1, 2, 3]
 * curried(1, 2, 3)  // returns expected
 * curried(1, 2)(3)  // returns expected
 * curried(1)(2)(3)  // returns expected
 * curried(1)(2, 3)  // returns expected
 */

type Func = (...rest: any[]) => Func
export function curry(func: Func, arity = func.length): Func {
  return function carried(this: Func, ...args) {
    if (args.length >= arity) {
      return func.apply(this, args);
    }
    return function carried2(_this: Func, ...args2) {
      return carried.apply(_this, args.concat(args2));
    };
  };
}
