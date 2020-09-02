import { get } from './get'

const obj = {
    a: {
        b: [
            {
                c: 'c',
            },
        ],
    },
    d: 'd',
}
/*
 * get(obj, 'a.b')  // returns [{c:'c'}]
 * get(obj, 'd')  // returns 'd'
 * get(obj, 'a.b[0].c')  // returns 'c'
 * get(obj, 'e')  // returns undefined
 * get(obj, 'a.b[1].c', '默认字符串')  // returns '默认字符串'
 */
describe('get 方法测试', () => {
    test('execute d', () => {
        expect(get(obj, 'd')).toEqual('d')
    })
    test('execute a.b', () => {
        expect(get(obj, 'a.b')).toEqual([{ c: 'c' }])
    })
    test('execute a.b[0].c', () => {
        expect(get(obj, 'a.b[0].c')).toEqual('c')
    })
    test('execute e', () => {
        expect(get(obj, 'e')).toEqual(undefined)
    })
    test('execute a.b[1].c 找不到属性，返回默认字符串', () => {
        expect(get(obj, 'a.b[1].c', '默认字符串')).toEqual('默认字符串')
    })
})
