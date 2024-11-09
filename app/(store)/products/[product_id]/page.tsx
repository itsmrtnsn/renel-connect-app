import BackButton from '@/components/back-button';
import { DateRangePicker } from '@/components/data-range-picker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getProductById } from '../../_actions/get-product-report-by-id';
import ProductDetailSummaryCard from './product-detail-summary-card';

interface Props {
  params: { product_id: string };
}

const ProductDetailPage = async ({ params: { product_id } }: Props) => {
  const response = await getProductById(product_id);

  if (!response.success) return <p>Product not found.</p>;
  return (
    <div className='flex flex-col p-8'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <BackButton />
          <h1 className='text-3xl font-bold'>{response.product?.name}</h1>
        </div>
        <DateRangePicker />
      </div>

      <ScrollArea className='h-[75vh] overflow-hidden mt-6'>
        <div className='space-y-10'>
          <ProductDetailSummaryCard product_id={product_id} />
          {/* <ProductAnaliticsChart /> */}
          {/* <ProductSalesOverview /> */}
          <div className='flex justify-end'></div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductDetailPage;
