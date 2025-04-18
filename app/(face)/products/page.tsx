import { Suspense } from 'react';
import { PageTitle } from '../_components/PageTitle';
import { getCountProducts, getProducts } from '@/drizzle/db/products.db';
import { ProductCounter } from './_components/ProductCounter';
import { getUserData } from '@/drizzle/db/users.db';
import { getLikedProductsByUser } from '@/drizzle/db/likedProducts.db';
import { userDataForCards } from '@/lib/utils';
import { ProductCard } from '../_components/ProductCard';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { SelectCategory } from './_components/filters/SelectCategory';
import { getCategories } from '@/drizzle/db/categories.db';
import { SelectPrice } from './_components/filters/SelectPrice';
import { notFound } from 'next/navigation';
import { MobileFilters } from '../_components/for-mobile/MobileFilters';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const ProductsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const productsCount = await getCountProducts();
  if (productsCount == 0) return notFound();
  const categories = await getCategories();
  
  return (
    <div className="py-4 container">
      <BreadCrumbs />
      <div className="relative md:mb-12">
        <PageTitle>Каталог</PageTitle>
        <ProductCounter productsCount={productsCount} />
      </div>
      <section className="hidden h-12 mb-8 md:grid grid-cols-4 gap-3">
        <Suspense>
          <SelectCategory categories={categories} />
        </Suspense>
        <Suspense>
          <SelectPrice />
        </Suspense>
      </section>
      <MobileFilters categories={categories} />
      <Suspense>
        <SuspendedCatalogComponent searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;

async function SuspendedCatalogComponent({ searchParams }: { searchParams: SearchParams }) {
  const query = await searchParams;
  const [userData, products] = await Promise.all([getUserData(), getProducts({ searchParams: query, images: true, limit: 12 })]);
  const likes = userData ? await getLikedProductsByUser(userData.id) : [];
  const user = userDataForCards(userData, likes);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} user={user} />
        ))}
      </div>
    </>
  );
}
