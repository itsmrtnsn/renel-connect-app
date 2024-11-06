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

import { productStatus } from '@/lib/product-status';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import getCategories, { Category } from '../_categories/get-categories';
import CategoryFormModal from '../_categories/category-form-modal';
import createProduct from './create-product';
import { InventoryFormData, InventorySchema } from './product-schema';
import { useRouter } from 'next/navigation';

export default function CreateInventoryProductForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const form = useForm<InventoryFormData>({
    resolver: zodResolver(InventorySchema),
    defaultValues: {
      product_type: 'INVENTORY',
      status: 'DRAFT',
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

  const handleSubmitProduct = async (data: FieldValues) => {
    const result = await createProduct(data, 'INVENTORY');

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
          {/* <FormField
            control={form.control}
            name='product_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type d&apos;article</FormLabel>
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
                    <SelectItem value='INVENTORY'>Inventory</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name='category_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie d&apos;article</FormLabel>
                <div className='flex items-center gap-2'>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Catégorie d'article" />
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
          {/* <FormField
            control={form.control}
            name='cost_price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix de revient</FormLabel>
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
          /> */}
          <FormField
            control={form.control}
            name='selling_price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix de vente</FormLabel>
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
          {/* <FormField
            control={form.control}
            name='quantity_in_stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantité en stock</FormLabel>
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
          /> */}
          <FormField
            control={form.control}
            name='threshold'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seuil</FormLabel>
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

          {/* <FormField
            control={form.control}
            name='supplier_id'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Nom du fournisseur</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <div className='flex  items-center gap-2'>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          aria-expanded={open}
                          className='w-full justify-between font-normal shadow-none border-gray-300 border-[0.1px] h-10'
                        >
                          {field.value
                            ? suppliers.find(
                                (supplier) => supplier.id === field.value
                              )?.name
                            : 'Liste des fournisseurs'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <SupplierFormModal />
                  </div>

                  <PopoverContent className='w-[320px] p-0 shadow-none border-[0.1px] border-slate-300'>
                    <Command>
                      <div className='m-2'>
                        <Input
                          placeholder='Search suppliers...'
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                      <CommandList className='border-[0.1px] mx-2 mb-2 rounded-lg border-slate-300'>
                        <CommandEmpty>Aucun fournisseur trouvé.</CommandEmpty>
                        <CommandGroup>
                          {filteredSuppliers.map((supplier) => (
                            <CommandItem
                              key={supplier.id}
                              onSelect={() => {
                                form.setValue('supplier_id', supplier.id);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === supplier.id
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {supplier.name}
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
          /> */}

          {/* <FormField
            control={form.control}
            name='storage_location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emplacement de stockage</FormLabel>
                <FormControl>
                  <Input placeholder='In House' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
          {/* <FormField
            control={form.control}
            name='expiry_date'
            render={({ field }) => (
              <FormItem className='flex flex-col mt-3'>
                <FormLabel>Date d&apos;expiration</FormLabel>
                <Popover>
                  <PopoverTrigger
                    asChild
                    className='shadow-none border-[0.1px] border-slate-300'
                  >
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  être averti lorsque le produit est expiré
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <div className='flex justify-end mt-10'>
          <Button type='submit' className='w-[10rem]'>
            Créer l&apos;article
          </Button>
        </div>
      </form>
    </Form>
  );
}
