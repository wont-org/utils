import { getDataType } from './getDataType'

describe('getDataType 方法测试', () => {
  test('类型为 undefined', () => {
    expect(getDataType()).toBe('undefined')
  })
  test('类型为 string', () => {
    expect(getDataType('')).toBe('string')
  })
  test('类型为 number', () => {
    expect(getDataType(1)).toBe('number')
  })
  test('类型为 object', () => {
    expect(getDataType({})).toBe('object')
  })
  test('类型为 array', () => {
    expect(getDataType([])).toBe('array')
  })
  test('类型为 null', () => {
    expect(getDataType(null)).toBe('null')
  })
  test('类型为 date', () => {
    expect(getDataType(new Date())).toBe('date')
  })
  test('类型为 regexp', () => {
    expect(getDataType(/a/)).toBe('regexp')
  })
})
