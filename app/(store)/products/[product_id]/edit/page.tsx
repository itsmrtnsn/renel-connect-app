import getProductById from '@/app/(store)/_actions/get-product-by-id';
import BackButton from '@/components/back-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense } from 'react';
import EditInventoryProductForm from './edit-inventory-product-form';

interface Props {
  params: { product_id: string };
}

const EditProductPage = async ({ params }: Props) => {
  const { product_id } = await params;

  const { success, data: product } = await getProductById(product_id);

  const productType = product?.type;

  if (!success) {
    return (
      <div>
        <Card className='border shadow-none'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <BackButton />
              <CardTitle className='text-3xl font-bold'>
                Produit non trouvé
              </CardTitle>
            </div>
            <CardDescription>
              Le produit que vous recherchez n&apos;a pas été trouvé
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card className='border shadow-none'>
        <div className='flex items-center justify-between mr-'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>
              <div className='flex items-center gap-2'>
                <BackButton />
                <span> Modifier l&apos;article</span>
              </div>
            </CardTitle>
            <CardDescription>
              Modifiez soigneusement les informations de l&apos;article{' '}
            </CardDescription>
          </CardHeader>
          {/* <ProductTypeSelection /> */}
        </div>

        <ScrollArea className='h-[70vh]'>
          <CardContent className='border bg-gray-50  rounded-lg m-8 mt-4 p-8'>
            {productType === 'INVENTORY' && (
              <Suspense>
                <EditInventoryProductForm
                  product_id={product?.id || ''}
                  selling_price={product?.selling_price || 0}
                  name={product?.name || ''}
                  category_id={product?.category_id || ''}
                  status={product?.status || 'DRAFT'}
                  sku={product?.sku || ''}
                  threshold={product?.inventory_products[0].reorder_level || 0}
                />
              </Suspense>
            )}

            {/* {selectedProductType === 'NON_INVENTORY' && (
              <Suspense>
                <NonInventoryProductForm />
              </Suspense>
            )} */}

            {/* {selectedProductType === 'SERVICES' && (
              <Suspense>
                <ServicesProductForm />
              </Suspense>
            )} */}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default EditProductPage;
