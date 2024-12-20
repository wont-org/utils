import { curry } from './curry';

describe('curry 方法测试', () => {
  const fn = (a: number, b: number, c: number): number[] => [a, b, c];
  const curried = curry(fn);
  const expected = [1, 2, 3];
  test('curried(1, 2, 3)', () => {
    expect(curried(1, 2, 3)).toEqual(expected);
  });
  test('curried(1, 2)(3)', () => {
    expect(curried(1, 2)(3)).toEqual(expected);
  });
  test('curried(1)(2)(3)', () => {
    expect(curried(1)(2)(3)).toEqual(expected);
  });
  test('curried(1)(2, 3)', () => {
    expect(curried(1)(2, 3)).toEqual(expected);
  });
  const sum = (a: number, b: number, c: number) => a + b + c;
  const curriedSum = curry(sum);
  test('curriedSum(1, 2, 3)', () => {
    expect(curriedSum(1, 2, 3)).toEqual(6);
  });
  test('curriedSum(1, 2)(3)', () => {
    expect(curriedSum(1, 2)(3)).toEqual(6);
  });
  test('curriedSum(1)(2)(3)', () => {
    expect(curriedSum(1)(2)(3)).toEqual(6);
  });
  test('curriedSum(1)(2, 3)', () => {
    expect(curriedSum(1)(2, 3)).toEqual(6);
  });
  const sumNoArgs = () => 1;
  test('curriedNoArgs()', () => {
    const curriedNoArgs = curry(sumNoArgs);
    expect(curriedNoArgs()).toEqual(1);
  });
});
