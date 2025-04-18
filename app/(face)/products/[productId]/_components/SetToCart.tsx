'use client';

import { useCart } from '@/hooks/useCart';
import { useMyToast } from '@/hooks/useMyToast';
import { ProductWithImages } from '@/types';

export const SetToCart = ({ product }: { product: ProductWithImages }) => {
  const { addProduct } = useCart(state => state);
  const { setAction } = useMyToast(state => state);

  const onAddProduct = () => {
    addProduct(product.id, { id: product.id, name: product.name, price: product.price, number: product.number, img: product.images[0].url, order: 1 });
    setAction('face', `${product.name} добавлен в корзину.`, 'success');
  };

  return (
    <div className="py-4">
      <button onClick={onAddProduct} className="w-full h-10 bg-face-primary hover:bg-face-primary/80 rounded-full">
        В корзину
      </button>
    </div>
  );
};
