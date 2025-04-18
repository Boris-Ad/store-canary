'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, Cycle } from 'motion/react';
import { useMounted } from '@/hooks/useMounted';

export const FaceModal = ({ children, open, toggleOpen }: { children: React.ReactNode; open: boolean; toggleOpen: Cycle }) => {
  const { mounted } = useMounted();

  return (
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {e.stopPropagation();toggleOpen()}}
            className="absolute inset-0 bg-black/40 grid place-content-center z-50"
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="rounded-md shadow-lg relative overflow-hidden"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
     'face-modal'
    )
  );
};
