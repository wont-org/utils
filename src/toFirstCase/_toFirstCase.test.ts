import { toFirstCase } from './toFirstCase'

describe('toFirstCase 方法测试', () => {
  test('WORD => Word', () => {
    expect(toFirstCase('WORD')).toBe('Word')
  })
  test('wOrd => Word', () => {
    expect(toFirstCase('wOrd')).toBe('Word')
  })
  test('word => Word', () => {
    expect(toFirstCase('word')).toBe('Word')
  })
})
