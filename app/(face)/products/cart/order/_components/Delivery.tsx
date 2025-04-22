'use client';

import React, { ChangeEvent, useState, useRef, useTransition, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { IPositionByIp } from '@/types';
import { YandexMap } from './YandexMap';
import { useMounted } from '@/hooks/useMounted';
import { getCities, getDataFromYandexTrash } from '@/app/(face)/_data';
import { Loader } from 'lucide-react';
import { useOrder } from '@/hooks/useOrder';

export const Delivery = ({ userGeo }: { userGeo: IPositionByIp | null }) => {
  const [isPending, startTransition] = useTransition();
  const timeOutRef = useRef<NodeJS.Timeout>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number; width: number; height: number }>({ x: 0, y: 0, width: 0, height: 0 });
  const [cities, setCities] = useState<{ name: string; long: number; lat: number }[]>([]);
  const [selected, setSelected] = useState('');
  const { address, setAddress } = useOrder(state => state);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    setSelected(city);
    const { x, y, width, height } = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ x, y, width, height });

    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = setTimeout(() => {
      startTransition(async () => {
        const res = await getCities(city);
        setCities([]);
        if (res == null) return;

        const position = getDataFromYandexTrash(res);
        setCities(position);
      });
    }, 700);
  };

  const onSelected = ({ name, long, lat }: { name: string; long: number; lat: number }) => {
    window.map?.update({
      location: {
        center: [long, lat],
        zoom: 11,
        duration: 200,
        easing: 'ease-in-out',
      },
    });

    setSelected(name);
    setCities([]);
  };

  useEffect(() => {
    if (userGeo) {
      getCities(userGeo.city).then(res => setSelected(res?.response.GeoObjectCollection.featureMember[0].GeoObject.name || ''));
    }

    return () => {
      setAddress(null);
    };
  }, [userGeo]);

  return (
    <>
      <div className="my-4 flex flex-col md:flex-row gap-3 ">
        <div className="w-full md:w-1/2 p-2 md:order-last flex-1 aspect-[3/2]">
          <YandexMap userGeo={userGeo} />
        </div>
        <div className="w-full md:w-1/2 p-2 space-y-1 flex-1 relative">
          <h4 className="text-gray-400">Введите название города и выберите адрес на карте</h4>
          <div className="relative">
            <input
              type="text"
              id="city"
              value={selected}
              spellCheck={false}
              onChange={onInputChange}
              className="w-full h-12 px-3 text-lg focus:outline-none border border-gray-600 bg-inherit rounded"
            />
            {isPending && <Loader className="absolute bottom-1/2 translate-y-1/2 end-2 animate-spin" />}
          </div>
          {address && <h3 className="p-2 mt-2 border-l border-face-primary">{address}</h3>}
        </div>
      </div>

      <CityDropMenu menu={cities.length > 0} menuPosition={menuPosition} closeMenu={() => setCities([])}>
        {cities.map((city, inx) => (
          <button key={inx} onClick={() => onSelected(city)} className="w-full px-2 py-2 bg-gray-600 hover:bg-gray-700 text-start text-face-foreground">
            {city.name}
          </button>
        ))}
      </CityDropMenu>
    </>
  );
};

function CityDropMenu({
  children,
  closeMenu,
  menu,
  menuPosition,
}: {
  children: React.ReactNode;
  closeMenu: () => void;
  menu: boolean;
  menuPosition: { x: number; y: number; width: number; height: number };
}) {
  const { mounted } = useMounted();

  return (
    mounted &&
    createPortal(
      <AnimatePresence>
        {menu && (
          <div onClick={() => closeMenu()} className="absolute inset-0 z-50 overflow-hidden">
            <motion.div
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ ...menuPosition, y: menuPosition.y + menuPosition.height + 3 }}
              onClick={e => e.stopPropagation()}
              transition={{ opacity: { duration: 0.2 } }}
              className="bg-gray-700 rounded flex flex-col overflow-hidden"
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body,
      'city-drop'
    )
  );
}
