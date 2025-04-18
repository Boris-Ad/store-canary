'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

type Item = { id: number; title: string; text: string };

export const Accordion = ({ items }: { items: Item[] }) => {
  const [count, setCount] = useState<number>();

  return (
    <div className="w-full border-t border-slate-500">
      {items.map((item, inx) => (
        <Item key={item.id} inx={inx} count={count} setCount={setCount} value={item} />
      ))}
    </div>
  );
};

function Item({
  inx,
  count,
  setCount,
  value,
}: {
  inx: number;
  count?: number;
  setCount: React.Dispatch<React.SetStateAction<number | undefined>>;
  value: Item;
}) {
    return (
        <div className="border-b border-slate-500">
        <button onClick={() => setCount(prev => (prev == inx ? undefined : inx))} className="w-full h-12   cursor-pointer flex justify-between items-center">
          <span>{value.title}</span>
          <ChevronDown size={18} className={clsx('transition-transform',{'rotate-180': inx == count})} />
        </button>
        <motion.div initial={false} animate={{ height: inx == count ? 'auto' : '0px' }} className="text-slate-300 overflow-hidden">
          <div className="p-2">
            <p>{value.text}</p>
          </div>
        </motion.div>
      </div>
    )
}
