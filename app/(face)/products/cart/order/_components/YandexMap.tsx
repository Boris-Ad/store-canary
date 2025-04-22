'use client';

import type { LngLat, YMapLocationRequest } from 'ymaps3';
import { useMapReactify } from '@/hooks/useMapReactify';
import { MapMarker } from './MapMarker';

export const YandexMap = () => {
  const center: LngLat = [37.588144, 55.733842];

  const reactify = useMapReactify();

  if (reactify == null) return null;
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = reactify.module(ymaps3);

  return (
    <YMap
      location={reactify.useDefault<YMapLocationRequest>({ center, zoom: 11 })}
      ref={x => {
        window.map = x;
      }}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <MapMarker reactify={reactify} />
    </YMap>
  );
};
