import { Suspense } from 'react';
import { getLikedProducts, getLikedProductsCount } from '@/drizzle/db/likedProducts.db';
import { getUserData } from '@/drizzle/db/users.db';
import { LikedProducts } from './_components/LikedProducts';
import { ClearLikedList } from './_components/ClearLikedList';
import { PageTitle } from '../../_components/PageTitle';
import { BreadCrumbs } from '@/components/BreadCrumbs';

type SearchParams = Promise<{ productId: string | undefined; offset: string | undefined }>;

const LikedPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div className="pt-4 container">
      <BreadCrumbs />
      <div className="flex justify-between items-center">
        <PageTitle>Избранное</PageTitle>
        <Suspense>
          <SuspendedClearLikedListComponent />
        </Suspense>
      </div>
      <Suspense>
        <SuspendedLikedProductsComponent searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default LikedPage;

async function SuspendedLikedProductsComponent({ searchParams }: { searchParams: SearchParams }) {
  const user = await getUserData();
  const { productId } = await searchParams;
  const registeredUserLikedProducts = user ? await getLikedProducts(user.id) : null;
  return <LikedProducts selectedLikedProductId={productId} registeredUserLikedProducts={registeredUserLikedProducts} />;
}

async function SuspendedClearLikedListComponent() {
  const user = await getUserData();
  const existLikedProducts = user && (await getLikedProductsCount(user.id));
  if (existLikedProducts == 0) return null;
  return <ClearLikedList userId={user?.id} />;
}
