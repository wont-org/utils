---
  to: src/<%= name %>/<%= name %>.ts
---
/**
 * @description 函数功能介绍
 * @function <%= name %>
 * @param {number} a - 参数a的描述
 * @returns {number} 返回值的描述
 * @throws {TypeError} 异常的描述
 * @author liukun <919590347@qq.com>
 * @example
 * import { <%= name %> } from '@wont/utils'
 * <%= name %>(1)  // returns 1
 */

export function <%= name %>(a: number): number {
    return a
}
