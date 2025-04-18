'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Check, ChevronDown, List } from 'lucide-react';
import { CategoryTable } from '@/drizzle/schema';
import { SelectDropMenu } from '@/components/SelectDropMenu';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const SelectCategory = ({ categories }: { categories: (typeof CategoryTable.$inferSelect)[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number; width: number; height: number }>();
  const [title, setTitle] = useState('Категория');

  const onMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    setMenuPosition({ x, y, width, height });
  };

  const setCategory = useCallback(
    (categoryId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('category', categoryId);
      router.push(pathname + '?' + params);
      setMenuPosition(undefined);
    },
    [searchParams]
  );

  useEffect(() => {
    const params = searchParams.get('category');
    const res = categories.find(item => item.id === params);
    if (res) {
      setTitle(res.name);
    } else {
      setTitle('Категория');
    }
  }, [searchParams]);

  return (
    <>
      <button onClick={onMenu} className="w-full h-full pl-12 pr-8 bg-slate-700 text-slate-300 rounded-full relative flex items-center z-20">
        <List className="absolute top-1/2 start-3 -translate-y-1/2 text-slate-400" />
        <ChevronDown className={clsx('absolute top-1/2 end-3 -translate-y-1/2 text-slate-400 transition-transform', { 'rotate-180': menuPosition })} />
        <span>{title}</span>
      </button>
      <SelectDropMenu setMenu={() => setMenuPosition(undefined)} menuPosition={menuPosition}>
        <ul className="text-slate-200">
          <li onClick={() => setCategory('all')} className="px-3 py-1 flex justify-between items-center hover:bg-slate-600">
            <span>Все категории</span>
            {(searchParams.get('category') === 'all' || searchParams.get('category') == null ) && <Check size={18} />}
          </li>
          {categories.map(category => (
            <li onClick={() => setCategory(category.id)} key={category.id} className="px-3 py-1 flex justify-between items-center hover:bg-slate-600">
              <span className="line-clamp-1">{category.name}</span>
              {searchParams.get('category') === category.id && <Check size={18} />}
            </li>
          ))}
        </ul>
      </SelectDropMenu>
    </>
  );
};
