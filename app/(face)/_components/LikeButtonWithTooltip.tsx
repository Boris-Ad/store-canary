'use client';

import { useEffect, useState, useTransition } from 'react';
import { useLike } from '@/hooks/useLike';
import { existLike } from '@/lib/utils';
import { ProductWithImages } from '@/types';
import { motion } from 'motion/react';
import { removeLikeProductAction, setLikeProductAction } from '../_actions/likeProduct.actions';
import clsx from 'clsx';
import { useMyToast } from '@/hooks/useMyToast';
import { Heart } from 'lucide-react';
import { FaceTooltip } from '@/components/FaceTooltip';

export const LikeButtonWithTooltip = ({ product, user }: { product: ProductWithImages; user: { id: string; likesProductsId: string[] } | null }) => {
  const [isTooltipPending, startTooltipTransition] = useTransition();
  const { setAction } = useMyToast(state => state);
  const { likedProducts, setLikedProduct, removeLikedProduct } = useLike(state => state);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string }>();

  const onLike = () => {
    const stateAction = likedProducts.includes(product.id) ? removeLikedProduct : setLikedProduct;
    if (user) {
      const serverAction = user.likesProductsId.includes(product.id) ? removeLikeProductAction : setLikeProductAction;
      startTooltipTransition(async () => {
        const result = await serverAction(user.id, product.id);
        if (result?.message) {
          setAction('face', result.message, 'warning');
        }
        startTooltipTransition(() => {
          setTooltip(prev => (prev ? { ...prev, text: result.action ? 'Удалить из избранного' : 'Добавить в избранное' } : prev));
        });
      });
    } else {
      stateAction(product.id);
    }
  };
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
          onLike();
        }}
        onHoverStart={event =>
          setTooltip({
            x: event.x - event.offsetX,
            y: event.y - event.offsetY,
            text: existLike({ productId: product.id, userLikes: user?.likesProductsId, questLikes: likedProducts })
              ? 'Удалить из избранного'
              : 'Добавить в избранное',
          })
        }
        onHoverEnd={() => setTooltip(undefined)}
        disabled={isTooltipPending}
        className="w-8 md:w-9 h-8 md:h-9 group hide md:opacity-0 bg-slate-800 rounded-full grid place-content-center"
      >
        <Heart
          size={20}
          className={clsx(
            'text-red-500 transition-colors',
            { 'animate-ping': isTooltipPending },
            { 'text-white group-hover:text-green-500': !existLike({ productId: product.id, userLikes: user?.likesProductsId, questLikes: likedProducts }) }
          )}
        />
      </motion.button>
      <FaceTooltip tooltip={tooltip} />
    </>
  );
};
