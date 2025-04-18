import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { getStore } from '@/drizzle/db/store.db';
import { AdminButton } from './_components/AdminButton';
import { Sidebar } from './_components/Sidebar';
import { getUserData } from '@/drizzle/db/users.db';

export const metadata: Metadata = {
  title: 'Admin',
};

const AdminLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const store = await getStore();
  const userData = await getUserData()
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[70px_1fr] font-roboto">
      <Sidebar />
      <header className="px-6 shadow-md bg-white flex justify-between items-center">
        <h2 className="text-xl">{store ? store.name : 'Название магазина'}</h2>
        <AdminButton userData={userData} />
      </header>
      <main className="p-4 overflow-y-auto overflow-x-hidden">{children}</main>
      <Toaster />
    </div>
  );
};

export default AdminLayout;


