'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

import { cn } from '@/lib/utils';
import { useMyToast } from '@/hooks/useMyToast';
import { useMounted } from '@/hooks/useMounted';

export const FaceToast = () => {
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
        {action === 'face' && (
          <motion.div
            variants={variants}
            initial="init"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, type: 'spring', bounce: 0.25 }}
            className={cn(
              'min-w-60 md:max-w-[500px] px-3 md:px-5 py-2 md:py-3 md:text-xl bg-slate-700 rounded-xl absolute top-0 start-1/2 -translate-x-1/2 grid place-content-center shadow-md z-50',
              { 'text-yellow-500 border-b border-yellow-500': variant === 'warning' },
              { 'text-red-500 border-b border-red-500': variant === 'error' },
              { 'text-slate-100 border-b border-slate-100': variant === 'success' }
            )}
          >
            <h2 className="line-clamp-3 font-montserrat">{text}</h2>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      'face-toast'
    )
  );
};
