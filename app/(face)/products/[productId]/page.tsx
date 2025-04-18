import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Accordion } from '@/components/FaceAccordion';
import { getProductById } from '@/drizzle/db/products.db';
import { formatCurrency } from '@/lib/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { accordionProductData } from '@/app/(face)/_data';
import { SetToCart } from './_components/SetToCart';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { PhoneVersion } from './_components/PhoneVersion';

type Params = Promise<{ productId: string }>;

const ProductPage = ({ params }: { params: Params }) => {
  return (
    <div className="pt-4 container">
      <Suspense>
        <SuspendedBreadCrumbsComponent params={params} />
      </Suspense>
      <Suspense>
        <SuspendedProductPageComponent params={params} />
      </Suspense>
    </div>
  );
};

export default ProductPage;

async function SuspendedBreadCrumbsComponent({ params }: { params: Params }) {
  const { productId } = await params;
  const product = await getProductById(productId);
  if (product == null) return null;
  return <BreadCrumbs dynamicProduct={{ id: product.id, name: product.name }} />;
}

async function SuspendedProductPageComponent({ params }: { params: Params }) {
  const { productId } = await params;
  const product = await getProductById(productId, { images: true });
  if (product == null) notFound();

  return (
    <>
    <PhoneVersion product={product} />
    <div className="hidden md:grid grid-cols-3 gap-5 mt-10">
      <div className="grid grid-cols-2 col-span-2 gap-5">
        {product.images.map(image => (
          <Image
            key={image.id}
            src={image.url}
            alt={image.id}
            width={500}
            height={500}
            priority
            className="w-full aspect-square bg-radial from-slate-600 to-70% to-slate-700/50"
          />
        ))}
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl line-clamp-2">{product.name}</h2>
        <h3 className="text-2xl">{formatCurrency(product.price)}</h3>
        <div className="flex items-center gap-x-2">
          <div className={clsx('w-1 h-1 rounded-full', product.available ? 'bg-green-500' : 'bg-red-500')} />
          <p className={clsx('text-sm', product.available ? 'text-green-500' : 'text-red-500')}>{product.available ? 'Есть в наличии' : 'Нет в наличии'}</p>
        </div>
        <SetToCart product={product} />
        <Accordion items={accordionProductData} />
      </div>
    </div>
    </>
 
  );
}
