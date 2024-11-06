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
import CreateCustomerForm from './create-customer-form';

const CustomerFormModal = () => {
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
      <DialogContent className='sm:max-w-[750px]'>
        <DialogHeader>
          <DialogTitle>Enregistrer un nouveau Client</DialogTitle>
          <DialogDescription>
            Les informations sur les clients aideront à différencier qui achète
            quoi et quand
          </DialogDescription>
        </DialogHeader>
        <CreateCustomerForm upOnSubmitting={() => setIsOpen(!open)} />
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormModal;
