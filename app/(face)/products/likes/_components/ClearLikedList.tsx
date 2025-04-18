'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { clearLikeProductsListAction } from '@/app/(face)/_actions/likeProduct.actions';
import { Trash2 } from 'lucide-react';
import { useLike } from '@/hooks/useLike';
import { FaceTooltip } from '@/components/FaceTooltip';
import clsx from 'clsx';

export const ClearLikedList = ({ userId }: { userId: string | undefined }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { clearLikedProducts, likedProducts } = useLike(state => state);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string }>();

  if(likedProducts.length == 0 && !userId ) return null

  const onClear = () => {
    startTransition(async () => {
      if (userId) {
        await clearLikeProductsListAction(userId);
      } else {
        clearLikedProducts();
      }
      startTransition(() => {
        router.push('/products', { scroll: false });
      });
    });
  };

  return (
    <>
      <motion.button
        onHoverStart={event =>
          setTooltip({
            x: event.x - event.offsetX,
            y: event.y - event.offsetY,
            text: 'Очистить избранное',
          })
        }
        onHoverEnd={() => setTooltip(undefined)}
        disabled={isPending}
        onClick={onClear}
        className="w-8 h-8"
      >
        <Trash2 className={clsx("w-5 md:w-6",{'animate-spin':isPending})} />
      </motion.button>
      <FaceTooltip tooltip={tooltip} />
    </>
  );
};
