import { helloWorld } from './helloWorld'

describe('helloWorld 方法测试', () => {
    test('具体测试', () => {
        expect(helloWorld(1)).toBe(1)
    })
})
