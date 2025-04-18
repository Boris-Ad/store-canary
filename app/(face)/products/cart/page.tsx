import { PageTitle } from '../../_components/PageTitle';
import { CartCounter } from './_components/CartCounter';
import { CartList } from './_components/CartList';
import { ConfirmOrder } from './_components/ConfirmOrder';
import { BreadCrumbs } from '@/components/BreadCrumbs';

const CartPage = () => {
  return (
    <div className="py-4 container">
      <BreadCrumbs />
      <div className="relative">
        <PageTitle>Корзина</PageTitle>
        <CartCounter />
      </div>
      <div className="md:py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <CartList />
        <ConfirmOrder />
      </div>
    </div>
  );
};

export default CartPage;
