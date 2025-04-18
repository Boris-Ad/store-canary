'use client';

import { useEffect, useState } from 'react';
import { motion, useCycle } from 'motion/react';
import { Eye } from 'lucide-react';
import { FaceModal } from '@/components/FaceModal';
import { ViewProduct } from './ViewProduct';
import { ProductWithImages } from '@/types';
import { FaceTooltip } from '@/components/FaceTooltip';
import { useLike } from '@/hooks/useLike';

export const ViewProductButtonWithTooltip = ({product}:{product: ProductWithImages}) => {
  const [open, toggleOpen] = useCycle(false, true);
   const { likedProducts } = useLike(state => state);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string }>();

  useEffect(() => {
    const main = document.querySelector('main');
    main?.addEventListener('scroll', () => setTooltip(undefined));
  }, []);

  useEffect(() => {
    setTooltip(prev => (prev ? { ...prev, text: likedProducts.includes(product.id) ? 'Удалить из избранного' : 'Добавить в избранное' } : prev));
  }, [likedProducts]);
  return (
    <>
      <motion.button
        onClick={e => {
          e.stopPropagation();
          toggleOpen();
        }}
        onHoverStart={event => setTooltip({ x: event.x - event.offsetX, y: event.y - event.offsetY, text: 'Быстрый просмотр' })}
        onHoverEnd={() => setTooltip(undefined)}
        className="hidden w-9 h-9 group hide opacity-0 bg-slate-800 rounded-full md:grid place-content-center"
      >
        <Eye size={20} className="group-hover:text-green-500 transition-colors" />
      </motion.button>
      <FaceTooltip tooltip={tooltip} />
      <FaceModal open={open} toggleOpen={toggleOpen}> 
        <ViewProduct product={product} toggleOpen={toggleOpen} />
      </FaceModal>
    </>
  );
};
