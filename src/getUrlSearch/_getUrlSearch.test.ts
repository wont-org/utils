import { getUrlSearch } from './getUrlSearch';

describe('getUrlSearch 方法测试', () => {
  test('execute', () => {
    expect(getUrlSearch({ a: '1', b: '2' })).toBe('a=1&b=2');
  });
});
