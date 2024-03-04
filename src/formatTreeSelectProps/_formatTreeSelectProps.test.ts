import { formatTreeSelectProps } from './formatTreeSelectProps'

describe('formatTreeSelectProps 方法测试', () => {
  test('execute param only has tree', () => {
    const beforeTree = [
      {
        id: 1,
        label: '1-1',
        children: [
          {
            id: 11,
            label: '1-1-1',
            children: [
              {
                id: 111,
                label: '1-1-1-1',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: '2-1',
      },
    ]
    const afterTree = [
      {
        id: 1,
        value: 1,
        label: '1-1',
        selectable: false,
        children: [
          {
            id: 11,
            value: 11,
            label: '1-1-1',
            selectable: false,
            children: [
              {
                id: 111,
                value: 111,
                label: '1-1-1-1',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        value: 2,
        label: '2-1',
      },
    ]
    expect(
      formatTreeSelectProps({
        tree: beforeTree,
      }),
    ).toStrictEqual(afterTree)
  })
})
