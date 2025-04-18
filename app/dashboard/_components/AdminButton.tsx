'use client';

import Link from 'next/link';
import { logoutAction } from '@/app/auth/_actions/auth.actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Store, User } from 'lucide-react';
import { IUser } from '@/types';


export const AdminButton = ({ userData }: { userData: IUser | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={userData?.image ? userData.image : undefined} />
          <AvatarFallback className="text-xl font-medium bg-amber-400">{userData ? userData.name[0].toUpperCase() : <User />}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        {userData && <DropdownMenuLabel>{userData.name}</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={ async () => await logoutAction()}>
          <LogOut />
          Выход
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/">
            <Store /> Магазин
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
