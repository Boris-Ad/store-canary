'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import useMeasure from 'react-use-measure';
import clsx from 'clsx';
import { ProductWithImages } from '@/types';
import { compareWidthForDrag } from '@/lib/utils';

export const LikedProductsList = ({ products, selectedLikedProductId }: { products: ProductWithImages[]; selectedLikedProductId?: string }) => {
  const router = useRouter();
  const constraintsRef = useRef(null);
  const [ref, bounds] = useMeasure();

  const [dragTransition, setDragTransition] = useState(false);

  const handleClick = (productId: string) => {
    if (!dragTransition) {
      router.push('/products/likes?productId=' + productId, { scroll: false });
    }
  };

  return (
    <div ref={constraintsRef} className="flex py-2 overflow-x-hidden select-none">
      <motion.div
        ref={ref}
        drag="x"
        dragListener={compareWidthForDrag(constraintsRef, bounds.width)}
        dragConstraints={constraintsRef}
        onDragStart={() => setDragTransition(true)}
        onDragEnd={() => setDragTransition(false)}
        className="flex gap-4 px-2"
      >
        {products.map((product, inx) => (
          <div
            key={product.id}
            onClick={() => handleClick(product.id)}
            className={clsx(
              'p-2',
              (!selectedLikedProductId && inx === 0) || product.id === selectedLikedProductId
                ? 'ring ring-amber-500'
                : 'ring ring-slate-700 hover:ring-slate-600'
            )}
          >
            <Image
              src={product.images[0].url}
              alt={product.name}
              width={200}
              height={200}
              className="min-w-[100px] max-w-[100px] md:min-w-[200px] md:max-w-[200px] aspect-square object-contain"
              draggable={false}
              priority={true}
            />
            <span className="hidden md:block line-clamp-1 text-sm text-slate-300">{product.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
