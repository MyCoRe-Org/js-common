import { Cache, CacheItem } from './types';

/**
 * In-memory cache implementation using a Map.
 * Implements the `Cache` interface for caching items with optional expiration times.
 * @param T - The type of value stored in the cache.
 */
export class MemoryCache<T> implements Cache<T> {
  private map: Map<string, CacheItem<T>>;

  /**
   * Creates an instance of `MemoryCache`.
   */
  constructor() {
    this.map = new Map<string, CacheItem<T>>();
  }

  public setItem(key: string, value: T, ttl = 0): void {
    const expiresAt = ttl === 0 ? null : Date.now() + ttl * 1000;
    this.map.set(key, { value, expiresAt });
  }

  public getItem(key: string): T | null {
    const cachedItem = this.map.get(key);
    if (!cachedItem) {
      return null;
    }
    if (cachedItem.expiresAt !== null && cachedItem.expiresAt < Date.now()) {
      this.map.delete(key);
      return null;
    }
    return cachedItem.value;
  }

  getAllItems(): Record<string, T> {
    const result: Record<string, T> = {};
    this.map.forEach((item, key) => {
      if (item.expiresAt !== null && item.expiresAt < Date.now()) {
        result[key] = item.value;
      }
    });
    return result;
  }

  hasItem(key: string): boolean {
    return this.getItem(key) !== null;
  }

  deleteItem(key: string): void {
    this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  size(): number {
    return this.map.size;
  }
}
