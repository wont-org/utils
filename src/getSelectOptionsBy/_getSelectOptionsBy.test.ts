import { getSelectOptionsBy } from './getSelectOptionsBy';

describe('getSelectOptionsBy', () => {
  // 基本的测试数据
  const testData = [
    { id: 1, groupId: '1', groupName: '分组1', name: '选项A' },
    { id: 2, groupId: '1', groupName: '分组1', name: '选项B' },
    { id: 3, groupId: '2', groupName: '分组2', name: '选项C' },
  ];

  test('使用默认字段名称分组数据', () => {
    // 准备测试数据
    const data = testData.map((item) => ({
      ...item,
      label: item.name, // 添加默认的 label 字段
      value: item.id, // 添加默认的 value 字段
    }));

    // 执行函数
    const result = getSelectOptionsBy(data);

    // 验证结果
    expect(result).toHaveLength(2);

    // 验证第一个分组
    expect(result[0].label).toBe('分组1');
    expect(result[0].options).toHaveLength(2);
    expect(result[0].options[0].label).toBe('选项A');
    expect(result[0].options[0].value).toBe(1);
    expect(result[0].options[1].label).toBe('选项B');
    expect(result[0].options[1].value).toBe(2);

    // 验证第二个分组
    expect(result[1].label).toBe('分组2');
    expect(result[1].options).toHaveLength(1);
    expect(result[1].options[0].label).toBe('选项C');
    expect(result[1].options[0].value).toBe(3);
  });

  test('使用自定义字段名称分组数据', () => {
    // 执行函数，使用自定义字段名配置
    const result = getSelectOptionsBy(testData, {
      labelField: 'name',
      valueField: 'id',
    });

    // 验证结果类型与结构
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);

    // 验证第一个分组
    expect(result[0].label).toBe('分组1');
    expect(result[0].options).toHaveLength(2);
    expect(result[0].options[0].label).toBe('选项A');
    expect(result[0].options[0].value).toBe(1);

    // 验证第二个分组
    expect(result[1].label).toBe('分组2');
    expect(result[1].options).toHaveLength(1);
    expect(result[1].options[0].label).toBe('选项C');
    expect(result[1].options[0].value).toBe(3);
  });

  test('使用自定义子节点字段名', () => {
    // 执行函数，使用自定义子节点字段名
    const result = getSelectOptionsBy(testData, {
      labelField: 'name',
      valueField: 'id',
      childrenField: 'children',
    });

    // 验证结果
    expect(result).toHaveLength(2);

    // 类型检查：TS应该能够正确识别children字段的类型，不需要类型断言
    expect(result[0].children).toBeDefined();
    expect('options' in result[0]).toBe(false); // 使用 in 操作符检查属性不存在
    expect(result[0].children).toHaveLength(2);

    // 直接访问属性，不需要类型断言
    expect(result[0].children[0].label).toBe('选项A');
    expect(result[0].children[0].value).toBe(1);
    expect(result[0].children[1].label).toBe('选项B');
    expect(result[0].children[1].value).toBe(2);
  });

  test('使用函数获取字段值', () => {
    // 使用函数获取字段值
    const result = getSelectOptionsBy(testData, {
      groupNameField: (item) => `Group: ${item.groupName}`,
      groupIdField: (item) => item.groupId,
      labelField: (item) => `${item.name} (${item.id})`,
      valueField: (item) => item.id,
    });

    // 验证结果
    expect(result).toHaveLength(2);
    expect(result[0].label).toBe('Group: 分组1');
    expect(result[0].options[0].label).toBe('选项A (1)');
    expect(result[0].options[0].value).toBe(1);
  });

  test('处理空数组', () => {
    const result = getSelectOptionsBy([]);
    expect(result).toEqual([]);
  });

  test('所有项都在同一分组', () => {
    const singleGroupData = [
      { groupId: '1', groupName: '分组1', id: 'a', name: '选项A' },
      { groupId: '1', groupName: '分组1', id: 'b', name: '选项B' },
      { groupId: '1', groupName: '分组1', id: 'c', name: '选项C' },
    ];

    const result = getSelectOptionsBy(singleGroupData, {
      labelField: 'name',
      valueField: 'id',
    });

    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('分组1');
    expect(result[0].options).toHaveLength(3);
  });

  test('处理数值类型的值', () => {
    // 测试数值类型
    interface NumericItem {
      groupId: number
      groupName: string
      id: number
      name: string
    }

    const numericData: NumericItem[] = [
      { groupId: 1, groupName: '分组1', id: 100, name: '选项A' },
      { groupId: 1, groupName: '分组1', id: 200, name: '选项B' },
    ];

    const result = getSelectOptionsBy(numericData, {
      labelField: 'name',
      valueField: 'id',
    });

    expect(result).toHaveLength(1);
    expect(result[0].options[0].value).toBe(100);
    expect(result[0].options[1].value).toBe(200);

    // 验证类型
    expect(typeof result[0].options[0].value).toBe('number');
  });

  test('使用多种自定义子节点字段名', () => {
    // 测试不同的子节点字段名
    getSelectOptionsBy(testData, {
      labelField: 'name',
      valueField: 'id',
    });

    const withItems = getSelectOptionsBy(testData, {
      labelField: 'name',
      valueField: 'id',
      childrenField: 'items',
    });

    expect(withItems[0].items).toBeDefined();
    expect(withItems[0].items[0].label).toBe('选项A');

    const withList = getSelectOptionsBy(testData, {
      labelField: 'name',
      valueField: 'id',
      childrenField: 'list',
    });

    expect(withList[0].list).toBeDefined();
    expect(withList[0].list[0].label).toBe('选项A');
  });

  // 新增测试：没有groupId字段但指定了groupNameField时的处理
  test('当数据中不存在groupId字段但指定了groupNameField时，使用groupName作为分组依据', () => {
    const dataWithoutGroupId = [
      { id: 1, eventGroupName: '分组1', name: '选项A' },
      { id: 2, eventGroupName: '分组1', name: '选项B' },
      { id: 3, eventGroupName: '分组2', name: '选项C' },
      { id: 4, eventGroupName: '分组3', name: '选项D' },
    ];

    const result = getSelectOptionsBy(dataWithoutGroupId, {
      groupNameField: 'eventGroupName',
      labelField: 'name',
      valueField: 'id',
    });

    // 应该基于eventGroupName分组，得到3个分组
    expect(result).toHaveLength(3);

    // 验证分组正确
    expect(result[0].label).toBe('分组1');
    expect(result[0].options).toHaveLength(2);
    expect(result[0].options[0].label).toBe('选项A');
    expect(result[0].options[1].label).toBe('选项B');

    expect(result[1].label).toBe('分组2');
    expect(result[1].options).toHaveLength(1);
    expect(result[1].options[0].label).toBe('选项C');

    expect(result[2].label).toBe('分组3');
    expect(result[2].options).toHaveLength(1);
    expect(result[2].options[0].label).toBe('选项D');
  });

  // 新增测试：groupId为null或undefined时的处理
  test('当groupId为null或undefined时，使用groupName作为分组依据', () => {
    const dataWithNullGroupId = [
      { id: 1, groupId: null, groupName: '分组1', name: '选项A' },
      { id: 2, groupId: null, groupName: '分组1', name: '选项B' },
      { id: 3, groupId: undefined, groupName: '分组2', name: '选项C' },
    ];

    const result = getSelectOptionsBy(dataWithNullGroupId, {
      labelField: 'name',
      valueField: 'id',
    });

    // 应该基于groupName分组，得到2个分组
    expect(result).toHaveLength(2);

    // 验证分组正确
    expect(result[0].label).toBe('分组1');
    expect(result[0].options).toHaveLength(2);
    expect(result[0].options[0].label).toBe('选项A');
    expect(result[0].options[1].label).toBe('选项B');

    expect(result[1].label).toBe('分组2');
    expect(result[1].options).toHaveLength(1);
    expect(result[1].options[0].label).toBe('选项C');
  });

  // 测试混合场景：一些项有groupId，一些没有
  test('混合场景：部分数据有groupId，部分数据没有groupId', () => {
    const mixedData = [
      { id: 1, groupId: '1', groupName: '分组1', name: '选项A' },
      { id: 2, eventGroupName: '分组2', name: '选项B' }, // 没有groupId
      { id: 3, groupId: null, groupName: '分组3', name: '选项C' }, // groupId为null
    ];

    const result = getSelectOptionsBy(mixedData, {
      groupNameField: (item) => (item.eventGroupName || item.groupName)!,
      labelField: 'name',
      valueField: 'id',
    });

    // 应该有3个分组
    expect(result).toHaveLength(3);

    // 验证各分组
    expect(result[0].label).toBe('分组1');
    expect(result[0].options[0].label).toBe('选项A');

    expect(result[1].label).toBe('分组2');
    expect(result[1].options[0].label).toBe('选项B');

    expect(result[2].label).toBe('分组3');
    expect(result[2].options[0].label).toBe('选项C');
  });
});
