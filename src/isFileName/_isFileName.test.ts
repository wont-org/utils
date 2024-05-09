import { isFileName } from './isFileName'

describe('isFileName 方法测试', () => {
  test('returns empty string if input is empty', async () => {
    const result = await isFileName('')
    expect(result).toBe('')
  })

  test('returns error message if input contains special characters', async () => {
    const result = await isFileName('file\\name')
    expect(result).toBe('文件名称不可输入\\ / : * ? " < > |')
  })

  test('returns error message if input contains only spaces', async () => {
    const result = await isFileName('    ')
    expect(result).toBe('文件名称不可只输入空格')
  })

  test('returns empty string if input is valid', async () => {
    const result = await isFileName('file.txt')
    expect(result).toBe('')
  })
})
