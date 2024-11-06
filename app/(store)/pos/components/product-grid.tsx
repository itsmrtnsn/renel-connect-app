import { Fragment } from 'react';
import { Items } from '../get-items';
import ProductCard from './product-card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
  products: Items[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <ScrollArea className='h-[70vh]'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {products.map((product) => (
          <Fragment key={product.id}>
            <ProductCard product={product} />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProductGrid;
