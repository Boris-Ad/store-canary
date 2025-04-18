import { db } from '@/drizzle';
import { eq } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { CategoryTable } from '../schema';

export const insertCategory = async (data: typeof CategoryTable.$inferInsert) => {
  const [category] = await db.insert(CategoryTable).values(data).returning();
  if (category == null) throw new Error('Не удалось создать!');
  return category;
};

export const deleteCategory = async (categoryId: string) => {
  const [category] = await db.delete(CategoryTable).where(eq(CategoryTable.id, categoryId)).returning();

  return category;
};

export const getCategories = async () => {
  'use cache';
  cacheTag('categories');
  const categories = await db.query.CategoryTable.findMany();

  for (const c of categories) {
    cacheTag('category-' + c.id, 'categories');
  }

  return categories;
};

export const updateCategory = async (categoryId: string, data: Partial<typeof CategoryTable.$inferInsert>) => {
  const [category] = await db.update(CategoryTable).set(data).where(eq(CategoryTable.id, categoryId)).returning();
  return category;
};

export const getCategoryByName = async (name: string) => {
  const category = await db.query.CategoryTable.findFirst({ where: eq(CategoryTable.name, name) });
  return category;
};

export const getCategoryById = async (categoryId: string, props?: { images?: boolean; products?: boolean }) => {
  'use cache';
  cacheTag('category-' + categoryId);
  const category = await db.query.CategoryTable.findFirst({
    where: eq(CategoryTable.id, categoryId),
    with: { images: props?.images ? true : undefined, products: props?.products ? true : undefined },
  });

  return category;
};
