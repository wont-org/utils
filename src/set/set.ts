/**
 * @description 设置 object 对象中对应 path 属性路径上的值，如果 path 不存在，则创建
 * @function set
 * @param {object} object - 要修改的对象
 * @param {string | (string | number)[]} path - 要设置的对象路径
 * @param {any} val - 要设置的值
 * @returns {object} 返回修改后的对象
 * @author liukun <919590347@qq.com>
 * @example
 * import { set } from '@wont/utils'
 * const obj = { "editVal": 0, "editArrVal": [0], "setNestVal": {}, "setArrVal": [] }
 * set(obj, 'editVal', 2)  // returns { "editVal": 2, "editArrVal": [0], "setNestVal": {}, "setArrVal": [] }
 * set(obj, 'editArrVal[0]', 2)  // returns { "editVal": 2, "editArrVal": [2], "setNestVal": {}, "setArrVal": [] }
 * set(obj, 'setNestVal.setNestVal.setNestVal', 2)  // returns { "editVal": 2, "editArrVal": [2], "setNestVal": { setNestVal: { setNestVal: 2 } }, "setArrVal": [] }
 * set(obj, 'setArrVal[1]', 2)  // returns { "editVal": 2, "editArrVal": [2], "setNestVal": { setNestVal: { setNestVal: 2 } }, "setArrVal": [ empty, 2] }
 * set(obj, ['arr', 0], 0)  // returns { "editVal": 2, "editArrVal": [2], "setNestVal": { setNestVal: { setNestVal: 2 } }, "setArrVal": [ empty, 2], arr: [0] }
 */

export type Path = string | (string | number)[]
export function set(object: object, path: Path, val: any): object {
    const paths = Array.isArray(path)
        ? path
        : path.replace(/\[(\d+)\]/g, '.$1').split('.')
    let current = object
    const len = paths.length
    let i = 0
    while (i < len) {
        const key = paths[i]
        const isLast = i === len - 1
        if (!current[key]) {
            if (isLast) {
                current[key] = val
            } else {
                const isArray = /^\d$/.test(paths[i + 1].toString())
                current[key] = isArray ? [] : {}
            }
        }
        if (isLast) {
            current[key] = val
        } else {
            current = current[key]
        }
        i += 1
    }
    return object
}

// const obj = {
//     editVal: 0,
//     editArrVal: [0],
//     setNestVal: {},
//     setArrVal: [],
// }

// console.log('set :>> ', JSON.stringify(set(obj, 'editVal', 2), null, 2))
// console.log('set :>> ', JSON.stringify(set(obj, 'editArrVal[0]', 2), null, 2))
// console.log('set :>> ', JSON.stringify(set(obj, 'setNestVal.setNestVal.setNestVal', 2), null, 2))
// console.log('set :>> ', JSON.stringify(set(obj, 'setArrVal[1]', 2), null, 2))
// TODO 循环引用问题待处理
// console.log('set :>> ', set(obj, 'obj.test', obj))
