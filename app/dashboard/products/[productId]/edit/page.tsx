import { Suspense } from 'react';
import { AdminPagesTitle } from '@/app/dashboard/_components/AdminPagesTitle';

import { Categories } from '../../_components/Categories';
import { getCategories, getCategoryById } from '@/drizzle/db/categories.db';
import { getProductById } from '@/drizzle/db/products.db';
import { EditProduct } from './_components/EditProduct';
import { redirect } from 'next/navigation';

const EditProductPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const categories = await getCategories();
  return (
    <>
      <AdminPagesTitle>Редактировать продукт</AdminPagesTitle>
      <section className="max-w-[1200px]">
        <h3 className="text-xl">Выбрать категорию</h3>
        <Categories categories={categories} />
        <Suspense>
          <SuspendedEditProductComponent params={params} />
        </Suspense>
      </section>
    </>
  );
};

export default EditProductPage;

async function SuspendedEditProductComponent({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await getProductById(productId, { images: true });
  if (product == null) redirect('/dashboard/products');
  const category = await getCategoryById(product.categoryId);
  if (category == null) return null;
  return <EditProduct product={product} category={category} />;
}
