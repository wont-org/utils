import { get } from '../get/get';

/**
 * @description 查找列表中指定键值重复的项
 * @function findListDuplicatesByKeyList
 * @param {Array<T>} data - 数据列表
 * @param {Array<string>} keyList - 用于比较的键列表，支持路径写法 ['a.b.c', 'd']
 * @returns {Array<T>} 返回重复项
 * @template T
 * @author liukun <919590347@qq.com>
 * @example
 * import { findListDuplicatesByKeyList } from '@wont/utils'
 * const data = [
 *   { id: 1, name: 'Alice', age: 25 },
 *   { id: 3, name: 'Alice', age: 25 },
 *   { id: 4, name: 'Charlie', age: 35 },
 *   { id: 5, name: 'Alice', age: 25 },
 * ];
 * findListDuplicatesByKeyList(data, ['name', 'age'])  // returns [{ id: 1, name: 'Alice', age: 25 }, { id: 3, name: 'Alice', age: 25 }, { id: 5, name: 'Alice', age: 25 }]
 *
 * const data = [
 *     { id: 1, name: 'Alice', details: { age: 25, city: 'New York' } },
 *     { id: 2, name: 'Bob', details: { age: 30, city: 'Chicago' } },
 *     { id: 3, name: 'Alice', details: { age: 25, city: 'New York' } },
 *     { id: 4, name: 'Charlie', details: { age: 35, city: 'San Francisco' } },
 *   ];
 *   findListDuplicatesByKeyList(data, ['name', 'details.age']); // returns [{ id: 1, name: 'Alice', details:{ age: 25, city: 'New York' } },{ id: 3, name: 'Alice', details: { age: 25, city: 'New York' } }]
 */

export const findListDuplicatesByKeyList = <T extends Record<string, unknown>>(
  data: T[],
  keyList: (keyof T | string)[],
): T[] => {
  const seen = new Map<string, T>();
  const duplicates: T[] = [];

  data.forEach((item) => {
    const key = keyList.map((k) => get(item, k as string)).join('_');
    const existing = seen.get(key);

    if (existing) {
      duplicates.push(item);
      duplicates.push(existing);
    } else {
      seen.set(key, item);
    }
  });

  return Array.from(new Set(duplicates));
};
