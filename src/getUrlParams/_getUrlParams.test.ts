import { getUrlParams } from './getUrlParams'

describe('getUrlParams 方法测试', () => {
  test('解析url参数结果为对象', () => {
    expect(getUrlParams('https://wont-org.github.io?a=1&b=2')).toStrictEqual({
      a: '1',
      b: '2',
    })
  })
})
