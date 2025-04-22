'use client';

import { useState } from 'react';
import { DomEventHandlerObject, YMapFeature, LngLat } from '@yandex/ymaps3-types';
import { Reactify } from '@yandex/ymaps3-types/reactify';
import { Check } from 'lucide-react';
import { getGeocoderResponse } from '@/app/(face)/_data';
import { useOrder } from '@/hooks/useOrder';

export const MapMarker = ({ reactify }: { reactify: Reactify }) => {
  const { YMapListener, YMapMarker } = reactify.module(ymaps3);
  const [markerCoord, setMarkerCoord] = useState<LngLat>();
  const { setAddress } = useOrder(state => state);

  const onGetData = async (event: DomEventHandlerObject) => {
    if (event) {
      const entity = event.entity as YMapFeature;
      const long = Number(entity.geometry.coordinates[0]);
      const lat = Number(entity.geometry.coordinates[1]);
      setMarkerCoord([long, lat]);
      const res = await getGeocoderResponse(long, lat);
      if (res) {
        const feature = res.response.GeoObjectCollection.featureMember[0];
        const address = feature.GeoObject.metaDataProperty.GeocoderMetaData.text;
        setAddress(address);
      }
    }
  };
  return (
    <>
      <YMapListener onClick={onGetData} />
      {markerCoord && (
        <YMapMarker coordinates={markerCoord}>
          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center relative -translate-x-1/2 -translate-y-[120%]">
            <Check size={16} />
            <div
              className="w-3 h-2.5 absolute bottom-1 start-1/2 translate-y-full -translate-x-1/2 bg-inherit"
              style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
            />
          </div>
        </YMapMarker>
      )}
    </>
  );
};