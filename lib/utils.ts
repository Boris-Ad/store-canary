import { UserToProductTable } from '@/drizzle/schema';
import { ICartProduct, IUser } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'RUB',
    style: 'currency',
    minimumFractionDigits: 0,
  }).format(amount);
};

export function numWord(value: number, words: string[]) {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
}

export const existLike = (data: { productId: string; userLikes?: string[]; questLikes: string[] }) => {
  if (data.userLikes != null) {
    return data.userLikes.includes(data.productId);
  } else {
    return data.questLikes.includes(data.productId);
  }
};

export const compareWidthForDrag = (parent: React.RefObject<null>, listElementWidth: number) => {
  let result = false;
  if (parent.current) {
    const p = parent.current as HTMLDivElement;
    const parentWidth = p.getBoundingClientRect().width;
    result = listElementWidth > parentWidth;
  }
  return result;
};

export const productsPrice = (products: Record<string, ICartProduct>) => {
  const values = Object.values(products);
  const sum = values.reduce((sum, item) => sum + item.order * item.price, 0);
  return sum;
};

export const userDataForCards = (userData: IUser | null, likes: (typeof UserToProductTable.$inferSelect)[]) => {
  const likesProductsId = likes.map(item => item.productId);
  const user = userData ? { id: userData.id, likesProductsId } : null;
  return user;
};
