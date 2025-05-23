'use client';

import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

import { cn } from '@/lib/utils';
import { useMyToast } from '@/hooks/useMyToast';
import { useMounted } from '@/hooks/useMounted';

export const MyToast = () => {
  const { mounted } = useMounted();
  const { action, text, variant } = useMyToast(state => state);

  const variants = {
    init: { y: -60, scale: 0.7, opacity: 0 },
    animate: { y: 60, scale: 1, opacity: 1 },
    exit: { y: -60, scale: 0.7, opacity: 0 },
  };

  return (
    mounted &&
    createPortal(
      <AnimatePresence>
        {action === 'auth' && (
          <motion.div
            variants={variants}
            initial="init"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, type: 'spring', bounce: 0.25 }}
            className={cn(
              'min-w-60 max-w-[500px] px-4 py-2.5 md:text-xl bg-white rounded absolute top-0 start-1/2 -translate-x-1/2 grid place-content-center shadow-md ring-2 z-0',
              { 'ring-yellow-500 text-yellow-500': variant === 'warning' },
              { 'ring-red-500 text-red-500': variant === 'error' },
              { 'ring-green-500 text-green-500': variant === 'success' }
            )}
          >
            <h2>{text}</h2>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      'auth-toast'
    )
  );
};
