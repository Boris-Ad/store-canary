import { AdminPagesTitle } from '../_components/AdminPagesTitle';
import { getStore } from '@/drizzle/db/store.db';
import { StoreForm } from '../_components/forms/StoreForm';

const StoreEditPage = async () => {
  const store = await getStore();
  return (
    <>
      <AdminPagesTitle>{store ? 'Редактирование магазина' : 'Создание магазина'}</AdminPagesTitle>
      <StoreForm store={store} />
    </>
  );
};

export default StoreEditPage;
