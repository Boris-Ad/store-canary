'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

export const ProductsList = () => {
  const { products } = useCart(state => state);
  const productsValues = Object.values(products);

  return (
    <>
      <table className="hidden md:table w-full my-4 table-auto">
        <thead>
          <tr className="text-gray-400 text-base font-normal">
            <th>Наименование</th>
            <th>Количество</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {productsValues.map(product => (
            <tr key={product.id} className="">
              <td className="py-3">
                <div className="flex gap-3">
                  <Image src={product.img} alt={product.name} width={120} height={120} className="aspect-square bg-gray-700" />
                  <p>{product.name}</p>
                </div>
              </td>
              <td>{product.order} шт.</td>
              <td>{formatCurrency(product.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="md:hidden flex flex-col">
        {productsValues.map(product => (
          <div key={product.id} className="py-1 first:pt-4 last:pb-4 grid grid-cols-[40%_1fr] gap-3">
            <Image src={product.img} alt={product.name} width={200} height={200} className="aspect-square bg-gray-700" />
            <div className="space-y-2">
              <h2 className="line-clamp-1">{product.name}</h2>
              <p className="text-sm text-gray-400">
                Количество: <span className="text-face-foreground">{product.order}</span> шт.
              </p>
              <p className="text-sm text-gray-400">
                Сумма: <span className="text-face-foreground">{formatCurrency(product.price)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
