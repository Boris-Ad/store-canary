import { db } from '@/drizzle';
import { and, asc, desc, eq, ilike, SQL, gte, lte } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { ProductTable } from '../schema';

export const insertProduct = async (data: typeof ProductTable.$inferInsert) => {
  const [product] = await db.insert(ProductTable).values(data).returning();
  return product;
};

export const updateProduct = async (productId: string, data: Partial<typeof ProductTable.$inferInsert>) => {
  const [product] = await db.update(ProductTable).set(data).where(eq(ProductTable.id, productId)).returning();
  return product;
};

export const deleteProduct = async (productId: string) => {
  const [product] = await db.delete(ProductTable).where(eq(ProductTable.id, productId)).returning();
  return product;
};

export const getProducts = async (props?: { searchParams?: Record<string, string | undefined>; images?: boolean; categories?: boolean; limit?: number }) => {
  'use cache';
  cacheTag('products');
  const filterByOrder: SQL[] = [desc(ProductTable.createdAt)];
  const price = props?.searchParams?.price;
  const number = props?.searchParams?.number;

  const filterByWhere: SQL[] = [];
  const category = props?.searchParams?.category;
  const available = props?.searchParams?.available;
  const name = props?.searchParams?.name;
  const minPrice = props?.searchParams?.minPrice ? parseInt(props.searchParams.minPrice) || 0 : undefined;
  const maxPrice = props?.searchParams?.maxPrice ? parseInt(props.searchParams.maxPrice) || undefined : undefined;

  if (minPrice) {
    filterByWhere.push(gte(ProductTable.price, minPrice));
  }
  if (maxPrice) {
    filterByWhere.push(lte(ProductTable.price, maxPrice));
  }
  if (price) {
    filterByOrder.push(price === 'asc' ? asc(ProductTable.price) : desc(ProductTable.price));
  }
  if (number) {
    filterByOrder.push(number === 'asc' ? asc(ProductTable.number) : desc(ProductTable.number));
  }
  if (category && category !== 'all') {
    filterByWhere.push(eq(ProductTable.categoryId, category));
  }
  if (available) {
    filterByWhere.push(available === 'true' ? eq(ProductTable.available, true) : eq(ProductTable.available, false));
  }
  if (name) {
    filterByWhere.push(ilike(ProductTable.name, `%${name}%`));
  }

  const products = await db.query.ProductTable.findMany({
    with: {
      images: props?.images ? true : undefined,
      category: props?.categories ? true : undefined,
    },
    where: and(...filterByWhere),
    orderBy: filterByOrder,
    limit: props?.limit,
  });

  for (const p of products) {
    cacheTag('product-' + p.id, 'products');
  }

  return products;
};

export const getProductByName = async (name: string) => {
  const product = await db.query.ProductTable.findFirst({ where: eq(ProductTable.name, name) });
  return product;
};

export const getProductById = async (productId: string, props?: { images?: boolean; category?: boolean }) => {
  'use cache';
  const product = await db.query.ProductTable.findFirst({
    where: eq(ProductTable.id, productId),
    with: { images: props?.images ? true : undefined, category: props?.category ? true : undefined },
  });
  cacheTag('product-' + productId, 'products');
  return product;
};

export const getCountProducts = async () => {
  'use cache';
  cacheTag('products');
  try {
    const count = await db.$count(ProductTable);
    return count;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error');
  }
};
