'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Cycle, motion } from 'motion/react';
import { ProductWithImages } from '@/types';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import clsx from 'clsx';
import { useCart } from '@/hooks/useCart';
import { useMyToast } from '@/hooks/useMyToast';

export const ViewProduct = ({ product: { id, images, name, price, number, available }, toggleOpen }: { product: ProductWithImages; toggleOpen: Cycle }) => {
  const [count, setCount] = useState<number>(0);
  const { addProduct } = useCart(state => state);
  const { setAction } = useMyToast(state => state);

  const onCart = () => {
    addProduct(id, { id, name, price, img: images[0].url, number, order: 1 });
    setAction('face',`${name} добавлен в корзину.`,'success')
  };

  return (
    <div className="w-[800px] p-4 bg-slate-700 text-white grid grid-cols-2 gap-4">
      <div className="w-full mb-2">
        <div className="w-full aspect-square overflow-hidden relative">
          {images.map((image, inx) => (
            <motion.div key={image.id} initial={false} animate={{ x: (inx + count) * 500 }} className="absolute inset-0">
              <Image src={image.url} alt={image.url} fill sizes="400px" className="object-contain" />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <div className="flex items-center space-x-3">
            <button
              disabled={count >= 0}
              onClick={() => setCount(prev => prev + 1)}
              className={clsx('w-9 h-9 rounded-full bg-slate-600 grid place-content-center transition-all hover:ring hover:ring-slate-500', {
                'text-slate-500': count >= 0,
              })}
            >
              <ArrowLeft />
            </button>
            {images.map((item, inx) => (
              <div key={item.id} className={clsx('w-3 h-3 rounded-full transition-colors', inx === Math.abs(count) ? 'bg-slate-400' : 'bg-slate-600')} />
            ))}
            <button
              disabled={Math.abs(count) == images.length - 1}
              onClick={() => setCount(prev => prev - 1)}
              className={clsx('w-9 h-9 rounded-full bg-slate-600 grid place-content-center transition-all hover:ring hover:ring-slate-500', {
                'text-slate-500': Math.abs(count) == images.length - 1,
              })}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="p-2 relative flex flex-col justify-between">
        <button onClick={() => toggleOpen()} className="absolute top-2 end-2 hover:text-slate-400 transition-colors">
          <X size={26} />
        </button>
        <h2 className="pr-6 text-xl line-clamp-1">{name}</h2>

        <div className="space-y-2">
          <h4 className="text-2xl">{formatCurrency(price)}</h4>
          <div className="flex items-center gap-x-2">
            <div className={clsx('w-1 h-1 rounded-full', available ? 'bg-green-500' : 'bg-red-500')} />
            <p className={clsx('text-sm', available ? 'text-green-500' : 'text-red-500')}>{available ? 'Есть в наличии' : 'Нет в наличии'}</p>
          </div>

          <button onClick={onCart} className="w-full h-10 bg-face-primary hover:bg-face-primary/80 rounded-full">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};
