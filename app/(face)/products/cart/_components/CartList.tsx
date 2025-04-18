'use client';

import { useCart } from '@/hooks/useCart';
import { CartCard } from './CartCard';

export const CartList = () => {
  const { products } = useCart(state => state);
  const productsArr = Object.values(products);

  return (
    <div className="md:col-span-3">
      {productsArr.map(product => (
        <CartCard key={product.id} product={product} />
      ))}
    </div>
  );
};
