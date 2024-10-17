import { LRUCache } from './LRUCache'

describe('LRUCache', () => {
  test('should create an LRUCache instance with default length 0 (no limit)', () => {
    const cache = new LRUCache()
    expect(cache).toBeInstanceOf(LRUCache)
    expect(cache.get()).toEqual(new Map())
  })

  test('should create an LRUCache instance with specified length', () => {
    const cache = new LRUCache(2)
    expect(cache).toBeInstanceOf(LRUCache)
  })

  test('should set and get a value', () => {
    const cache = new LRUCache()
    cache.set(1, 'one')
    expect(cache.get(1)).toBe('one')
  })

  test('should return null for a non-existing key', () => {
    const cache = new LRUCache()
    expect(cache.get(1)).toBeNull()
  })

  test('should update an existing key and move it to the most recently used position', () => {
    const cache = new LRUCache(3)
    cache.set(1, 'one')
    cache.set(2, 'two')
    cache.set(3, 'three')
    cache.set(2, 'two updated')

    const map = cache.get() as Map<unknown, unknown>
    expect([...map.entries()]).toEqual([
      [1, 'one'],
      [3, 'three'],
      [2, 'two updated'],
    ])
  })

  test('should remove the least recently used item when the limit is reached', () => {
    const cache = new LRUCache(3)
    cache.set(1, 'one')
    cache.set(2, 'two')
    cache.set(3, 'three')
    cache.set(4, 'four')

    const map = cache.get() as Map<unknown, unknown>
    expect([...map.entries()]).toEqual([
      [2, 'two'],
      [3, 'three'],
      [4, 'four'],
    ])
  })

  test('should check if a key exists', () => {
    const cache = new LRUCache()
    cache.set(1, 'one')
    expect(cache.has(1)).toBe(true)
    expect(cache.has(2)).toBe(false)
  })

  test('should return the entire map when no key is provided to get()', () => {
    const cache = new LRUCache()
    cache.set(1, 'one')
    cache.set(2, 'two')
    expect(cache.get()).toEqual(
      new Map([
        [1, 'one'],
        [2, 'two'],
      ]),
    )
  })

  test('should handle edge case of setting undefined or null values', () => {
    const cache = new LRUCache()
    cache.set('key1', undefined)
    cache.set('key2', null)
    expect(cache.get('key1')).toBeUndefined()
    expect(cache.get('key2')).toBeNull()
  })
})
