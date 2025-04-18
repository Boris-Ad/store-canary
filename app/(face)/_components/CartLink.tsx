'use client';

import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export const CartLink = () => {
  const { products } = useCart(state => state);
  const number = Object.keys(products).length;
  return (
    <Link href="/products/cart" className="relative hover:scale-110 transition-transform">
      {number > 0 && <div className="w-3 h-3 absolute bottom-1/2 end-0 bg-red-500 rounded-full" />}
      <ShoppingCart />
    </Link>
  );
};
