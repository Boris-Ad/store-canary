import Link from 'next/link';
import { getCountProducts, getProducts } from '@/drizzle/db/products.db';
import { AdminPagesTitle } from '../_components/AdminPagesTitle';
import { Button } from '@/components/ui/button';
import { getCategories } from '@/drizzle/db/categories.db';

import { ProductsTable } from './_components/ProductsTable';
import { SearchByName } from './_components/filters/SearchByName';
import { SelectCategory } from './_components/filters/SelectCategory';
import { AvailableCheckbox } from './_components/filters/AvailableCheckbox';
import { Suspense } from 'react';
import { TableSkeleton } from '../_skeletons/TableSkeleton';

const ProductsPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) => {
  const [categories, countProducts] = await Promise.all([getCategories(), getCountProducts()]);

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminPagesTitle>Продукты</AdminPagesTitle>
        <Button asChild>
          <Link href="/dashboard/products/new">Создать продукт</Link>
        </Button>
      </div>
      {countProducts > 0 ? (
        <>
          <h2 className="text-xl">Фильтры</h2>
          <div className="my-4 grid grid-cols-4 gap-x-3">
            <SearchByName />
            <SelectCategory categories={categories} />
            <div />
            <AvailableCheckbox />
          </div>
          <Suspense fallback={<TableSkeleton />}>
            <SuspendedTableComponent searchParams={searchParams} />
          </Suspense>
        </>
      ) : (
        <h3 className="text-2xl">Список пуст!</h3>
      )}
    </>
  );
};

export default ProductsPage;

async function SuspendedTableComponent({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const searchParamsValue = await searchParams;
  const products = await getProducts({searchParams:searchParamsValue});
  return <ProductsTable products={products} />;
}
