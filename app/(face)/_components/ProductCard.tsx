'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useAnimate } from 'motion/react';
import { ProductWithImages } from '@/types';
import { formatCurrency } from '@/lib/utils';
import clsx from 'clsx';
import { useMyToast } from '@/hooks/useMyToast';
import { useCart } from '@/hooks/useCart';
import { useNewItems } from '@/hooks/useNewItems';
import { LikeButtonWithTooltip } from './LikeButtonWithTooltip';
import { ViewProductButtonWithTooltip } from './ViewProductButtonWithTooltip';

export const ProductCard = ({ product, user }: { product: ProductWithImages; user: { id: string; likesProductsId: string[] } | null }) => {
  const router = useRouter();
  const [scope, animate] = useAnimate();
  const { setAction } = useMyToast(state => state);
  const { addProduct } = useCart(state => state);
  const { newItems } = useNewItems(state => state);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const bgRadialStart = 'radial-gradient(oklch(0.208 0.042 265.755), transparent 70%)';
  const bdRadialEnd = 'radial-gradient(oklch(0.372 0.044 257.287), transparent 60%)';

  const startHover = () => {
    const width = windowWidth > 600;
    if (width) {
      animate(
        scope.current,
        {
          backgroundColor: 'oklch(0.372 0.044 257.287)',
          boxShadow: '0px 5px 7px 5px rgba(25, 29, 32, 0.2)',
        },
        { duration: 0.3 }
      );
    }
    if (width) {
      animate('.header', { background: bgRadialStart }, { duration: 0.3 });
    }
    if (width) {
      animate('.hide', { opacity: 1 }, { duration: 0.3 });
    }
  };

  const endHover = () => {
    const width = windowWidth > 600;
    if (width) {
      animate(
        scope.current,
        {
          backgroundColor: 'oklch(0.279 0.041 260.031)',
          boxShadow: 'none',
        },
        { duration: 0.3 }
      );
    }
    if (width) {
      animate('.header', { background: bdRadialEnd }, { duration: 0.3 });
    }
    if (width) {
      animate('.hide', { opacity: 0 }, { duration: 0.3 });
    }
  };

  const onAddProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addProduct(product.id, { id: product.id, name: product.name, price: product.price, number: product.number, img: product.images[0].url, order: 1 });
    setAction('face', `${product.name} добавлен в корзину.`, 'success');
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <>
      <motion.div
        ref={scope}
        onHoverStart={startHover}
        onHoverEnd={endHover}
        onClick={() => router.push('/products/' + product.id)}
        className={clsx('p-2 md:p-4 flex flex-col space-y-2 cursor-pointer relative shadow-md md:shadow-none bg-slate-700/60 md:bg-slate-800')}
      >
        <div className="flex flex-col gap-2 absolute top-1 md:top-2 end-1 md:end-2 z-10">
          <LikeButtonWithTooltip product={product} user={user} />
          <ViewProductButtonWithTooltip product={product} />
        </div>

        {newItems.includes(product.id) && (
          <div className="py-1 px-1 absolute top-1 start-1 bg-face-secondary z-10">
            <p className="text-xs sm:text-sm">Новинка</p>
          </div>
        )}
        <motion.div style={{ background: windowWidth < 600 ? bgRadialStart : bdRadialEnd }} className="h-[140px] md:h-[300px] header relative bg-radial">
          <Image src={product.images[0].url} alt={product.name} fill sizes="300px" className="object-contain" />
        </motion.div>

        <div className="md:pt-2 md:space-y-2">
          <p className="line-clamp-1 text-base md:text-xl font-light">{product.name}</p>
          <div className="flex items-center gap-x-2">
            <div className={clsx('w-1 h-1 rounded-full', product.available ? 'bg-green-500' : 'bg-red-500')} />
            <p className={clsx('text-xs md:text-sm', product.available ? 'text-green-500' : 'text-red-500')}>
              {product.available ? 'Есть в наличии' : 'Нет в наличии'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-0 md:flex-row md:justify-between md:items-center">
          <p className="text-lg md:text-2xl">{formatCurrency(product.price)}</p>
          <button
            onClick={onAddProduct}
            disabled={!product.available}
            className={clsx(
              'md:px-5 py-1.5 md:py-3 text-sm md:text-base hide rounded-full md:opacity-0 transition-colors',
              { 'hover:bg-face-primary/80 bg-face-primary active:bg-face-primary/70': product.available },
              { 'bg-slate-600 cursor-default': !product.available }
            )}
          >
            В корзину
          </button>
        </div>
      </motion.div>
    </>
  );
};
