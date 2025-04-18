import { db } from '@/drizzle';
import { eq } from 'drizzle-orm';
import { StoreTable } from '../schema';
import { unstable_cacheTag as cacheTag } from 'next/cache';


export const insertStore = async (data: typeof StoreTable.$inferInsert) => {
  const [store] = await db.insert(StoreTable).values(data).returning().onConflictDoUpdate({ target: StoreTable.id, set: data });
  return store;
};

export const getStore = async () => {
  'use cache';
  const store = await db.query.StoreTable.findFirst({ where: eq(StoreTable.id, 1) });
  cacheTag('store');
  return store;
};
