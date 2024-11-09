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
import CreateProductCategoryForm from './create-category-form';

const CategoryFormModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='border-slate-300 border shadow-none'
        >
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className='py-10'>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
          <DialogDescription>
            Créer une nouvelle catégorie signifie que vous pourrez la
            sélectionner immédiatement lors de la création de nouveaux produits.
          </DialogDescription>
        </DialogHeader>
        <CreateProductCategoryForm
          upOnSubmitting={() => {
            setIsOpen(!isOpen);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormModal;
