'use server'

import { unstable_cacheLife as cacheLife } from 'next/cache';

import { IPositionByIp } from "@/types";

export const getIp = async (): Promise<string | null> => {
    'use cache';
    cacheLife('days');
    const res = await fetch('https://api.ipify.org');
    if (!res.ok) return null;
    return res.text();
  };
  
  export const getPositionByIp = async (ip: string): Promise<IPositionByIp | null> => {
    'use cache';
    cacheLife('days');
    const res = await fetch('http://ip-api.com/json/' + ip);
    if (!res.ok) return null;
    return res.json();
  };