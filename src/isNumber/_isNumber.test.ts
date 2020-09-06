import { isNumber } from './isNumber'

describe('isNumber 方法测试', () => {
    test(" '1' isNumber toBeTruthy ", () => {
        expect(isNumber('1')).toBeTruthy()
    })
    test(" '' isNumber toBeFalsy ", () => {
        expect(isNumber('')).toBeFalsy()
    })
})
