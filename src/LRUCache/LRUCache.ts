/**
 * @description lru缓存算法。指定缓存空间长度，当缓存超出时，清除最不活跃的缓存。
 * @author liukun <919590347@qq.com>
 * @example
 * import { LRUCache } from '@wont/utils'
 *
 * const lru = new LRUCache(3);
 * lru.set(1, 1);
 * lru.set(2, 2);
 * lru.set(3, 3);
 * lru.set(4, 4);
 * lru.set(4, 5);
 * console.info(lru.get());  // return Map(3) { 2 => 2, 3 => 3, 4 => 5 }
 */

export class LRUCache {
  #map: Map<unknown, unknown>

  #length: number

  /**
   * 创建LRUCache实例
   * @param {number} [len=0] - lru缓存上限，默认为0，无上限。
   */
  constructor(len = 0) {
    this.#map = new Map();
    this.#length = len;
  }

  /**
   * 检测是否有缓存
   * @param {unknown} key - The key to check.
   * @returns {boolean} 是否存在缓存
   */
  has(key: unknown): boolean {
    return this.#map.has(key);
  }

  /**
   * 通过key获取缓存。如果存在缓存，则更新为最近使用。
   * @param {unknown} key - The key to retrieve the value for.
   * @returns {unknown | null | Map<unknown, unknown>} 不存在返回null。key不传返回全部缓存map
   */
  get(key?: unknown): unknown | null | Map<unknown, unknown> {
    if (!key) {
      return this.#map;
    }
    if (!this.has(key)) {
      return null;
    }
    const val = this.#map.get(key);
    this.#map.delete(key);
    this.#map.set(key, val);
    return this.#map.get(key);
  }

  /**
   * 设置新增或修改缓存。并且将设置的缓存设置为最近使用
   * @param {unknown} key - The key to set.
   * @param {unknown} val - The value to set.
   * @returns {undefined}
   */
  set(key: unknown, val: unknown): void {
    if (this.has(key)) {
      this.#map.delete(key);
    }
    this.#map.set(key, val);
    if (this.#length > 0 && this.#map.size > this.#length) {
      const firstEle = this.#map.keys().next().value;
      this.#map.delete(firstEle);
    }
  }
}
