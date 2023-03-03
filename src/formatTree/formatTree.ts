/**
 * @description 函数功能介绍
 * @function formatTree
 * @param {number} a - 参数a的描述
 * @returns {number} 返回值的描述
 * @throws {TypeError} 异常的描述
 * @author liukun <919590347@qq.com>
 * @example
 * import { formatTree } from '@wont/utils'
 * formatTree(1)  // returns 1
 */

type Fn = (...rest: any[]) => boolean | void
interface Param {
    obj: Record<string, any>
    cb: Fn
    level?: number
    key?: string
}

export function formatTree(param: Param): boolean | void {
    const {
        obj,
        cb,
        level = 1,
        key = 'children',
    } = param
    const treeItem = obj[key]
    const editedObj = cb(obj, level)
    if (editedObj) return editedObj
    if (!(Array.isArray(treeItem) && treeItem.length > 0)) {
        return true
    }
    for (const item of treeItem) {
        const needStop = formatTree({
            obj: item,
            cb,
            key,
            level: level + 1,
        })
        if (needStop) {
            break
        }
    }
}
