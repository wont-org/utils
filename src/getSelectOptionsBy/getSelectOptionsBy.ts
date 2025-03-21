/**
 * @description 将数据转换为带分组的选择器选项
 * @function getSelectOptionsBy
 * @param {Array<T>} data - 要转换的数据数组
 * @param {Object} [fieldNames] - 自定义字段名称配置
 * @param {string|Function} [fieldNames.groupNameField='groupName'] - 分组名称字段或获取函数
 * @param {string|Function} [fieldNames.groupIdField='groupId'] - 分组ID字段或获取函数
 * @param {string|Function} [fieldNames.labelField='label'] - 标签字段或获取函数
 * @param {string|Function} [fieldNames.valueField='value'] - 值字段或获取函数
 * @param {string} [fieldNames.childrenField='options'] - 子选项字段名称
 * @returns {Array<Object>} 分组后的选择器选项，每个项包含label和一个子选项数组(默认名为options)
 * @author liukun <919590347@qq.com>
 * @example
 * import { getSelectOptionsBy } from '@wont/utils'
 *
 * const data = [
 *   { groupId: '1', groupName: '分组1', id: 'a', name: '选项A' },
 *   { groupId: '1', groupName: '分组1', id: 'b', name: '选项B' },
 *   { groupId: '2', groupName: '分组2', id: 'c', name: '选项C' }
 * ];
 *
 * getSelectOptionsBy(data, {
 *   labelField: 'name',
 *   valueField: 'id'
 * });
 * // 返回:
 * // [
 * //   { label: '分组1', options: [{ label: '选项A', value: 'a', ... }, { label: '选项B', value: 'b', ... }] },
 * //   { label: '分组2', options: [{ label: '选项C', value: 'c', ... }] }
 * // ]
 */

interface FieldNames<T extends Record<string, any>> {
  groupNameField?: keyof T | ((val: T) => string)
  groupIdField?: keyof T | ((val: T) => string)
  labelField?: keyof T | ((val: T) => string)
  valueField?: keyof T | ((val: T) => string | number)
  childrenField?: string
}

/**
 * 选项项类型，包含原数据加上label和value字段
 */
type ItemWithLabelValue<T> = T & {
  label: string
  value: string | number
}

/**
 * 获取字段名配置中的childrenField值的类型，如果没有则默认为'options'
 */
type GetChildrenField<F> = F extends { childrenField: infer C }
  ? C extends string
    ? C
    : 'options'
  : 'options'

/**
 * 生成带有特定childrenField的返回类型
 */
type SelectOptionsWithField<T, C extends string> = Array<
  {
    label: string
  } & {
    [K in C]: Array<ItemWithLabelValue<T>>
  }
>

/**
 * 根据fieldNames推断返回类型
 */
type InferSelectOptions<T, F> = SelectOptionsWithField<T, GetChildrenField<F>>

/**
 * 分组数据存储类型
 */
interface GroupedData {
  [groupId: string]: {
    label: string
    [key: string]: any
  }
}

export const getSelectOptionsBy = <
  T extends Record<string, any>,
  F extends FieldNames<T> = FieldNames<T>
>(
    data: T[],
    fieldNames: F = {} as F,
  ): InferSelectOptions<T, F> => {
  const {
    groupNameField = 'groupName', // 分组名称字段
    groupIdField = 'groupId', // 分组ID字段
    labelField = 'label', // 标签字段
    valueField = 'value', // 值字段
    childrenField = 'options',
  } = fieldNames;

  // 用于存储分组后的结果
  const groupedData: GroupedData = {};

  // 遍历数据，按分组名称和分组ID进行分组
  data.forEach((item) => {
    // 获取分组名称和分组ID
    const groupName = typeof groupNameField === 'function' ? groupNameField(item) : item[groupNameField as keyof T];

    // 如果没有提供groupIdField或者数据中不存在，则使用groupName作为分组依据
    let groupId;
    if (groupIdField === 'groupId' && !('groupId' in item) && groupNameField !== 'groupName') {
      // 当使用默认的groupIdField，但数据中不存在此字段，且指定了非默认的groupNameField时
      // 使用groupName作为groupId
      groupId = groupName;
    } else {
      groupId = typeof groupIdField === 'function' ? groupIdField(item) : item[groupIdField as keyof T];
    }

    // 确保groupId存在，如果不存在则使用groupName
    if (groupId === undefined || groupId === null) {
      groupId = groupName;
    }

    // 如果分组不存在，则初始化分组
    if (!groupedData[groupId]) {
      groupedData[groupId] = {
        label: groupName,
        [childrenField]: [],
      };
    }

    // 获取标签和名称
    const label = typeof labelField === 'function' ? labelField(item) : item[labelField as keyof T];
    const value = typeof valueField === 'function' ? valueField(item) : item[valueField as keyof T];

    // 添加选项到对应的分组
    groupedData[groupId][childrenField].push({
      ...item,
      label,
      value,
    });
  });

  // 将分组数据转换为数组格式
  return Object.values(groupedData) as InferSelectOptions<T, F>;
};
