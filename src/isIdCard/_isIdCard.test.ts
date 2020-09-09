import { isIdCard } from './isIdCard'

describe('isIdCard 方法测试', () => {
    test('不符合身份证，小于18位', () => {
        expect(isIdCard('6125')).toBeFalsy()
    })
    test('不符合身份证，大于18位', () => {
        expect(isIdCard('6125251996060691351')).toBeFalsy()
    })
    test('不符合身份证，等于18位', () => {
        expect(isIdCard('6666661996060691351')).toBeFalsy()
    })
    test('符合身份证,，不带x', () => {
        expect(isIdCard('612525199606069135')).toBeTruthy()
    })
    test('符合身份证，带x', () => {
        expect(isIdCard('61252519960606545x')).toBeTruthy()
    })
})
