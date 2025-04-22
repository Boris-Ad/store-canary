'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useMounted } from '@/hooks/useMounted';

export const SelectDropMenu = ({
  children,
  setMenu,
  menuPosition,
}: {
  children: React.ReactNode;
  setMenu: () => void;
  menuPosition: { x: number; y: number; width: number; height: number } | undefined;
}) => {
  const { mounted } = useMounted();
  return (
    mounted &&
    createPortal(
      <AnimatePresence>
        {menuPosition && (
          <div onClick={() => setMenu()} className="absolute inset-0 z-50">
            <motion.div
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ ...menuPosition, y: menuPosition.y + menuPosition.height + 3 }}
              onClick={e => e.stopPropagation()}
              className="bg-slate-700 rounded-lg shadow-lg flex flex-col overflow-hidden"
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body,
      'select-drop-menu'
    )
  );
};
