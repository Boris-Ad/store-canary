import { ImagesTable, ProductTable } from '@/drizzle/schema';

export type ProductWithImages = typeof ProductTable.$inferSelect & {
  images: (typeof ImagesTable.$inferSelect)[];
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
}

export interface ICartProduct {
  id: string;
  name: string;
  price: number;
  number: number;
  img: string;
  order: number;
}
