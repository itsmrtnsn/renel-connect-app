import Search from '@/components/search';
import { currentUser } from '@clerk/nextjs/server';
import { Suspense } from 'react';
import Cart from './components/cart';
import ProductGrid from './components/product-grid';
import getItems from './get-items';

interface Props {
  searchParams: { searchQuery: string };
}

const PosPage = async ({ searchParams: { searchQuery } }: Props) => {
  const items = await getItems({ search: searchQuery });

  const user = await currentUser();
  const userName = user?.fullName || user?.username;

  return (
    <div>
      <div className='grid grid-cols-[1fr_auto]   gap-6'>
        <div className='space-y-6  rounded-lg h-full p-4 border-[0.1px] shadow-sm'>
          <Suspense fallback=''>
            <Search />
          </Suspense>
          <ProductGrid products={items} />
        </div>
        <div className='space-y-6 w-[20rem] h-[87vh]  rounded-lg  p-4 border-[0.1px] shadow-sm'>
          <Cart cashier={userName!} />
        </div>
      </div>
    </div>
  );
};

export default PosPage;
