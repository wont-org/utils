---
  to: src/<%= name %>/<%= name %>.ts
---
/**
 * 总体的描述
 * @function <%= name %>
 * @returns {number} 对返回值的描述
 * @param {number} a - 参数a的描述.
 * @throws {TypeError} 异常1的描述.
 * @author  xxx <xxx@xxx.com>
 * @example // returns 1
 * <%= name %>(1)
 */
export default function <%= name %>(a: number): number {
  return a
}
