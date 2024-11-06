'use client';

import useQueryParameter from '@/app/hooks/use-queryparameter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import getCategories, { Category } from '../_categories/get-categories';
import { toast } from 'sonner';

const ProductCategoryFilter = () => {
  const { handleQuery } = useQueryParameter('category');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      setCategories(response.data as Category[]);
    };
    fetchCategories();
  }, []);

  return (
    <Select onValueChange={(value) => handleQuery(value)}>
      <SelectTrigger className='w-fit px-6 shadow-none border-gray-200  border-[0.1px]'>
        <SelectValue placeholder='Categorie' />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.slug}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProductCategoryFilter;
