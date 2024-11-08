import Search from '@/components/search';
import { currentUser } from '@clerk/nextjs/server';
import { Suspense } from 'react';
import Cart from './components/cart';
import ProductGrid from './components/product-grid';
import ProductLoading from './components/product-loading';
import Refresh from './components/refresh';
import getItems from './get-items';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface ProductSectionProps {
  searchQuery: string;
}

const ProductSection = async ({ searchQuery }: ProductSectionProps) => {
  const items = await getItems({ search: searchQuery, pageSize: 25 });
  return <ProductGrid products={items} />;
};

const PosPage = async ({ searchParams }: Props) => {
  const user = await currentUser();
  const userName = user?.fullName || user?.username || 'Unknown';

  const searchQuery =
    typeof searchParams.searchQuery === 'string'
      ? searchParams.searchQuery
      : '';

  return (
    <div className='container mx-auto '>
      <div className='grid grid-cols-[1fr_auto] gap-6'>
        <div className='space-y-6 rounded-lg h-full p-4 border shadow-sm bg-slate-50'>
          <div className='flex items-center gap-2'>
            <div className='flex-1'>
              <Suspense fallback={<div>Loading search...</div>}>
                <Search />
              </Suspense>
            </div>
            <div>
              <Refresh />
            </div>
          </div>
          <Suspense fallback={<ProductLoading />}>
            <ProductSection searchQuery={searchQuery} />
          </Suspense>
        </div>
        <div className='space-y-6 w-[20rem] h-[87vh] rounded-lg p-4 border shadow-sm'>
          <Cart cashier={userName} />
        </div>
      </div>
    </div>
  );
};

export default PosPage;
