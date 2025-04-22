'use client';

import type { LngLat, YMapLocationRequest } from 'ymaps3';
import { IPositionByIp } from '@/types';
import { useMapReactify } from '@/hooks/useMapReactify';
import { MapMarker } from './MapMarker';

export const YandexMap = ({ userGeo }: { userGeo: IPositionByIp | null }) => {
  const center: LngLat = userGeo ? [userGeo.lon, userGeo.lat] : [37.588144, 55.733842];

  const reactify = useMapReactify();

  if (reactify == null) return null;
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = reactify.module(ymaps3);

  return (
    <YMap
      location={reactify.useDefault<YMapLocationRequest>({ center, zoom: 12 })}
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
