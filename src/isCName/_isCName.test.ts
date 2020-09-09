import { isCName } from './isCName'

describe('isCName 方法测试', () => {
    test('符合中文名', () => {
        expect(isCName('马哥')).toBeTruthy()
    })
    test('不符合中文名', () => {
        expect(isCName('马哥·')).toBeFalsy()
    })
})
