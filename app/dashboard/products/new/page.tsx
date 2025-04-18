import { getCategories } from '@/drizzle/db/categories.db';
import { AdminPagesTitle } from '../../_components/AdminPagesTitle';
import { Categories } from '../_components/Categories';
import { CreateProduct } from './_components/CreateProduct';

const NewProductPage = async () => {
  const categories = await getCategories();
  return (
    <>
      <AdminPagesTitle>Добавить продукт</AdminPagesTitle>
      <section className="max-w-[1200px]">
        <div className="space-y-6">
          <h3 className="text-xl">Выбрать категорию</h3>
          <Categories categories={categories} />
        </div>
        <CreateProduct />
      </section>
    </>
  );
};

export default NewProductPage;
