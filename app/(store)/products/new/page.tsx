import BackButton from '@/components/back-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProductTypeSelection from './product-type-selection';
import CreateInventoryProductForm from './create-inventory-product-form';
import { ProductType } from '@prisma/client';
import NonInventoryProductForm from './non-inventory-product-form';
import ServicesProductForm from './service-product-form';
import { Suspense } from 'react';

interface Props {
  searchParams: Promise<{ product_type?: string }>;
}

const NewProductPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const selectedProductType: ProductType = searchParams.product_type
    ? (searchParams.product_type as ProductType)
    : 'INVENTORY';

  return (
    <div>
      <Card className='border shadow-none'>
        <div className='flex items-center justify-between mr-4'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>
              <div className='flex items-center gap-2'>
                <BackButton />
                <span> Enregistrement d&apos;article</span>
              </div>
            </CardTitle>
            <CardDescription>
              Veuillez saisir les informations du nouveau produit ci-dessous.
            </CardDescription>
          </CardHeader>
          <ProductTypeSelection />
        </div>

        <ScrollArea className='h-[70vh]'>
          <CardContent className='border bg-gray-50  rounded-lg m-8 mt-4 p-8'>
            {selectedProductType === 'INVENTORY' && (
              <Suspense>
                <CreateInventoryProductForm />
              </Suspense>
            )}

            {selectedProductType === 'NON_INVENTORY' && (
              <Suspense>
                <NonInventoryProductForm />
              </Suspense>
            )}

            {selectedProductType === 'SERVICES' && (
              <Suspense>
                <ServicesProductForm />
              </Suspense>
            )}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default NewProductPage;
