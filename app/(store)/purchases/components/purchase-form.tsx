'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Supplier } from '@prisma/client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import createPurchase from '../../_actions/create-purchase';
import getInventoryProducts, {
  InventoryProduct,
} from '../../_actions/get-inventory-products';
import getSupplier from '../../suppliers/get-supplier';
import { PurchaseFormData, purchaseSchema } from './create-purchase-schema';
import ProductSupplierFormModal from '../../suppliers/new/product-supplier-from-modal';

export default function PurchaseForm() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [inventoryProducts, setInventoryProducts] = useState<
    InventoryProduct[]
  >([]);
  const [purchaseCalendarDate, setPurchaseCalendarDate] = useState<Date>(
    new Date()
  );
  const [expiryCalendarDate, setExpiryCalendarDate] = useState<Date>(
    new Date()
  );

  const years = Array.from(
    { length: new Date().getFullYear() + 10 - 1990 + 1 },
    (_, i) => 1990 + i
  );
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const form = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      product_id: '',
      cost_price: 0,
      quantity_bought: 0,
      purchase_date: new Date(),
      expiry_date: undefined,
      supplier_id: '',
    },
  });

  const handleYearChange = (
    year: string,
    setDate: React.Dispatch<React.SetStateAction<Date>>
  ) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(parseInt(year));
      return newDate;
    });
  };

  const handleMonthChange = (
    month: string,
    setDate: React.Dispatch<React.SetStateAction<Date>>
  ) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(months.indexOf(month));
      return newDate;
    });
  };

  async function onSubmit(data: PurchaseFormData) {
    const result = await createPurchase(data);
    if (!result?.success) {
      toast.error(result?.message);
    } else {
      toast.success("L'achat a été enregistré avec succès");
    }
  }

  useEffect(() => {
    const fetchSuppliers = async () => {
      const result = await getSupplier();
      if (result.success) {
        setSuppliers(result.data as Supplier[]);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchInventoryProducts = async () => {
      const products = await getInventoryProducts();
      setInventoryProducts(products.data);
    };
    fetchInventoryProducts();
  }, []);

  const renderCalendar = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any,
    calendarDate: Date,
    setCalendarDate: React.Dispatch<React.SetStateAction<Date>>,
    isExpiry: boolean
  ) => (
    <Popover>
      <PopoverTrigger asChild className='shadow-none'>
        <FormControl>
          <Button
            variant='outline'
            className={cn(
              'w-full shadow-none border-[0.1px] h-10 border-gray-300 pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value ? (
              format(field.value, 'PPP', { locale: fr })
            ) : (
              <span>Choisir une date</span>
            )}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 shadow-none' align='start'>
        <div className='flex items-center justify-between space-x-2 p-3'>
          <Select
            onValueChange={(value) => handleMonthChange(value, setCalendarDate)}
            value={format(calendarDate, 'MMMM')}
          >
            <SelectTrigger className='w-[120px]'>
              <SelectValue placeholder='Month' />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => handleYearChange(value, setCalendarDate)}
            value={calendarDate.getFullYear().toString()}
          >
            <SelectTrigger className='w-[100px]'>
              <SelectValue placeholder='Year' />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode='single'
          selected={field.value}
          onSelect={field.onChange}
          month={calendarDate}
          onMonthChange={setCalendarDate}
          disabled={(date) =>
            isExpiry
              ? date <= new Date()
              : date > new Date() || date < new Date('1900-01-01')
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid grid-cols-2 gap-4 items-center'
      >
        <FormField
          control={form.control}
          name='product_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Choisissez un produit dans la liste' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {inventoryProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
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
          name='cost_price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coût unitaire du produit</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='quantity_bought'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité achetée</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='purchase_date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='mb-1'>Date d&apos;achat</FormLabel>
              {renderCalendar(
                field,
                purchaseCalendarDate,
                setPurchaseCalendarDate,
                false
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='expiry_date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='mb-1'>
                Date d&apos;expiration (optionnel)
              </FormLabel>
              {renderCalendar(
                field,
                expiryCalendarDate,
                setExpiryCalendarDate,
                true
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='supplier_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du fournisseur</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <div className='flex items-center gap-2'>
                    <SelectTrigger>
                      <SelectValue placeholder='Sélectionnez un fournisseur dans la liste' />
                    </SelectTrigger>
                    <ProductSupplierFormModal />
                  </div>
                </FormControl>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='mt-5 w-full col-span-2 flex justify-end'>
          <Button type='submit' size={'lg'} className='col-span-2'>
            Enregistrer l&apos;achat
          </Button>
        </div>
      </form>
    </Form>
  );
}
