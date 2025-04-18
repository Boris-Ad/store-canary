'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { phoneLinks } from '../../_data';
import { useLike } from '@/hooks/useLike';
import { IUser } from '@/types';
import { useCart } from '@/hooks/useCart';

export const PhoneMenu = ({ user, likesRegisteredUser }: { user: IUser | null; likesRegisteredUser: number | null }) => {
  const path = usePathname();
  const { likedProducts } = useLike(state => state);
  const { products } = useCart(state => state);

  const onRedLikeIcon = (href: string) => {
    if (href !== '/products/likes') return false;
    const existLikes = likedProducts.length > 0;
    const existLikesRegisteredUser = likesRegisteredUser ? likesRegisteredUser > 0 : false;
    if (user) {
      return existLikesRegisteredUser ? true : false;
    } else if (existLikes) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section className="w-full h-16 bg-slate-800 grid grid-cols-4 place-items-center text-sm text-slate-400 md:hidden shadow-[0px_-3px_7px_0px_rgba(24,34,41,0.63)]">
      {phoneLinks.map(link => (
        <Link key={link.id} href={link.href} className={clsx('flex flex-col space-y-1 items-center relative', { 'text-slate-100': path === link.href })}>
          {link.href === '/products/cart' && Object.keys(products).length > 0 && <div className="w-2 h-2 rounded-full bg-red-500 absolute top-1 end-5" />}
          <link.icon size={18} className={clsx({ 'text-red-500': onRedLikeIcon(link.href) })} />
          <span>{link.title}</span>
        </Link>
      ))}
    </section>
  );
};
