'use client';

import { useCartStore } from '@/app/hooks/use-cart-store';
import { useDiscount } from '@/app/hooks/use-discount';
import { useEffect, useState } from 'react';
import CartItem from './cart-item';
import { CheckoutDialog } from './checkout-modal';
import DiscountModal from './discount-modal';

interface Props {
  cashier: string;
}

const Cart = ({ cashier }: Props) => {
  const { items, getTotal, getTotalItems } = useCartStore();
  const { calculateDiscount } = useDiscount();
  const [isClient, setIsClient] = useState(false);
  const [totals, setTotals] = useState({
    subtotal: 0,
    discount: 0,
    totalCost: 0,
    itemCount: 0,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const subtotal = getTotal();
    const discountAmount = calculateDiscount(subtotal);
    setTotals({
      subtotal,
      discount: discountAmount,
      totalCost: subtotal - discountAmount,
      itemCount: getTotalItems(),
    });
  }, [items, getTotal, calculateDiscount, getTotalItems]);

  if (!isClient) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow overflow-auto'>
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>
      <div className='space-y-4 pb-2'>
        <DiscountModal />
        <div className='flex justify-between text-muted-foreground text-sm font-semibold'>
          <span>Sous-total ({totals.itemCount} items)</span>
          <span>{totals.subtotal.toFixed(0)} G</span>
        </div>
        <div className='flex justify-between text-sm font-semibold text-green-600'>
          <span>Rabais</span>
          <span>
            {totals.discount > 0 ? `-${totals.discount.toFixed(2)}` : '0'} G
          </span>
        </div>
        <div className='flex justify-between text-base font-bold text-blue-500'>
          <span>Total</span>
          <span>{totals.totalCost.toFixed(0)} G</span>
        </div>

        <div className='mt-5'>
          <CheckoutDialog disabled={items.length === 0} cashier={cashier} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
