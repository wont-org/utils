/**
 * @description 通过自定义函数cb，格式化tree为所需，直接在cb函数改变数值即可
 * @function formatTree
 * @param {object} obj - 入参对象
 * @param {object} obj.tree - 原始tree
 * @param {string} obj.key - 子树的属性名称
 * @param {function} [obj.cb] - 自定义格式化函数
 * @returns {array} 通过自定义格式化函数，格式化后的tree
 * @author liukun <919590347@qq.com>
 * @example
import { formatTree } from '@wont/utils'

const beforeTree = {
  id: 0,
  children: [
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
  ],
}
const afterTree = {
  id: 0,
  value: 0,
  selectable: false,
  children: [
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
  ],
}
formatTree({
    tree: beforeTree,
    key: 'children',
    cb: (obj) => {
        const result = obj
        result.value = obj.id
        if (result.children?.length > 0) {
            result.selectable = false
        }
    },
})
// returns afterTree
 */

type Fn = (...rest: any[]) => boolean | void
interface Param {
  tree: Record<string, any>
  cb: Fn
  level?: number
  key?: string
}

export function formatTree(param: Param): boolean | void {
  const { tree, cb, level = 1, key = 'children' } = param;
  const treeItem = tree[key];
  const editedObj = cb(tree, level);
  if (editedObj) return editedObj;
  if (!(Array.isArray(treeItem) && treeItem.length > 0)) {
    return true;
  }
  for (const item of treeItem) {
    const needStop = formatTree({
      tree: item,
      cb,
      key,
      level: level + 1,
    });
    if (needStop) {
      break;
    }
  }
}
