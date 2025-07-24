import { mapTreeList } from './mapTreeList';

// 定义测试数据的类型接口
interface TestNode extends Record<string, unknown> {
  id: number
  name: string
  children?: TestNode[]
}

interface TestNodeWithItems extends Record<string, unknown> {
  id: number
  name: string
  items?: TestNodeWithItems[]
}

interface TestNodeDeep extends Record<string, unknown> {
  id: number
  children?: TestNodeDeep[]
}

interface TestNodeInvalid extends Record<string, unknown> {
  id: number
  children?: unknown
}

describe('mapTreeList 方法测试', () => {
  test('基本功能测试', () => {
    const tree: TestNode[] = [
      {
        id: 1,
        name: 'Node 1',
        children: [
          {
            id: 11,
            name: 'Node 1-1',
          },
        ],
      },
    ];

    const result = mapTreeList({
      treeList: tree,
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Node 1');
    expect(result[0].children).toHaveLength(1);
    expect(result[0].children![0].id).toBe(11);
  });

  test('clean 参数测试 - 删除空子树', () => {
    const tree: TestNode[] = [
      {
        id: 1,
        name: 'Node 1',
        children: [],
      },
    ];

    const result = mapTreeList({
      treeList: tree,
      clean: true,
    });

    expect(result[0]).not.toHaveProperty('children');
  });

  test('clean 参数测试 - 保留有效子树', () => {
    const tree: TestNode[] = [
      {
        id: 1,
        name: 'Node 1',
        children: [
          {
            id: 11,
            name: 'Node 1-1',
            children: [],
          },
        ],
      },
    ];

    const result = mapTreeList({
      treeList: tree,
      clean: true,
    });

    // 父节点有有效子节点，应该保留 children
    expect(result[0]).toHaveProperty('children');
    expect(result[0].children).toHaveLength(1);
    // 子节点的空 children 应该被删除
    expect(result[0].children![0]).not.toHaveProperty('children');
  });

  test('onNode 回调测试', () => {
    const tree: TestNode[] = [
      {
        id: 1,
        name: 'Node 1',
      },
    ];

    const result = mapTreeList({
      treeList: tree,
      onNode: ({ depth }) => ({ level: depth }),
    });

    expect((result[0] as TestNode & { level: number }).level).toBe(0);
  });

  test('onNode 回调返回undefined', () => {
    const tree: TestNode[] = [
      {
        id: 1,
        name: 'Node 1',
      },
    ];

    const result = mapTreeList({
      treeList: tree,
      onNode: () => undefined,
    });

    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Node 1');
  });

  test('onNode 回调返回非对象', () => {
    const tree: TestNode[] = [
      {
        id: 1,
        name: 'Node 1',
      },
    ];

    const result = mapTreeList({
      treeList: tree,
      onNode: () => null as unknown as Record<string, unknown>,
    });

    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Node 1');
  });

  test('childrenKey 参数测试', () => {
    const tree: TestNodeWithItems[] = [
      {
        id: 1,
        name: 'Node 1',
        items: [
          {
            id: 11,
            name: 'Node 1-1',
          },
        ],
      },
    ];

    const result = mapTreeList({
      treeList: tree,
      childrenKey: 'items',
    });

    expect(result[0].items).toHaveLength(1);
    expect(result[0].items![0].id).toBe(11);
  });

  test('空数组测试', () => {
    const result = mapTreeList({
      treeList: [],
    });

    expect(result).toEqual([]);
  });

  test('深层嵌套测试', () => {
    const tree: TestNodeDeep[] = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 3,
              },
            ],
          },
        ],
      },
    ];

    const result = mapTreeList({
      treeList: tree,
      onNode: ({ depth }) => ({ level: depth }),
    });

    type NodeWithLevel = TestNodeDeep & { level: number }
    expect((result[0] as NodeWithLevel).level).toBe(0);
    expect((result[0].children![0] as NodeWithLevel).level).toBe(1);
    expect((result[0].children![0].children![0] as NodeWithLevel).level).toBe(2);
  });

  test('非数组 children 处理', () => {
    const tree: TestNodeInvalid[] = [
      {
        id: 1,
        children: 'invalid',
      },
    ];

    const result = mapTreeList({
      treeList: tree,
    });

    expect(result[0].children).toBe('invalid');
  });

  test('组合测试 - clean + onNode + 复杂结构', () => {
    const tree: TestNode[] = [
      {
        id: 1,
        name: 'Root',
        children: [
          {
            id: 2,
            name: 'Branch',
            children: [
              {
                id: 3,
                name: 'Leaf',
                children: [],
              },
            ],
          },
          {
            id: 4,
            name: 'Empty Branch',
            children: [],
          },
        ],
      },
    ];

    const result = mapTreeList({
      treeList: tree,
      clean: true,
      onNode: ({ depth, parent }) => ({
        level: depth,
        parentName: parent?.name || 'Root',
        isProcessed: true,
      }),
    });

    type ProcessedNode = TestNode & {
      level: number
      parentName: string
      isProcessed: boolean
    }

    const rootNode = result[0] as ProcessedNode;
    expect(rootNode.level).toBe(0);
    expect(rootNode.parentName).toBe('Root');
    expect(rootNode.isProcessed).toBe(true);
    expect(rootNode.children).toHaveLength(2); // 两个分支都被保留

    // 第一个分支：有子节点的分支
    const branchNode = rootNode.children![0] as ProcessedNode;
    expect(branchNode.level).toBe(1);
    expect(branchNode.parentName).toBe('Root');
    expect(branchNode.children).toHaveLength(1);

    const leafNode = branchNode.children![0] as ProcessedNode;
    expect(leafNode.level).toBe(2);
    expect(leafNode.parentName).toBe('Branch');
    expect(leafNode).not.toHaveProperty('children'); // 空数组被清理

    // 第二个分支：空分支，children 被清理
    const emptyBranchNode = rootNode.children![1] as ProcessedNode;
    expect(emptyBranchNode.level).toBe(1);
    expect(emptyBranchNode.parentName).toBe('Root');
    expect(emptyBranchNode).not.toHaveProperty('children'); // 空数组被清理
  });
});
