import { db } from '@/drizzle';
import { eq } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { ImagesTable } from '../schema';

export const insertImage = async (data: typeof ImagesTable.$inferInsert) => {
  const [image] = await db.insert(ImagesTable).values(data).returning();
  return image;
};

export const deleteImage = async (imageId: string) => {
  const [image] = await db.delete(ImagesTable).where(eq(ImagesTable.id, imageId)).returning();
  return image;
};

export const getProductImages = async (productId: string) => {
  'use cache';
  cacheTag('images');
  const images = await db.query.ImagesTable.findMany({ where: eq(ImagesTable.productId, productId) });

  for (const img of images) {
    cacheTag('image-' + img.id, 'images');
  }

  return images;
};
