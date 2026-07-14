import { prisma } from "@/lib/prisma";
import { cacheAside, cacheKeys } from "@/lib/cache";

export async function getFeaturedProducts(ttl = 300) {
  return cacheAside(
    cacheKeys.featuredProducts,
    async () =>
      prisma.product.findMany({
        where: { isFeatured: true, isActive: true },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      }),
    ttl,
  );
}

export async function getAvailableProducts(ttl = 300) {
  return cacheAside(
    cacheKeys.availableProducts,
    async () =>
      prisma.product.findMany({
        where: { isActive: true },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      }),
    ttl,
  );
}

export async function getProductsByCategory(category, ttl = 300) {
  return cacheAside(
    `products:category:${category}`,
    async () =>
      prisma.product.findMany({
        where: {
          isActive: true,
          category,
        },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      }),
    ttl,
  );
}

export async function getCategories(ttl = 300) {
  return cacheAside(
    cacheKeys.categories,
    async () => {
      const categories = await prisma.product.groupBy({
        by: ["category"],
        where: { isActive: true },
        _count: { category: true },
      });

      return categories
        .map((item) => ({ name: item.category, count: item._count.category }))
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    ttl,
  );
}

export async function getHomepageData(ttl = 300) {
  return cacheAside(
    cacheKeys.homepage,
    async () => {
      const [featuredProducts, latestProducts, categories] = await Promise.all([
        getFeaturedProducts(ttl),
        prisma.product.findMany({
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          take: 12,
        }),
        getCategories(ttl),
      ]);

      return {
        featuredProducts,
        latestProducts,
        categories,
      };
    },
    ttl,
  );
}
