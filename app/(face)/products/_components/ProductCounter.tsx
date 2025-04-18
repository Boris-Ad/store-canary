'use client';

import { numWord } from '@/lib/utils';

export const ProductCounter = ({ productsCount }: { productsCount: number }) => {
  const word = numWord(productsCount, ['продукт', 'продукта', 'продуктов']);
  return (
    <h4 className="absolute top-0 start-28 md:start-40 text-sm md:text-base">
      <span className="text-base md:text-lg">{productsCount}</span> {word}
    </h4>
  );
};
