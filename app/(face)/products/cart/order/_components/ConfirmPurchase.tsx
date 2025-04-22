'use client';

import { useCart } from '@/hooks/useCart';
import { formatCurrency, numWord } from '@/lib/utils';

export const ConfirmPurchase = () => {
  const { products } = useCart(state => state);
  const productsValues = Object.values(products);
  const sum = productsValues.reduce((sum, product) => sum + product.price, 0);
  const word = numWord(productsValues.length, ['продукт', 'продукта', 'продуктов']);
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sm">
          {productsValues.length} {word} на сумму:
        </p>
        <span>{formatCurrency(sum)}</span>
      </div>
      <h3 className='mt-2 text-lg'>Итого:</h3>
      <p className='mt-2 text-lg text-green-400'>{formatCurrency(sum)}</p>
      <button className='w-full h-10 mt-4 rounded-full bg-face-primary hover:bg-face-primary/70'>Оформить заказ</button>
    </>
  );
};
