import { objectToFormData } from './objectToFormData'

describe('objectToFormData 方法测试', () => {
  test('execute', () => {
    const f = new FormData()
    f.append('a', '1')
    expect(objectToFormData({ a: 1 })).toStrictEqual(f)
  })
})
