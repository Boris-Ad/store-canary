'use client';

import React, { useState } from 'react';
import { motion, PanInfo } from 'motion/react';
import clsx from 'clsx';
import useMeasure from 'react-use-measure';
import { CategoryTable } from '@/drizzle/schema';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight } from 'lucide-react';

export const HeroCategoriesSlider = ({ categories }: { categories: (typeof CategoryTable.$inferSelect)[] }) => {
  const [ref, { width }] = useMeasure();
  const categoriesForSlider =
    categories.length === 1 ? [...categories, ...categories, ...categories] : categories.length === 2 ? [...categories, ...categories] : categories;
  const [count, setCount] = useState(100);
  const [increasing, setIncreasing] = React.useState(true);

  const variants = {
    animate: (inx: number) => {
      if (inx === count % categoriesForSlider.length) {
        return { x: width < 400 ? -width / 3 : -width / 2, zIndex: increasing ? 2 : 1, scale: 0.9 };
      }
      if (inx === (count + 1) % categoriesForSlider.length) {
        return { x: 0, zIndex: 3, scale: 1 };
      }
      if (inx === (count + 2) % categoriesForSlider.length) {
        return { x: width < 400 ? width / 3 : width / 2, zIndex: increasing ? 1 : 2, scale: 0.9 };
      }
      return { x: 0, zIndex: 0, scale: 0.9 };
    },
  };
  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 0) {
      setCount(prev => (prev < categoriesForSlider.length ? 100 : prev - 1));
      setIncreasing(false);
    }
    if (info.offset.x < 0) {
      setCount(prev => prev + 1);
      setIncreasing(true);
    }
  };

  return (
    <div className="absolute inset-0 grid place-content-center select-none font-montserrat">
      <div className="relative">
        {categoriesForSlider.map((item, inx) => (
          <motion.div
            ref={ref}
            key={item.id + inx}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.05}
            dragListener={inx === (count + 1) % categoriesForSlider.length ? true : false}
            onDragEnd={onDragEnd}
            animate="animate"
            variants={variants}
            custom={inx}
            className={clsx('w-[220px] md:w-[400px] aspect-[3/2] p-2 md:p-4 absolute -translate-x-1/2 -translate-y-1/2 flex flex-col shadow-lg', {
              group: inx === (count + 1) % categoriesForSlider.length,
            })}
          >
            <Image src={item.imageUrl} alt={item.name} fill sizes="300px" draggable={false} className="object-contain" />
            <div className="absolute inset-0 bg-black/30" />
            <h2 className="z-10 mt-auto text-center text-xl text-white">{item.name}</h2>
            {inx === (count + 1) % categoriesForSlider.length && (
              <Link
                href={`/products?category=${item.id}`}
                className="absolute top-2 md:top-4 end-2 md:end-4 md:opacity-0 group-hover:opacity-100 hover:underline flex items-center transition-opacity"
              >
                <span className="text-sm md:text-base">Перейти</span>
                <ArrowDownRight size={width < 400 ? 18 : 22} />
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
