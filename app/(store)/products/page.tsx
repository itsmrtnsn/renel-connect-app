import CurrentPath from '@/components/current-path';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense } from 'react';
import AddNewProductButton from './components/add-new-product-button';
import EmptyProducttable from './components/empty-product-table';
import ExportProductButton from './components/export-data-button';
import inventoryProducts from './components/inventory-products';
import InventoryProductsTable from './components/inventory-products-table';
import ProductsSummaryCardGrid from './components/product-summary-card-grid';
import ProductSummaryLoading from './components/product-summary-loading';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductsPage = async ({ searchParams }: Props) => {
  const page = searchParams.page
    ? parseInt(searchParams.page as string, 10)
    : 1;
  const searchQuery = (searchParams.searchQuery as string) || '';
  const itemsPerPage = 10;

  const { pagination, data } = await inventoryProducts({
    pageSize: itemsPerPage,
    page,
    search: searchQuery,
  });

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <Suspense fallback={<div>Loading path...</div>}>
          <CurrentPath />
        </Suspense>
        {/* <DateRangeCard /> */}
      </div>
      <Suspense fallback={<ProductSummaryLoading />}>
        <ProductsSummaryCardGrid />
      </Suspense>
      <Card className='shadow-none flex-1 overflow-hidden border-[0.1px]'>
        <CardHeader>
          <div className='flex items-center gap-2 justify-between'>
            <div className='flex items-center gap-4'>
              <Suspense fallback={<div>Loading search...</div>}>
                <Search />
              </Suspense>
              {/* <Suspense fallback={<div>Loading categories...</div>}>
                <ProductCategoryFilter />
              </Suspense> */}
            </div>
            <div className='items-center gap-4 flex'>
              <AddNewProductButton />
              <ExportProductButton />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {data.length >= 1 ? (
            <ScrollArea className='h-[20rem]'>
              <InventoryProductsTable products={data} />
              <div className='mt-2 flex items-center h-8'>
                <Pagination
                  totalPages={pagination.totalPages}
                  currentPage={pagination.currentPage}
                  itemsPerPage={pagination.pageSize}
                />
              </div>
            </ScrollArea>
          ) : (
            <EmptyProducttable />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;
