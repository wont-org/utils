import { toFirstCase } from './toFirstCase'

describe('toFirstCase 全是大写', () => {
    test('execute WORD', () => {
        expect(toFirstCase('WORD')).toBe('Word')
    })
})
describe('toFirstCase 局部大写', () => {
    test('execute wOrd', () => {
        expect(toFirstCase('wOrd')).toBe('Word')
    })
})
describe('toFirstCase 全是小写', () => {
    test('execute word', () => {
        expect(toFirstCase('word')).toBe('Word')
    })
})
