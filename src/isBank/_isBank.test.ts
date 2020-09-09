import { isBank } from './isBank'

describe('isBank 方法测试', () => {
    test('符合银行卡号', () => {
        expect(isBank('4026589624604900')).toBeTruthy()
    })
    test('不符合银行卡号', () => {
        expect(isBank('0026589624604900')).toBeFalsy()
    })
})
