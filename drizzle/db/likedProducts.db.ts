import { unstable_cacheTag as cacheTag } from 'next/cache';
import { db } from '@/drizzle';
import { eq, and } from 'drizzle-orm';
import { ProductTable, UserToProductTable } from '../schema';
import { getProductById } from './products.db';
import { ProductWithImages } from '@/types';

export const insertLikedProduct = async (data: typeof UserToProductTable.$inferInsert) => {
  const [likedProduct] = await db.insert(UserToProductTable).values(data).returning();
  return likedProduct;
};

export const deleteLikedProduct = async (data: typeof UserToProductTable.$inferInsert) => {
  const [likedProduct] = await db
    .delete(UserToProductTable)
    .where(and(eq(UserToProductTable.productId, data.productId), eq(UserToProductTable.userId, data.userId)))
    .returning();

  return likedProduct;
};

export const getLikedProducts = async (userId: string) => {
  'use cache';
  cacheTag('likes');

  let likedProducts: ProductWithImages[] = [];

  const getProductsId = await db.query.UserToProductTable.findMany({ where: eq(UserToProductTable.userId, userId) });

  for (const { productId } of getProductsId) {
    const [products] = await db.query.ProductTable.findMany({where:eq(ProductTable.id,productId),with:{images:true}});
    if (products) {
      likedProducts.push(products);
    }
  }

  return likedProducts;
};

export const getLikedProductsCount = async (userId: string) => {
  'use cache';
  cacheTag('likes');
  try {
    const count = await db.$count(UserToProductTable, eq(UserToProductTable.userId, userId));
    return count;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error');
  }
};

export const clearLikedProducts = async (userId: string) => {
  try {
    await db.delete(UserToProductTable).where(eq(UserToProductTable.userId, userId)).returning();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error');
  }
};

export const getLikedProductsByUser = async (userId: string) => {
  'use cache';
  cacheTag('likes');

  try {
    const likes = await db.query.UserToProductTable.findMany({ where: eq(UserToProductTable.userId, userId) });
    return likes;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error');
  }
};
