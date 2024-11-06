'use client';

import { useCartStore } from '@/app/hooks/use-cart-store';
import { useDiscount } from '@/app/hooks/use-discount';
import { useEffect, useState } from 'react';
import DiscountModal from './discount-modal';
import CartItem from './cart-item';
import { CheckoutDialog } from './checkout-modal';

interface Props {
  cashier: string;
}

const Cart = ({ cashier }: Props) => {
  const { items, getTotal } = useCartStore();
  const { calculateDiscount } = useDiscount();
  const discount = calculateDiscount(getTotal());

  const totalCost = getTotal() - discount;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow overflow-auto'>
        {items.map((item) => (
          <div key={item.product.id} className='mb-4'>
            <CartItem item={item} />
          </div>
        ))}
      </div>
      <div className='space-y-4  pb-2'>
        <DiscountModal />
        <div className='flex justify-between text-muted-foreground text-sm font-semibold'>
          <span>Sous-total</span>
          <span>{isClient ? getTotal() : '0.00'} G</span>
        </div>
        <div className='flex justify-between text-sm font-semibold text-green-600'>
          <span>Rabais</span>
          <span>{discount > 0 ? `-${discount}` : discount} G</span>
        </div>
        <div className='flex justify-between text-base font-bold text-blue-500'>
          <span>Total</span>
          <span>{isClient ? totalCost.toFixed(1) : '0.00'} G</span>
        </div>

        <div className='mt-5'>
          <CheckoutDialog disabled={items.length === 0} cashier={cashier} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
