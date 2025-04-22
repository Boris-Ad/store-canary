import { PageTitle } from '@/app/(face)/_components/PageTitle';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Suspense } from 'react';
import { getIp, getPositionByIp } from '@/server/data';
import { ProductsList } from './_components/ProductsList';
import { ItemTitle } from './_components/ItemTitle';
import { ConfirmPurchase } from './_components/ConfirmPurchase';
import { Delivery } from './_components/Delivery';

const OrderPage = async () => {
  return (
    <>
      <div className="py-4 container">
        <BreadCrumbs />
        <PageTitle>Оформление заказа</PageTitle>
        <section className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div>
              <ItemTitle number={1} title="Заказ" />
              <ProductsList />
            </div>
            <div>
              <ItemTitle number={2} title="Доставка" />
              <Suspense>
                <SuspendedMapComponent />
              </Suspense>
            </div>
            <div>
            <ItemTitle number={3} title="Данные получателя" />
            <div className='h-28'></div>
            </div>
          </div>
          <div className="w-full md:w-64 lg:w-80 h-fit p-3 flex-initial bg-gray-700">
            <ConfirmPurchase />
          </div>
        </section>
      </div>
    </>
  );
};

export default OrderPage;

async function SuspendedMapComponent() {
  const userIp = await getIp();
  const userGeo = userIp ? await getPositionByIp(userIp) : null;
  return <Delivery userGeo={userGeo} />;
}
