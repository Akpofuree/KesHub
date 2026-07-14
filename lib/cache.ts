import { DEFAULT_CACHE_TTL, redis } from "@/lib/redis";

const CACHE_KEYS = {
  availableProducts: "products:available",
  featuredProducts: "products:featured",
  categories: "categories:all",
  homepage: "homepage:data",
};

export const cacheKeys = CACHE_KEYS;

function toCacheValue(value) {
  return JSON.stringify(value);
}

function fromCacheValue(value) {
  if (value == null) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

export async function getCachedValue(key) {
  if (!redis) return null;
  const value = await redis.get(key);
  return fromCacheValue(value);
}

export async function setCachedValue(key, value, ttl = DEFAULT_CACHE_TTL) {
  if (!redis) return;
  await redis.set(key, toCacheValue(value), { ex: ttl });
}

export async function deleteCachedKeys(keys) {
  if (!redis || !keys.length) return;
  await redis.del(...keys);
}

export async function cacheAside(key, fetcher, ttl = DEFAULT_CACHE_TTL) {
  const cached = await getCachedValue(key);
  if (cached !== null) return cached;

  const value = await fetcher();
  await setCachedValue(key, value, ttl);
  return value;
}

export function productCategoryCacheKey(category) {
  return `products:category:${category}`;
}

export async function invalidateProductListings(category?: string) {
  await deleteCachedKeys([
    CACHE_KEYS.availableProducts,
    CACHE_KEYS.featuredProducts,
  ]);
  if (category) await invalidateProductCategory(category);
}

export async function invalidateProductCategory(category) {
  if (!category) return;
  await deleteCachedKeys([productCategoryCacheKey(category)]);
}

export async function invalidateCategoryListings() {
  await deleteCachedKeys([CACHE_KEYS.categories]);
}

export async function invalidateHomepageData() {
  await deleteCachedKeys([CACHE_KEYS.homepage]);
}
