import { formatOptions } from './formatOptions'

describe('formatOptions 方法测试', () => {
  test('execute param fieldNames use default', () => {
    expect(
      formatOptions([
        {
          key: 'a',
          value: 1,
        },
        {
          key: 'b',
          value: 2,
        },
      ])
    ).toStrictEqual([
      {
        value: 'a',
        label: 1,
      },
      {
        value: 'b',
        label: 2,
      },
    ])
  })
  test('execute param fieldNames use custom', () => {
    expect(
      formatOptions(
        [
          {
            key: 'a',
            value: 1,
          },
          {
            key: 'b',
            value: 2,
          },
        ],
        {
          value: 'key',
          label: 'value',
        }
      )
    ).toStrictEqual([
      {
        value: 'a',
        label: 1,
      },
      {
        value: 'b',
        label: 2,
      },
    ])
  })
})
