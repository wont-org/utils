import { getUrlParam } from './getUrlParam'

describe('getUrlParam 方法测试', () => {
    test('获取url中间参数', () => {
        expect(getUrlParam()).toBe('8080')
    })
})
