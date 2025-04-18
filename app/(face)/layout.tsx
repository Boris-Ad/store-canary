import { Metadata } from 'next';
import { Navbar } from './_components/Navbar';
import { getStore } from '@/drizzle/db/store.db';
import { FaceToast } from '@/components/FaceToast';
import { getProducts } from '@/drizzle/db/products.db';
import { SetNewItems } from './_components/SetNewItems';
import { PhoneMenu } from './_components/for-mobile/PhoneMenu';
import { getUserData } from '@/drizzle/db/users.db';
import { Suspense } from 'react';
import { getLikedProductsCount } from '@/drizzle/db/likedProducts.db';

export async function generateMetadata(): Promise<Metadata | undefined> {
  const store = await getStore();
  if (store == null) return;
  return {
    title: store.name,
    icons: {
      icon: store.logoUrl,
    },
  };
}

const Layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const products = await getProducts({ limit: 4 });
  const newProductsId = products.map(product => product.id);

  return (
    <div className="h-screen flex flex-col bg-face-background text-face-foreground font-roboto">
      <Navbar />
      <main className="flex-1 overflow-auto">{children}</main>
      <Suspense>
        <SuspendedPhoneMenuComponent />
      </Suspense>
      <FaceToast />
      <SetNewItems productsId={newProductsId} />
    </div>
  );
};

export default Layout;

async function SuspendedPhoneMenuComponent() {
  const user = await getUserData();
  const existLikes = user && (await getLikedProductsCount(user.id));
  return <PhoneMenu user={user} likesRegisteredUser={existLikes} />;
}

