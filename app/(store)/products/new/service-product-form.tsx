'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { productStatus } from '@/lib/product-status';
import CategoryFormModal from '../_categories/category-form-modal';
import createProduct from './create-product';
import { ServiceFormData, ServiceSchema } from './product-schema';
import getCategories, { Category } from '../_categories/get-categories';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ServicesProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      product_type: 'SERVICES',
    },
  });

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

  async function onSubmit(values: ServiceFormData) {
    const result = await createProduct(values, 'SERVICES');

    if (result?.success) {
      toast.success(result?.message);
      form.reset();
      router.back();
      return;
    }

    if (!result?.success) {
      toast.error(result?.message);
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du service</FormLabel>
                <FormControl>
                  <Input placeholder='New Product' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='sku'
            render={({ field }) => (
              <FormItem>
                <FormLabel>BarCode</FormLabel>
                <FormControl>
                  <Input placeholder='0000000000' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='product_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de service</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Type d'article" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='SERVICES'>Services</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie du service</FormLabel>
                <div className='flex items-center gap-2'>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Catégorie du service' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <CategoryFormModal />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='selling_price'
            render={({ field }) => (
              <FormItem>
                Prix ​​du service
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='0.1'
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Statut de l'article" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productStatus.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='service_duration'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durée du service</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='0000000000'
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='service_location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lieu du service</FormLabel>
                <FormControl>
                  <Input placeholder='0000000000' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Soumettre</Button>
      </form>
    </Form>
  );
}
