import { db } from '@/drizzle';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { UserTable } from '@/drizzle/schema';
import { auth } from '@/services/auth';
import { eq } from 'drizzle-orm';
import { IUser } from '@/types';
import { Session } from 'next-auth';

export const insertUser = async (data: typeof UserTable.$inferInsert) => {
  const [newUser] = await db.insert(UserTable).values(data).returning();
  if (newUser == null) throw new Error('Регистрация не удалась!');
  return newUser;
};

export const getUserByEmail = async (email: string) => {
  return await db.query.UserTable.findFirst({ where: eq(UserTable.email, email) });
};

async function setCache(session: Session | null) {
  'use cache';
  cacheTag('user');
  if (session?.user) {
    const user = session.user;
    const id = user.id || '';
    const name = user.name || '';
    const email = user.email || '';
    const image = user.image || null;
    const role = user.role || 'user';
    return { id, name, email, image, role };
  }
  return null;
}

export const getUserData = async (): Promise<IUser | null> => {
  const session = await auth();
  const userData = await setCache(session);
  return userData;
};
