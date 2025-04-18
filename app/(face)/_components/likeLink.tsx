'use client';

import { useLike } from '@/hooks/useLike';
import { IUser } from '@/types';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export const LikeLink = ({ likesRegisteredUser, user }: { likesRegisteredUser: number | null, user : IUser | null }) => {
  const { likedProducts } = useLike(state => state);

  const component = (
    <Link href={'/products/likes'}>
      <Heart size={24} className="text-red-500 hover:scale-110 transition-all" />
    </Link>
  );

  const existLikes = likedProducts.length > 0;
  const existLikesRegisteredUser = likesRegisteredUser ? likesRegisteredUser > 0 : false;

  if (user) {
    return existLikesRegisteredUser ? component : null;
  } else if (existLikes) {
    return component;
  } else {
    return null;
  }
};
