---
  to: src/<%= name %>/<%= name %>.ts
---
/**
 * @description 总体的描述
 * @function <%= name %>
 * @returns {number} 返回值的描述
 * @param {number} a - 参数a的描述
 * @throws {TypeError} 异常的描述
 * @author xxx <xxx@xxx.com>
 * @example
 * import { <%= name %> } from '@wont/utils'
 * <%= name %>(1)  // returns 1
 */

export function <%= name %>(a: number): number {
    return a
}
