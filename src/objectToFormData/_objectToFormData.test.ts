import { objectToFormData } from './objectToFormData'

describe('objectToFormData 方法测试', () => {
  test('execute', () => {
    const f = new FormData()
    f.append('aliasFunc', '1')
    expect(objectToFormData({ aliasFunc: 1 })).toStrictEqual(f)
  })
})
