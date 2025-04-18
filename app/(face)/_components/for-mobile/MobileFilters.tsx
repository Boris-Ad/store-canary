'use client';

import React, { Suspense } from 'react';
import { motion, useCycle } from 'motion/react';
import { CategoryTable } from '@/drizzle/schema';
import useMeasure from 'react-use-measure';
import clsx from 'clsx';
import { SelectCategory } from '../../products/_components/filters/SelectCategory';
import { SelectPrice } from '../../products/_components/filters/SelectPrice';
import { Settings2 } from 'lucide-react';

export const MobileFilters = ({ categories }: { categories: (typeof CategoryTable.$inferSelect)[] }) => {
  const [position, shift] = useCycle('left', 'right');
  const [ref, { width }] = useMeasure();

  const variants = {
    left: { x: 0 },
    right: { x: -width },
  };

  return (
    <div className="md:hidden flex gap-2 mb-4">
      <div ref={ref} className="w-full h-10 relative overflow-hidden">
        <motion.div animate={position} variants={variants} className={clsx('absolute inset-0')}>
          <Suspense>
            <SelectCategory categories={categories} />
          </Suspense>
        </motion.div>
        <motion.div animate={position} variants={variants} className={clsx('absolute inset-0 translate-x-full')}>
          <Suspense>
            <SelectPrice />
          </Suspense>
        </motion.div>
      </div>

      <button onClick={() => shift()} className="min-w-10 h-10 bg-slate-700 rounded-full grid place-content-center">
        <Settings2 size={18} />
      </button>
    </div>
  );
};
