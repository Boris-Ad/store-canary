'use client';

import { useCart } from '@/hooks/useCart';
import { useMyToast } from '@/hooks/useMyToast';
import { formatCurrency } from '@/lib/utils';
import { ICartProduct } from '@/types';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export const CartCard = ({ product }: { product: ICartProduct }) => {
  const { addProduct, removeProduct } = useCart(state => state);
  const { setAction } = useMyToast(state => state);

  const onMinusProduct = () => {
    addProduct(product.id, { ...product, order: product.order > 1 ? product.order - 1 : product.order });
  };

  const onPlusProduct = () => {
    if (product.order < product.number) {
      addProduct(product.id, { ...product, order: product.order + 1 });
    } else {
      setAction('face', 'Сейчас больше нет!', 'warning');
    }
  };

  return (
    <div className="pt-3 flex border-b border-slate-600">
      <Image src={product.img} alt={product.name} width={160} height={160} priority className="w-[120px] md:w-[160px] h-[120px] md:h-[160px] aspect-square" />
      <div className="hidden flex-1 md:grid grid-cols-[repeat(4,1fr)_50px]">
        <h2 className="line-clamp-2 text-center">{product.name}</h2>
        <div className="justify-self-center">
          <p className="text-lg">{formatCurrency(product.price)}</p>
          <p className="text-sm text-face-muted">Цена за 1 шт.</p>
        </div>
        <div className="h-8 px-4 flex justify-between items-center bg-slate-700 rounded-full">
          <button onClick={onMinusProduct} className="text-slate-300 hover:text-white">
            <Minus size={18} />
          </button>
          <span>{product.order}</span>
          <button onClick={onPlusProduct} className="text-slate-300 hover:text-white">
            <Plus size={18} />
          </button>
        </div>
        <p className="text-lg text-center">{formatCurrency(product.order * product.price)}</p>
        <div className="justify-self-center">
          <button onClick={() => removeProduct(product.id)}>
            <Trash2 className="text-face-muted" />
          </button>
        </div>
      </div>

      <div className="md:hidden w-full pb-3 flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="line-clamp-2">{product.name}</h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="h-7 px-2 flex justify-between items-center space-x-4 bg-slate-700 rounded-full">
            <button onClick={onMinusProduct} className="text-slate-300 hover:text-white">
              <Minus size={18} />
            </button>
            <span className="text-sm">{product.order}</span>
            <button onClick={onPlusProduct} className="text-slate-300 hover:text-white">
              <Plus size={18} />
            </button>
          </div>
          <p className="">{formatCurrency(product.order * product.price)}</p>
          <button onClick={() => removeProduct(product.id)} className="w-6 h-6 ml-auto">
            <Trash2 size={18} className="text-face-muted" />
          </button>
        </div>
      </div>
    </div>
  );
};


