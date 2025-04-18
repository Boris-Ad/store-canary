'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { formatCurrency } from '@/lib/utils';
import { ProductWithImages } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useMyToast } from '@/hooks/useMyToast';

export const SelectedLikedProduct = ({ product }: { product?: ProductWithImages }) => {
  const { addProduct } = useCart(state => state);
  const { setAction } = useMyToast(state => state);

  if (product == null) return null;

  const onAddProduct = () => {
    addProduct(product.id, { id: product.id, name: product.name, price: product.price, number: product.number, img: product.images[0].url, order: 1 });
    setAction('face', `${product.name} добавлен в корзину!`, 'success');
  };
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-3 items-center">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Image src={product.images[0].url} alt="Root image" width={400} height={400} priority className={clsx('aspect-square object-contain')} />
      </div>
      <div className="w-full md:w-1/3 md:min-w-[360px] p-4 flex flex-col space-y-4 order-last md:order-none">
        <h2 className="text-xl md:text-2xl font-montserrat line-clamp-1 font-medium">{product.name}</h2>
        <p className="text-2xl">{formatCurrency(product.price)}</p>
        <div className="flex items-center gap-x-2">
          <div className={clsx('w-1 h-1 rounded-full', product.available ? 'bg-green-500' : 'bg-red-500')} />
          <p className={clsx('text-sm', product.available ? 'text-green-500' : 'text-red-500')}>{product.available ? 'Есть в наличии' : 'Нет в наличии'}</p>
        </div>

        <button onClick={onAddProduct} className="w-full mt-auto h-10 bg-face-primary hover:bg-face-primary/80 rounded-full active:bg-face-primary/70">
          В корзину
        </button>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 place-items-center">
        {product.images.map((image, inx) => (
          <Image
            key={image.id}
            src={image.url}
            alt={image.productId}
            width={400}
            height={400}
            priority
            className={clsx('aspect-square h-auto object-contain', { hidden: inx === 0 })}
          />
        ))}
      </div>
    </div>
  );
};
