'use client';

import { useNewItems } from '@/hooks/useNewItems';
import { useEffect } from 'react';

export const SetNewItems = ({ productsId }: { productsId: string[] }) => {
  const { setNewItems } = useNewItems(state => state);
  useEffect(() => {
    setNewItems(productsId);
  }, [productsId]);

  return null;
};
