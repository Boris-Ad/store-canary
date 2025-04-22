import { z } from 'zod';
import { env } from '@/services/env/client';
import { IGeoResponse } from '@/types/geoResponse';
import { Home, List, Heart, ShoppingCart } from 'lucide-react';
import { IPositionByIp } from '@/types';

const cityNameSchema = z.string().trim().min(2);

export const accordionProductData = [
  {
    id: 1,
    title: 'Описание:',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At libero alias totam obcaecati deserunt architecto magni quod qui eligendi, eveniet cumque, quae rem est maxime perferendis pariatur hic molestias eaque consequuntur a! Cum incidunt amet possimus, quos unde distinctio veritatis voluptate magni impedit dolor nihil error sit quidem odit fugiat.',
  },
  {
    id: 2,
    title: 'Характеристики:',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At libero alias totam obcaecati deserunt architecto magni quod qui eligendi, eveniet cumque, quae rem est maxime perferendis pariatur hic molestias eaque consequuntur a! Cum incidunt amet possimus, quos unde distinctio veritatis voluptate magni impedit dolor nihil error sit quidem odit fugiat.',
  },
];

export const phoneLinks = [
  { id: 1, href: '/', title: 'Главная', icon: Home },
  { id: 2, href: '/products', title: 'Каталог', icon: List },
  { id: 3, href: '/products/likes', title: 'Избранное', icon: Heart },
  { id: 4, href: '/products/cart', title: 'Корзина', icon: ShoppingCart },
];

export const getCities = async (cityName: string): Promise<IGeoResponse | null> => {
  const validatedCityName = cityNameSchema.safeParse(cityName);
  if (validatedCityName.success === false) {
    return null;
  }
  const city = validatedCityName.data;

  const res = await fetch(`https://geocode-maps.yandex.ru/v1/?apikey=${env.NEXT_PUBLIC_YANDEX_MAP_API}&lang=ru_RU&geocode=${city}&results=3&format=json`);
  if (!res.ok) return null;
  return res.json();
};

export const getDataFromYandexTrash = ({ response }: IGeoResponse) => {
  const geoPosition: { name: string; long: number; lat: number }[] = [];

  for (const { GeoObject } of response.GeoObjectCollection.featureMember) {
    if (GeoObject.metaDataProperty.GeocoderMetaData.Address.country_code !== 'RU') {
      break;
    }
    const components = GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;
    const locality = components.find(item => item.kind === 'locality');
    const [long, lat] = GeoObject.Point.pos.split(' ');
    if (locality) {
      const position = { name: locality.name, long: parseFloat(long) || 0, lat: parseFloat(lat) || 0 };
      geoPosition.push(position);
    }
    const moscow = components.find(item => item.name === 'Москва');
    if (moscow) {
      const position = { name: moscow.name, long: parseFloat(long) || 0, lat: parseFloat(lat) || 0 };
      geoPosition.push(position);
    }
  }
  return geoPosition;
};

export const getGeocoderResponse = async (long: number, lat: number): Promise<IGeoResponse | null> => {
  const res = await fetch(`https://geocode-maps.yandex.ru/v1/?apikey=${env.NEXT_PUBLIC_YANDEX_MAP_API}&geocode=${long},${lat}&results=1&format=json`);
  if (!res.ok) return null;
  return res.json();
};

export const getIp = async (): Promise<string | null> => {
  const res = await fetch('https://api.ipify.org');
  if (!res.ok) return null;
  return res.text();
};

export const getPositionByIp = async (ip: string): Promise<IPositionByIp | null> => {
  const res = await fetch('http://ip-api.com/json/' + ip);
  if (!res.ok) return null;
  return res.json();
};
