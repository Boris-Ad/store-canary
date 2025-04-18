'use client';

import { ProductWithImages } from '@/types';
import { useEffect, useState } from 'react';
import { LikedProductsList } from './LikedProductsList';
import { useLike } from '@/hooks/useLike';
import { getLikedProductsAction } from '@/app/(face)/_actions/likeProduct.actions';
import { SelectedLikedProduct } from './SelectedLikedProduct';


export const LikedProducts = ({
  selectedLikedProductId,
  registeredUserLikedProducts,
}: {
  selectedLikedProductId?: string;
  registeredUserLikedProducts: ProductWithImages[] | null;
}) => {
  const { likedProducts } = useLike(state => state);
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithImages>();

  const selectedProductValue = async (likedProducts: string[]) => {
    const products = await getLikedProductsAction(likedProducts);
    const selectedProduct = products.find(p => p.id === selectedLikedProductId);
    setProducts(products);
    setSelectedProduct(selectedProduct ? selectedProduct : products[0]);
  };

  useEffect(() => {
    if (registeredUserLikedProducts) {
      const selectedProduct = registeredUserLikedProducts.find(p => p.id === selectedLikedProductId);
      setProducts(registeredUserLikedProducts);
      setSelectedProduct(selectedProduct ? selectedProduct : registeredUserLikedProducts[0]);
    } else {
      selectedProductValue(likedProducts);
    }
  }, [registeredUserLikedProducts, selectedLikedProductId]);

  if(products.length == 0){
    return <h3>Здесь ничего нет!</h3>
  }

  return (
    <>
      <section className="w-full space-y-6">
        <LikedProductsList products={products} selectedLikedProductId={selectedLikedProductId} />
        <SelectedLikedProduct product={selectedProduct} />
      </section>
    </>
  );
};
