import { isMobile } from './isMobile'

describe('13233333333 isMobile toBeTruthy', () => {
    test('execute', () => {
        expect(isMobile('13233333333')).toBeTruthy()
    })
})

describe('12233333333 isMobile toBeFalsy', () => {
    test('execute', () => {
        expect(isMobile('12233333333')).toBeFalsy()
    })
})
