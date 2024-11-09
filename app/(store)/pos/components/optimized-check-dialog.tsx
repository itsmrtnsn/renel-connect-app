'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Customer } from '@prisma/client';
import { motion } from 'framer-motion';
import {
  Bed,
  Check,
  ChevronsUpDown,
  CreditCard,
  HandCoins,
  Receipt,
  TicketCheck,
  Wallet,
  Wine,
  XIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { GiFoodChain } from 'react-icons/gi';

import { useCartStore } from '@/app/hooks/use-cart-store';
import useCheckoutModal from '@/app/hooks/use-checkout-modal';
import { useDiscount } from '@/app/hooks/use-discount';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';
import CustomerFormModal from '../../customers/customer-form-modal';
import getCustomers from '../../customers/get-customer';
import checkOutSchema, { CheckoutFormData } from './checkout-schema';
import { useOptimizedCheckout } from './use-optimized-check-out';

interface Props {
  disabled: boolean;
  cashier: string;
}

export function CheckoutDialog({ disabled, cashier }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const { openModal, closeModal, isOpen } = useCheckoutModal();

  const { resetDiscount } = useDiscount();
  const { getTotal, clearCart } = useCartStore();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const { calculateDiscount } = useDiscount();
  const discount = calculateDiscount(getTotal());

  const total = getTotal() - discount;

  const { isLoading, completed, createSale } = useOptimizedCheckout(cashier);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkOutSchema),
    defaultValues: {
      paymentMethod: 'CASH',
      amountReceived: undefined,
      transactionType: undefined,
    },
  });

  const paymentMethod = useWatch({
    control: form.control,
    name: 'paymentMethod',
  });

  const amountReceived = useWatch({
    control: form.control,
    name: 'amountReceived',
  });

  const customerChange =
    paymentMethod === 'CASH' && amountReceived
      ? (amountReceived - total).toFixed(1)
      : '0.00';

  const onSubmit = (data: CheckoutFormData) => {
    createSale(data);
  };

  const handleCancel = () => {
    closeModal();
    form.reset();
    resetDiscount();
    clearCart();
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await getCustomers({ search: query });
      if (response?.success) {
        setCustomers(response.data!);
      }
    };
    fetchCustomers();
  }, [query]);

  return (
    <Dialog open={isOpen} onOpenChange={openModal}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className='w-full rounded-full py-6 font-normal text-base text-white mt-4 bg-gradient-to-br from-blue-500 to-blue-800 bg-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300'
        >
          <HandCoins />
          Passer à la caisse
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[900px] rounded-2xl border-[0.1px]'>
        <DialogHeader className='relative'>
          <DialogTitle className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800 flex items-center justify-between'>
            <span>Caisse</span>
            <Button
              size={'icon'}
              variant={'destructive'}
              onClick={handleCancel}
              className='absolute -top-3 -right-3 z-30'
            >
              <XIcon />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className='flex flex-col h-full py-4 px-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6 flex'
              >
                <div className='flex-1 mx-4 space-y-6'>
                  <FormField
                    control={form.control}
                    name='paymentMethod'
                    render={({ field }) => (
                      <FormItem className='space-y-4'>
                        <FormLabel className='text-base'>
                          Mode de paiement
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className='grid grid-cols-3 gap-4'
                          >
                            {[
                              { value: 'CASH', label: 'Cash', icon: Wallet },
                              {
                                value: 'CREDIT_CARD',
                                label: 'Carte de crédit',
                                icon: CreditCard,
                              },
                              {
                                value: 'CHECK',
                                label: 'Chèque',
                                icon: TicketCheck,
                              },
                            ].map(({ value, label, icon: Icon }) => (
                              <Label
                                key={value}
                                htmlFor={value}
                                className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer hover:bg-accent ${
                                  field.value === value
                                    ? 'border-primary'
                                    : 'border-muted'
                                }`}
                              >
                                <RadioGroupItem
                                  value={value}
                                  id={value}
                                  className='sr-only'
                                />
                                <Icon className='h-6 w-6 mb-2' />
                                <span>{label}</span>
                              </Label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='transactionType'
                    render={({ field }) => (
                      <FormItem className='space-y-4'>
                        <FormLabel className='text-base'>
                          Type de transaction
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className='grid grid-cols-3 gap-4'
                          >
                            {[
                              {
                                value: 'ROOM',
                                label: 'Chambre',
                                icon: Bed,
                              },
                              { value: 'DRINK', label: 'Bar', icon: Wine },
                              {
                                value: 'FOOD',
                                label: 'Nouriture',
                                icon: GiFoodChain,
                              },
                            ].map(({ value, label, icon: Icon }) => (
                              <Label
                                key={value}
                                htmlFor={value}
                                className={`flex flex-col items-center justify-center rounded-lg border-2  p-4 cursor-pointer hover:bg-accent ${
                                  field.value === value
                                    ? 'border-primary'
                                    : 'border-muted'
                                }`}
                              >
                                <RadioGroupItem
                                  value={value}
                                  id={value}
                                  className='sr-only'
                                />
                                <Icon className='h-6 w-6 mb-2' />
                                <span>{label}</span>
                              </Label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {paymentMethod === 'CASH' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormField
                        control={form.control}
                        name='amountReceived'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Montant reçu</FormLabel>
                            <FormControl>
                              <div className='relative'>
                                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                                  G
                                </span>
                                <Input
                                  type='number'
                                  className='pl-7'
                                  placeholder='0.00'
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {(paymentMethod === 'CREDIT_CARD' ||
                    paymentMethod === 'CHECK') && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormField
                        control={form.control}
                        name='transactionId'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transaction ID</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={`Entrez l'ID de transaction`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormField
                      control={form.control}
                      name='customerId'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Nom du client</FormLabel>
                          <Popover open={open} onOpenChange={setOpen}>
                            <div className='flex items-center gap-2'>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant='outline'
                                    role='combobox'
                                    aria-expanded={open}
                                    className='w-full justify-between font-normal shadow-none border-gray-300 border-[0.1px] h-10'
                                  >
                                    {field.value
                                      ? customers.find(
                                          (customer) =>
                                            customer.id === field.value
                                        )?.first_name
                                      : 'liste des clients'}
                                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <CustomerFormModal />
                            </div>

                            <PopoverContent className='w-[320px] p-0 shadow-none border-[0.1px] border-slate-300'>
                              <Command>
                                <div className='m-2'>
                                  <Input
                                    placeholder='recherche client...'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                  />
                                </div>
                                <CommandList className='border-[0.1px] mx-2 mb-2 rounded-lg border-slate-300'>
                                  <CommandEmpty>
                                    aucun client trouvé
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {customers.map((customer) => (
                                      <CommandItem
                                        key={customer.id}
                                        onSelect={() => {
                                          form.setValue(
                                            'customerId',
                                            customer.id
                                          );
                                          setOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            field.value === customer.id
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                        {customer.first_name +
                                          ' ' +
                                          customer.last_name}
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
                  </motion.div>

                  {form.watch('transactionType') === 'ROOM' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormField
                        control={form.control}
                        name='roomNumber'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Le numéro de la chambre</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Entrez le numéro de la chambre'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </div>
                <div className='lg:w-80 p-6 bg-slate-100 ml-3 rounded-xl'>
                  <h2 className='font-semibold mb-4'>Résumé de l&apos;achat</h2>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Sous-total</span>
                      <span>{getTotal().toFixed(1)} G</span>
                    </div>
                    <div className='flex justify-between text-green-600'>
                      <span>Rabais</span>
                      <span>-{discount} G</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>TCA</span>
                      <span>$0.00</span>
                    </div>
                    <Separator />
                    <div className='flex justify-between font-semibold'>
                      <span>Total</span>
                      <span className='text-primary'>{total.toFixed(1)} G</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className='flex justify-between text-lg font-semibold text-blue-500'
                    >
                      <span>Monnaie</span>
                      <span>{customerChange} G</span>
                    </motion.div>
                  </div>
                  {!completed && (
                    <Button
                      disabled={
                        !form.formState.isValid ||
                        form.formState.isSubmitting ||
                        (paymentMethod === 'CASH' && amountReceived! < total)
                      }
                      type='submit'
                      className='w-full mt-6'
                      size='lg'
                    >
                      {isLoading ? (
                        <p className='flex items-center justify-center gap-4'>
                          <FaSpinner className='animate-spin' />
                          <span>Processing...</span>
                        </p>
                      ) : (
                        'Finaliser le paiement'
                      )}
                    </Button>
                  )}

                  {completed && (
                    <div className='flex mt-4 justify-between items-center gap-4'>
                      <Button
                        className='text-base font-normal transition-all duration-300 shadow-none border-[0.1px]'
                        onClick={handleCancel}
                      >
                        Retourner
                      </Button>
                      <Button disabled>
                        <Receipt /> Imprimer le reçu
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
