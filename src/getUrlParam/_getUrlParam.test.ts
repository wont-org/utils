import { getUrlParam } from './getUrlParam'

describe('getUrlParam 方法测试', () => {
  test('获取url中间参数', () => {
    expect(
      getUrlParam('id', 'http://localhost:8088/index?type=hash&id=111&index=0'),
    ).toBe('111')
  })
})
