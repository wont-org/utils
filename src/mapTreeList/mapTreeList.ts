/**
 * @description 对树形数据进行映射和转换，支持自定义子节点键名、空子树清理、节点处理回调等功能
 * @function mapTreeList
 * @param {object} params - 入参对象
 * @param {array} params.treeList - 树形数据数组
 * @param {string} [params.childrenKey='children'] - 子节点的属性名称
 * @param {boolean} [params.clean=false] - 是否清理空子树（删除空的children数组）
 * @param {function} [params.onNode] - 节点处理回调函数，用于为每个节点添加增量属性
 * @returns {array} 映射后的树形数据数组
 * @throws {TypeError} 参数类型错误时抛出异常
 * @author liukun <919590347@qq.com>
 * @example
 * import { mapTreeList } from '@wont/utils'
 *
 * // 基础映射，添加层级信息
 * const tree = [{ id: 1, name: 'Node 1', children: [{ id: 11, name: 'Node 1-1' }] }]
 * const result = mapTreeList({
 *   treeList: tree,
 *   onNode: ({ node, depth }) => ({ level: depth })
 * })
 * // result: [{ id: 1, name: 'Node 1', level: 0, children: [{ id: 11, name: 'Node 1-1', level: 1 }] }]
 *
 * // 清理空子树
 * const treeWithEmpty = [{ id: 1, name: 'Node 1', children: [] }]
 * const cleaned = mapTreeList({ treeList: treeWithEmpty, clean: true })
 * // cleaned: [{ id: 1, name: 'Node 1' }] - 空的children被删除
 *
 * // 自定义子节点键名
 * const customTree = [{ id: 1, title: 'Root', items: [{ id: 2, title: 'Child' }] }]
 * // 使用 'items' 作为子节点的键名进行映射
 * const customResult = mapTreeList({ treeList: customTree, childrenKey: 'items' })
 */

type TreeNode<T> = {
  [K in keyof T]: T[K];
};

interface MapTreeListParams<T, K extends keyof T> {
  treeList: TreeNode<T>[];
  childrenKey?: K;
  clean?: boolean;
  onNode?: (params: {
    node: TreeNode<T>;
    depth: number;
    parent?: TreeNode<T>;
  }) => Partial<TreeNode<T>> | void; // 回调增量属性合并
}

export function mapTreeList<T extends Record<string, unknown>, K extends keyof T = 'children'>(
  params: MapTreeListParams<T, K>,
): TreeNode<T>[] {
  const {
    treeList,
    childrenKey = 'children' as K,
    clean = false,
    onNode,
  } = params;

  function recursiveMap(
    nodes: TreeNode<T>[],
    depth: number,
    parent?: TreeNode<T>,
  ): TreeNode<T>[] {
    return nodes.map((node) => {
      // 浅拷贝节点
      let newNode: TreeNode<T> = { ...node };

      // 递归处理子节点
      const children = newNode[childrenKey];
      if (Array.isArray(children)) {
        const mappedChildren = recursiveMap(children as TreeNode<T>[], depth + 1, newNode);

        if (clean) {
          // 清理空子树：没有子节点时删除 children 字段
          if (mappedChildren.length > 0) {
            newNode[childrenKey] = mappedChildren as T[K];
          } else {
            delete newNode[childrenKey];
          }
        } else {
          // 不清理，直接赋值（即使空数组也保留）
          newNode[childrenKey] = mappedChildren as T[K];
        }
      }

      // 回调合并增量属性
      if (onNode) {
        const result = onNode({ node: newNode, depth, parent });
        if (result && typeof result === 'object') {
          newNode = { ...newNode, ...result };
        }
      }

      return newNode;
    });
  }

  return recursiveMap(treeList, 0);
}
