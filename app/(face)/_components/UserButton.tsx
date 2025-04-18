'use client';

import React, { useState, useRef, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Loader, LogOut, ShieldUser, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonDropMenu } from '@/components/ButtonDropMenu';
import { Separator } from '@/components/ui/separator';
import { logoutAction } from '@/app/auth/_actions/auth.actions';
import { IUser } from '@/types';
import { useCart } from '@/hooks/useCart';

export const UserButton = ({ userData }: { userData: IUser | null }) => {
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);
  const { removeAllProducts } = useCart(state => state);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const userName = userData && userData.name[0].toUpperCase();
  const userImage = userData && userData.image;
  const adminRole = userData && userData.role === 'admin';

  const logout = () => {
    startTransition(() => {
      logoutAction();
    });
    clearCart();
    setIsVisible(false);
  };

  function clearCart() {
    removeAllProducts();
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsVisible(true)}
        className={cn(
          'h-8 lg:h-9 w-8 lg:w-9 grid place-content-center rounded-full border border-face-border text-face-border hover:border-slate-500 hover:text-slate-500 transition-colors cursor-pointer relative overflow-hidden',
          { 'bg-fuchsia-500 border-none': userData }
        )}
      >
        {userImage == null ? (
          <span className="text-white">{userName}</span>
        ) : (
          <Image src={userImage} alt="UserImage" fill sizes="36px" className="object-cover" />
        )}
        {userData == null && <User size={22} />}
      </button>
      {buttonRef.current && (
        <ButtonDropMenu isVisible={isVisible} removeMenu={() => setIsVisible(false)} buttonRef={buttonRef.current}>
          <ul className="text-slate-100 bg-slate-700 font-roboto font-light">
            {userData ? (
              <>
                <li className="px-2 pt-2 pb-1">{userData.name}</li>
                <Separator className="bg-slate-600" />
                {adminRole && (
                  <li className="px-2 py-1 hover:bg-slate-600 hidden xl:block">
                    <Link href="/dashboard" className="flex items-center space-x-1">
                      <ShieldUser size={18} />
                      <span>Админка</span>
                    </Link>
                  </li>
                )}
                <li className="p-2 pt-1 hover:bg-slate-600">
                  <button disabled={isPending} onClick={logout} className="w-full flex items-center space-x-1">
                    <LogOut size={16} />
                    {isPending ? <Loader className="animate-spin" /> : <span>Выход</span>}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="p-2 pb-1 hover:bg-slate-600">
                  <button
                    onClick={() => {
                      signIn();
                      clearCart();
                    }}
                    className="w-full flex"
                  >
                    Вход
                  </button>
                </li>
                <li className="p-2 pt-1 hover:bg-slate-600">
                  <button onClick={clearCart}>
                    <Link href="/auth/register" className="flex">
                      Регистрация
                    </Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </ButtonDropMenu>
      )}
    </>
  );
};
