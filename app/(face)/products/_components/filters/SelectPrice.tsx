'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { SelectDropMenu } from '@/components/SelectDropMenu';

export const SelectPrice = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number; width: number; height: number }>();
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const onMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    setMenuPosition({ x, y, width, height });
  };

  const setPrice = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice.trim().length > 0) {
      params.set('minPrice', minPrice.trim());
    } else {
      params.delete('minPrice');
    }
    if (maxPrice.trim().length > 0) {
      params.set('maxPrice', maxPrice.trim());
    } else {
      params.delete('maxPrice');
    }

    router.push(pathname + '?' + params);
    setMenuPosition(undefined);
  };

  return (
    <>
      <button onClick={onMenu} className="w-full h-full pl-6 pr-8 bg-slate-700 text-slate-300 rounded-full relative flex items-center z-20">
        <ChevronDown className={clsx('absolute top-1/2 end-3 -translate-y-1/2 text-slate-400 transition-transform', { 'rotate-180': menuPosition })} />
        <span>Цена</span>
      </button>
      <SelectDropMenu setMenu={() => setMenuPosition(undefined)} menuPosition={menuPosition}>
        <div className="p-3 text-slate-200">
          <div className="h-16 grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm">От</p>
              <input type="text" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full h-8 px-3 bg-slate-600 rounded-full" />
            </div>
            <div>
              <p className="text-sm">До</p>
              <input type="text" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full h-8 px-3 bg-slate-600 rounded-full" />
            </div>
          </div>
          <button onClick={setPrice} className="w-full h-8 bg-face-primary hover:bg-face-primary/80 active:bg-face-primary rounded-full">
            Готово
          </button>
        </div>
      </SelectDropMenu>
    </>
  );
};
