import { isNumber } from './isNumber'

describe(" '1' isNumber toBeTruthy", () => {
    test('execute', () => {
        expect(isNumber('1')).toBeTruthy()
    })
})

describe(" '' isNumber toBeFalsy", () => {
    test('execute', () => {
        expect(isNumber('')).toBeFalsy()
    })
})
