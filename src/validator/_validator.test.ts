import validator from './validator'

const { isMobile, isNumber } = validator

describe('validator isMobile toBeTruthy', () => {
    test('具体测试', () => {
        expect(isMobile('13233333333')).toBeTruthy()
    })
})

describe('validator isMobile toBeFalsy', () => {
    test('具体测试', () => {
        expect(isMobile('12233333333')).toBeFalsy()
    })
})

describe('validator isNumber toBeTruthy', () => {
    test('具体测试', () => {
        expect(isNumber('1')).toBeTruthy()
    })
})

describe('validator isNumber toBeFalsy', () => {
    test('具体测试', () => {
        expect(isNumber('')).toBeFalsy()
    })
})
