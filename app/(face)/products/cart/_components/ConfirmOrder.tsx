'use client';

import { useCart } from '@/hooks/useCart';
import { formatCurrency, numWord, productsPrice } from '@/lib/utils';

export const ConfirmOrder = () => {
  const { products } = useCart(state => state);
  const number = Object.keys(products).length;

  if (number == 0) return null;

  const word = numWord(number, ['продукт', 'продукта', 'продуктов']);
  const sum = productsPrice(products);

  return (
    <div className="h-fit max-h-[300px] p-4 bg-slate-700 space-y-3 shadow">
      <div className="flex justify-between items-center">
        <p className="text-sm text-face-muted">
          {number} {word} на сумму:
        </p>
        <p>{formatCurrency(sum)}</p>
      </div>
      <div className="border-t border-slate-600" />
      <h2 className="text-xl">Итого:</h2>
      <h2 className="text-xl">{formatCurrency(sum)}</h2>
      <div className="pt-3">
        <button className="w-full h-10 bg-face-primary rounded-full">Оформить заказ</button>
      </div>
    </div>
  );
};
