'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgePlus, Loader } from 'lucide-react';
import { FieldValues, useForm } from 'react-hook-form';

import createCategory from '../_categories/create-category';
import { toast } from 'sonner';
import {
  CreateProductCategoryFormData,
  createProductCategorySchema,
} from './create-category-schema';

interface Props {
  upOnSubmitting: (data: FieldValues) => void;
}

const CreateProductCategoryForm = ({ upOnSubmitting }: Props) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateProductCategoryFormData>({
    resolver: zodResolver(createProductCategorySchema),
  });

  const handleSubmiting = async (data: FieldValues) => {
    const response = await createCategory(
      data as CreateProductCategoryFormData
    );

    if (response.success) {
      toast.success(response.message);
      upOnSubmitting(data);
      reset();
    }

    if (!response.success) {
      toast.error(response.message);
    }
  };
  return (
    <form onSubmit={handleSubmit((data) => handleSubmiting(data))}>
      <div className='flex  gap-4'>
        <div className='w-full'>
          <Input
            type='text'
            required
            {...register('name')}
            className='w-full'
            placeholder='Category'
          />
          {errors.name && (
            <p className='text-xs mt-2  text-destructive animate-pulse'>
              {errors.name.message}
            </p>
          )}
        </div>
        <div className=''>
          <Button type='submit' className='h-10' disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader className='animate-spin' />
            ) : (
              <p className='flex items-center gap-1'>
                <BadgePlus />
                <span>Créer</span>
              </p>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateProductCategoryForm;
