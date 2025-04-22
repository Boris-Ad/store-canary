'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

export const BreadCrumbs = ({ dynamicProduct }: { dynamicProduct?: { id: string; name: string } }) => {
  const path = usePathname();
  const pages = path.split('/');

  const links = [{ href: '/', title: 'Главная' }];

  function getReplace(path: string) {
    const linkNames: { [key: string]: string } = {
      products: 'Каталог',
      cart: 'Корзина',
      likes:'Избранное',
      order:'Оформление заказа'
    };

    if (dynamicProduct) {
      linkNames[dynamicProduct.id] = dynamicProduct.name;
    }
    return linkNames[path];
  }

  for (const page of pages) {
    if (page) {
      const regexp = new RegExp(`.+${page}`);
      const href = path.match(regexp)?.toString();
      if (href == null) return;

      links.push({
        href,
        title: page.replace(page, getReplace(page)),
      });
    }
  }

  return (
    <div className="flex md:gap-1 overflow-hidden">
      {links.map((link, inx) => (
        <Link href={link.href} key={link.title} className={clsx('flex items-center md:space-x-1 hover:underline text-nowrap', { 'text-slate-500': inx == links.length - 1 })}>
          <span className='text-sm md:text-base'>{link.title}</span>
          <ChevronRight size={18} className={clsx({ hidden: inx == links.length - 1 })} />
        </Link>
      ))}
    </div>
  );
};
