'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';

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

import editProduct from '@/app/(store)/_actions/edit-product';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { productStatus } from '@/lib/product-status';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CategoryFormModal from '../../_categories/category-form-modal';
import getCategories, { Category } from '../../_categories/get-categories';
import BarCodeTooltip from '../../new/bar-code-tooltip';
import { InventoryFormData, InventorySchema } from '../../new/product-schema';
import { ProductStatus } from '@prisma/client';

interface Props {
  product_id: string;
  status: ProductStatus;
  name: string;
  category_id: string;
  selling_price: number;
  threshold: number;
  sku: string;
}

export default function EditInventoryProductForm({
  selling_price,
  sku,
  status,
  name,
  category_id,
  threshold,
  product_id,
}: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const form = useForm<InventoryFormData>({
    resolver: zodResolver(InventorySchema),
    defaultValues: {
      product_type: 'INVENTORY',
      status: status,
      name: name,
      category_id: category_id,
      selling_price: selling_price,
      threshold: threshold!,
      sku: sku,
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

  const handleSubmitProduct = async (data: FieldValues) => {
    const result = await editProduct(data, 'INVENTORY', product_id);

    if (!result?.success) {
      toast.error(result?.message);
      return;
    }

    toast.success(result?.message);
    form.reset();
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitProduct)}>
        <div className='grid grid-cols-2 gap-x-8 gap-y-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l&apos;article</FormLabel>
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
                <FormLabel>Prix de vente</FormLabel>
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
            name='threshold'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seuil</FormLabel>
                <span className='text-red-500'>*</span>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='1'
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
