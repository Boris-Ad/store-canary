'use client'

import { AnimatePresence, motion } from 'motion/react';

export const FaceTooltip = ({tooltip}:{tooltip?:{x:number,y:number,text:string}}) => {
    return (
        <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ left: tooltip.x - 10, top: tooltip.y }}
            className="h-8 px-2 fixed -translate-x-full bg-slate-600 rounded-lg flex items-center pointer-events-none z-30"
          >
            <p className="text-sm whitespace-nowrap">{tooltip.text}</p>
            <div
              style={{ clipPath: 'polygon(100% 50%, 0 0, 0 100%)' }}
              className="w-2 h-4 bg-slate-600 absolute top-1/2 -translate-y-1/2 translate-x-[90%] end-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    )
}