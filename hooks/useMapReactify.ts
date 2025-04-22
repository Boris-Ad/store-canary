import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Reactify } from '@yandex/ymaps3-types/reactify';

export const useMapReactify = () => {
  const [reactify, setReactify] = useState<Reactify | null>(null);

  const getReactify = async () => {
    const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);
    setReactify(ymaps3React.reactify.bindTo(React, ReactDOM));
  };

  useEffect(() => {
    getReactify();
  }, []);

  return reactify;
};
