'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { productStatus } from '@/lib/product-status';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CategoryFormModal from '../_categories/category-form-modal';
import getCategories, { Category } from '../_categories/get-categories';
import createProduct from './create-product';
import { ServiceFormData, ServiceSchema } from './product-schema';
import BarCodeTooltip from './bar-code-tooltip';
export default function ServicesProductForm() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
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
      const response = await getCategories({ search: query, pageSize: 5 });
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      setCategories(response.data as Category[]);
    };
    fetchCategories();
  }, [query]);

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
                <span className='text-red-500'>*</span>
                <FormControl>
                  <Input placeholder='Nouvel article' {...field} />
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
                <div className='flex items-center gap-1'>
                  <FormLabel>Bar Code</FormLabel>
                  <BarCodeTooltip />
                </div>

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
                <span className='text-red-500'>*</span>
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
              <FormItem className='flex flex-col'>
                <div className='flex items-center'>
                  <FormLabel>Nom de la catégorie</FormLabel>
                  <span className='text-red-500'>*</span>
                </div>
                <Popover open={open} onOpenChange={setOpen}>
                  <div className='flex items-center gap-2'>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          aria-expanded={open}
                          className='w-full justify-between font-normal shadow-none border-gray-300 border h-10'
                        >
                          {field.value
                            ? categories.find(
                                (customer) => customer.id === field.value
                              )?.name
                            : 'Listes de catégories'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <CategoryFormModal />
                  </div>

                  <PopoverContent className='w-[310px] p-0 shadow-none border border-slate-300'>
                    <Command>
                      <div className='m-2'>
                        <Input
                          placeholder='Rechercher une catégorie...'
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                      <CommandList className='border-[0.1px] mx-2 mb-2 rounded-lg border-slate-300'>
                        <CommandEmpty>Aucune catégorie trouvée</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              key={category.id}
                              onSelect={() => {
                                form.setValue('category_id', category.id);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === category.id
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='selling_price'
            render={({ field }) => (
              <FormItem>
                <FormLabel> Prix ​​du service</FormLabel>
                <span className='text-red-500'>*</span>

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
                <span className='text-red-500'>*</span>
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
                <span className='text-red-500'>*</span>
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
                <span className='text-red-500'>*</span>
                <FormControl>
                  <Input placeholder='0000000000' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex items-center justify-end mt-10'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'En cours...' : 'Soumettre'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
