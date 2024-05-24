import { snakeCase } from 'lodash-es'
import { convertObjKeys } from './convertObjKeys'

describe('convertObjKeys 方法测试', () => {
  test('单层对象转换', () => {
    expect(convertObjKeys({ camelCase: 1 }, snakeCase)).toStrictEqual({
      camel_case: 1,
    })
  })
})
