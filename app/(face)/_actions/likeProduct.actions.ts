'use server';

import { revalidateTag } from 'next/cache';
import { clearLikedProducts, deleteLikedProduct, getLikedProductsCount, insertLikedProduct } from '@/drizzle/db/likedProducts.db';
import { getProductById } from '@/drizzle/db/products.db';
import { ProductWithImages } from '@/types';


export const setLikeProductAction = async (userId: string, productId: string): Promise<{ action: boolean; message?: string }> => {
  const limit = 10;
  try {
    const count = await getLikedProductsCount(userId);
    if (count >= limit)
      return {
        message: `Лимит избранного ${limit} продуктов!`,
        action: false,
      };

    await insertLikedProduct({ userId, productId });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Liked Product Error');
  }
  revalidateTag('likes');
  revalidateTag('product-' + productId);
  return { action: true };
};

export const removeLikeProductAction = async (userId: string, productId: string): Promise<{ action: boolean; message?: string }> => {
  try {
    await deleteLikedProduct({ userId, productId });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Liked Product Error');
  }
  revalidateTag('likes');
  revalidateTag('product-' + productId);
  return { action: false };
};

export const clearLikeProductsListAction = async (userId: string) => {
  try {
    await clearLikedProducts(userId);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Liked Product Error');
  }
  revalidateTag('likes');
  revalidateTag('products');
};

export const getLikedProductsAction = async (likedProductsId: string[]) => {
  const products: ProductWithImages[] = [];
  try {
    for (const id of likedProductsId) {
      const product = await getProductById(id, { images: true });
      if (product) {
        products.push(product);
      }
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Liked Product Error');
  }

  return products;
};
