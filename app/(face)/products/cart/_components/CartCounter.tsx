'use client';

import { useCart } from '@/hooks/useCart';
import { numWord } from '@/lib/utils';

export const CartCounter = () => {
  const { products } = useCart(state => state);
  const number = Object.keys(products).length
  const word = numWord(number, ['продукт', 'продукта', 'продуктов']);
 
  return (
    <h4 className="absolute top-0 start-[120px] md:start-44 text-sm md:text-base">
      <span className="text-lg">{number}</span>{' '}
      {word}
    </h4>
  );
};
