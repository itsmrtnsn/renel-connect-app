'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';

import { useState } from 'react';
import CreateProductSupplierForm from './create-product-supplier-form';

const ProductSupplierFormModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='border-slate-300 border-[0.1px] shadow-none h-10'
        >
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[650px]'>
        <DialogHeader>
          <DialogTitle>Enregistrer un nouveau fournisseur</DialogTitle>
          <DialogDescription>
            Les coordonnées du fournisseur sont un excellent moyen
            d&apos;organiser votre achat
          </DialogDescription>
        </DialogHeader>
        <CreateProductSupplierForm upOnSubmitting={() => setIsOpen(!open)} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductSupplierFormModal;
