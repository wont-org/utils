/**
 * @description 格式化tree属性为TreeSelect所需
 * @function formatTreeSelectProps
 * @param {object} obj - 入参对象
 * @param {object} obj.tree - 原始tree
 * @param {object} [obj.fieldNames={id: 'key', label: 'label', children: 'children'}] - 格式化tree所需的属性
 * @param {boolean} [obj.parentSelectable = false] - 父级是否可选择，默认不可选
 * @returns {array} 格式化后符合TreeSelect的tree
 * @author liukun <919590347@qq.com>
 * @example
import { formatTreeSelectProps } from '@wont/utils'

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
formatTreeSelectProps({
  tree: beforeTree,
})
// return afterTree
 */
interface FieldNames {
  value: string
  label: string
  children: string
}
interface Params {
  tree: Record<string, any>[]
  fieldNames?: FieldNames
  parentSelectable?: boolean
}

type FormatTreeSelectProps = (Params: Params) => Params['tree']

export const formatTreeSelectProps: FormatTreeSelectProps = ({
  tree,
  fieldNames = {
    value: 'id',
    label: 'label',
    children: 'children',
  },
  parentSelectable = false,
}) => tree.map((item) => {
  if (
    Array.isArray(item[fieldNames.children])
      && item[fieldNames.children].length > 0
  ) {
    return {
      ...item,
      selectable: parentSelectable,
      value: item[fieldNames.value],
      label: item[fieldNames.label],
      children: formatTreeSelectProps({
        tree: item[fieldNames.children],
        fieldNames,
        parentSelectable,
      }),
    }
  }
  return {
    ...item,
    value: item[fieldNames.value],
    label: item[fieldNames.label],
  }
})
