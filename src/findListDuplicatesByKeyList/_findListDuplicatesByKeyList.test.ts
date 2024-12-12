import { findListDuplicatesByKeyList } from './findListDuplicatesByKeyList';

describe('findListDuplicatesByKeyList', () => {
  it('should return duplicates based on given keys', () => {
    const data = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Alice', age: 25 },
      { id: 4, name: 'Charlie', age: 35 },
      { id: 5, name: 'Alice', age: 25 },
    ];

    const result = findListDuplicatesByKeyList(data, ['name', 'age']);
    expect(result).toEqual(
      expect.arrayContaining([
        { id: 1, name: 'Alice', age: 25 },
        { id: 3, name: 'Alice', age: 25 },
        { id: 5, name: 'Alice', age: 25 },
      ]),
    );
  });

  it('should return an empty array when no duplicates are found', () => {
    const data = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ];

    const result = findListDuplicatesByKeyList(data, ['name', 'age']);
    expect(result).toEqual([]);
  });

  it('should return all items when all items are duplicates', () => {
    const data = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 1, name: 'Alice', age: 25 },
      { id: 1, name: 'Alice', age: 25 },
    ];

    const result = findListDuplicatesByKeyList(data, ['name', 'age']);
    expect(result).toEqual([
      { id: 1, name: 'Alice', age: 25 },
      { id: 1, name: 'Alice', age: 25 },
      { id: 1, name: 'Alice', age: 25 },
    ]);
  });

  it('should handle nested object keys correctly', () => {
    const data = [
      { id: 1, name: 'Alice', details: { age: 25, city: 'New York' } },
      { id: 2, name: 'Bob', details: { age: 30, city: 'Chicago' } },
      { id: 3, name: 'Alice', details: { age: 25, city: 'New York' } },
      { id: 4, name: 'Charlie', details: { age: 35, city: 'San Francisco' } },
    ];

    const result = findListDuplicatesByKeyList(data, ['name', 'details.age']);
    expect(result).toEqual(
      expect.arrayContaining([
        { id: 1, name: 'Alice', details: { age: 25, city: 'New York' } },
        { id: 3, name: 'Alice', details: { age: 25, city: 'New York' } },
      ]),
    );
  });

  it('should return duplicates based on deep path', () => {
    const data = [
      {
        id: 1,
        name: 'Alice',
        details: { age: 25, address: { city: 'New York' } },
      },
      {
        id: 2,
        name: 'Bob',
        details: { age: 30, address: { city: 'Chicago' } },
      },
      {
        id: 3,
        name: 'Alice',
        details: { age: 25, address: { city: 'New York' } },
      },
    ];

    const result = findListDuplicatesByKeyList(data, ['details.address.city']);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: 'Alice',
          details: { age: 25, address: { city: 'New York' } },
        },
        {
          id: 3,
          name: 'Alice',
          details: { age: 25, address: { city: 'New York' } },
        },
      ]),
    );
  });

  it('should handle missing fields with default value', () => {
    const data = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ];

    const result = findListDuplicatesByKeyList(data, ['name', 'age', 'city']);
    expect(result).toEqual([]);
  });

  it('should handle undefined path in get function', () => {
    const data = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ];

    const result = findListDuplicatesByKeyList(data, ['name', 'nonExistentKey']);
    expect(result).toEqual([]);
  });
});
