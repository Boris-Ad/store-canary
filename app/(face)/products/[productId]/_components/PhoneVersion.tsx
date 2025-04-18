'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, PanInfo } from 'motion/react';
import useMeasure from 'react-use-measure';
import clsx from 'clsx';
import { ProductWithImages } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Accordion } from '@/components/FaceAccordion';
import { accordionProductData } from '@/app/(face)/_data';
import { useMyToast } from '@/hooks/useMyToast';
import { useCart } from '@/hooks/useCart';

export const PhoneVersion = ({ product }: { product: ProductWithImages }) => {
  const { setAction } = useMyToast(state => state);
  const { addProduct } = useCart(state => state);
  const [ref, { width }] = useMeasure();
  const [count, setCount] = useState(0);

  const onShift = (_event: TouchEvent, info: PanInfo) => {
    if (info.offset.x < 0) {
      if (count >= product.images.length - 1) return;
      setCount(prev => prev + 1);
    }

    if (info.offset.x > 0) {
      if (count == 0) return;
      setCount(prev => prev - 1);
    }
  };

  const onAddProductToCart = () => {
    addProduct(product.id, { id: product.id, name: product.name, price: product.price, number: product.number, img: product.images[0].url, order: 1 });
    setAction('face', `${product.name} добавлен в корзину.`, 'success');
  };

  const x = (width - 30 + 12) * -count;
  return (
    <div className="md:hidden py-6 space-y-5">
      <div ref={ref} className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: x, right: x }}
          onDragEnd={onShift}
          initial={false}
          animate={{ x }}
          className="w-full h-[300px] flex gap-3"
        >
          {product.images.map(image => (
            <div
              key={image.id}
              style={{ minWidth: width - 30 }}
              className="aspect-square flex justify-center items-center relative bg-radial from-slate-600 to-60% to-slate-700/50"
            >
              <Image src={image.url} alt={image.id} fill sizes="400px" className="object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg">{product.name}</h2>
        <p className="text-2xl">{formatCurrency(product.price)}</p>
        <div className="flex items-center gap-x-2">
          <div className={clsx('w-1 h-1 rounded-full', product.available ? 'bg-green-500' : 'bg-red-500')} />
          <p className={clsx('text-xs md:text-sm', product.available ? 'text-green-500' : 'text-red-500')}>
            {product.available ? 'Есть в наличии' : 'Нет в наличии'}
          </p>
        </div>
        <button
          onClick={onAddProductToCart}
          disabled={!product.available}
          className={clsx(
            'w-full py-2 text-sm rounded-full transition-colors',
            { 'bg-face-primary active:bg-face-primary/70': product.available },
            { 'bg-slate-600 cursor-default': !product.available }
          )}
        >
          В корзину
        </button>
      </div>
      <Accordion items={accordionProductData} />
    </div>
  );
};
