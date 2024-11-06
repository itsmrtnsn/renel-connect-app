import BackButton from '@/components/back-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PurchaseForm from './components/purchase-form';

import { ScrollArea } from '@/components/ui/scroll-area';

const PurchasesPage = () => {
  return (
    <Card className='border-[0.1px] shadow-none'>
      <div className='flex items-center justify-between mr-4'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>
            <div className='flex items-center gap-2'>
              <BackButton />
              <p>Enregistrer l&apos;achat d&apos;un nouveau produit</p>
            </div>
          </CardTitle>
          {/* <CardDescription>
            Veuillez saisir les informations du nouveau produit ci-dessous.
          </CardDescription> */}
        </CardHeader>
        {/* <Suspense fallback=''>
          <ProductTypeSelection />
        </Suspense> */}
      </div>

      <ScrollArea className='h-[70vh]'>
        <CardContent className='border-[0.1px] bg-slate-50/50  rounded-lg m-8 mt-4 p-8'>
          <PurchaseForm />
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default PurchasesPage;
