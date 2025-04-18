import { getStore } from '@/drizzle/db/store.db';
import Image from 'next/image';
import { getCategories } from '@/drizzle/db/categories.db';
import { HeroCategoriesSlider } from './_components/HeroCategoriesSlider';
import { NewItems } from './_components/NewItems';

const FacePage = async () => {
  const store = await getStore();
  if (store == null) return <h2>Нет магазина!</h2>;
  const categories = await getCategories();

  return (
    <>
      <section className="h-full md:h-[800px] relative grid place-content-center overflow-hidden">
        <Image src={store.bannerUrl} alt="banner" fill sizes="100vw" className="object-cover" priority />;
        <div className="absolute inset-0 bg-black/30" />
        <HeroCategoriesSlider categories={categories} />
      </section>
      <section className="container py-6 md:py-12">
        <p className="md:mb-6">Главная</p>
        <NewItems />
      </section>
    </>
  );
};

export default FacePage;
