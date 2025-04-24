import { Cache, CacheItem } from './types';

/**
 * Abstract class representing a cache storage using the browser's Storage API.
 * Implements the `Cache` interface for caching items with optional expiration times.
 * @param T - The type of value stored in the cache.
 */
export abstract class StorageCache<T> implements Cache<T> {
  private storage: Storage;

  /**
   * Creates an instance of `StorageCache`.
   * @param storage - The Storage instance (`localStorage` or `sessionStorage`) to use for caching.
   */
  constructor(storage: Storage) {
    this.storage = storage;
  }

  public setItem(key: string, value: T, ttl = 0): void {
    const expiresAt = ttl === 0 ? null : Date.now() + ttl * 1000;
    this.storage.setItem(key, JSON.stringify({ value, expiresAt }));
  }

  public getItem(key: string): T | null {
    const rawCachedItem = this.storage.getItem(key);
    if (!rawCachedItem) {
      return null;
    }
    const cachedItem = JSON.parse(rawCachedItem) as CacheItem<T>;
    if (cachedItem.expiresAt !== null && cachedItem.expiresAt < Date.now()) {
      this.storage.removeItem(key);
      return null;
    }
    return cachedItem.value;
  }

  getAllItems(): Record<string, T> {
    const result: Record<string, T> = {};
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key) {
        const rawCachedItem = this.storage.getItem(key);
        if (!rawCachedItem) continue;
        const cachedItem = JSON.parse(rawCachedItem) as CacheItem<T>;
        if (
          cachedItem.expiresAt !== null &&
          cachedItem.expiresAt < Date.now()
        ) {
          localStorage.removeItem(key);
        } else {
          result[key] = cachedItem.value;
        }
      }
    }
    return result;
  }

  hasItem(key: string): boolean {
    return this.getItem(key) !== null;
  }

  deleteItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  size(): number {
    return this.storage.length;
  }
}
