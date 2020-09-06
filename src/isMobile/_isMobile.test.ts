import { isMobile } from './isMobile'

describe('isMobile 方法测试', () => {
    test('13233333333 isMobile toBeTruthy', () => {
        expect(isMobile('13233333333')).toBeTruthy()
    })
    test('12233333333 isMobile toBeFalsy', () => {
        expect(isMobile('12233333333')).toBeFalsy()
    })
})
