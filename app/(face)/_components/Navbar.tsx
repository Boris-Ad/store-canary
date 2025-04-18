import Image from 'next/image';
import { getStore } from '@/drizzle/db/store.db';
import { UserButton } from './UserButton';
import { getLikedProductsCount } from '@/drizzle/db/likedProducts.db';
import { getUserData } from '@/drizzle/db/users.db';
import { LikeLink } from './likeLink';
import { CartLink } from './CartLink';

export const Navbar = async () => {
  const [store, userData] = await Promise.all([getStore(), getUserData()]);
  const existLikes = userData && (await getLikedProductsCount(userData.id));

  return (
    <header className="h-14 lg:h-20 shadow-md">
      <div className="h-full container flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          {store ? (
            <div className="flex items-center space-x-4">
              <Image src={store.logoUrl} alt="Logo" width={40} height={40} className="w-8 lg:w-10 h-8 lg:h-10" />
              <h3 className="text-lg lg:text-xl font-montserrat">{store.name}</h3>
            </div>
          ) : (
            <h3>Logo</h3>
          )}
        </div>
        <div className="flex items-center gap-x-9">
          <div className="hidden lg:flex items-center space-x-4">
            <LikeLink likesRegisteredUser={existLikes} user={userData} />
            <CartLink />
          </div>
          <UserButton userData={userData} />
        </div>
      </div>
    </header>
  );
};
