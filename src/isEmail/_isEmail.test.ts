import { isEmail } from './isEmail'

describe('isEmail 方法测试', () => {
    test('符合邮箱', () => {
        expect(isEmail('919590347@qq.com')).toBeTruthy()
    })
    test('不符合邮箱', () => {
        expect(isEmail('919590347@qq')).toBeFalsy()
    })
})
