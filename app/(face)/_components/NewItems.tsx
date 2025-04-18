import { getUserData } from '@/drizzle/db/users.db';
import { PageTitle } from './PageTitle';
import { getProducts } from '@/drizzle/db/products.db';
import { getLikedProductsByUser } from '@/drizzle/db/likedProducts.db';
import { ProductCard } from './ProductCard';
import { ArrowDownRight } from 'lucide-react';
import Link from 'next/link';
import { userDataForCards } from '@/lib/utils';

export const NewItems = async () => {
  const [userData, products] = await Promise.all([getUserData(), getProducts({ images: true, limit: 4 })]);
  const likes = userData ? await getLikedProductsByUser(userData.id) : [];
  const user = userDataForCards(userData, likes);

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Новинки</PageTitle>
        <Link href="/products" className="flex items-center gap-1 hover:underline">
          <span className='text-sm sm:text-base'>Все</span>
          <ArrowDownRight size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8 relative">
        {products.map(product => (
          <ProductCard key={product.id} product={product} user={user} />
        ))}
      </div>
    </>
  );
};
