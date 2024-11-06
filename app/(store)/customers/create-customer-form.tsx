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
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import createCustomerSchema, {
  createCustomerFormData,
} from '../customers/create-customer-schema';
import createCustomer from './create-customer';
import { toast } from 'sonner';
import gender from '@/lib/gender';
import identificationCardOtions from '@/lib/customer-id';

interface Props {
  upOnSubmitting: (data: FieldValues) => void;
}

export default function CreateCustomerForm({ upOnSubmitting }: Props) {
  const years = Array.from(
    { length: new Date().getFullYear() + 10 - 1990 + 1 },
    (_, i) => 1980 + i
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
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  const form = useForm<createCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: null,
      phoneNumber: '',
      idNumber: '',
      idType: '',
    },
  });

  async function onSubmit(values: createCustomerFormData) {
    const result = await createCustomer(values);
    if (result.success) {
      upOnSubmitting(values);
      toast.success(result.message);
      form.reset();
      return;
    }

    if (!result.success) {
      toast.error(result.message);
    }
  }

  const handleYearChange = (year: string) => {
    setCalendarDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(parseInt(year));
      return newDate;
    });
  };

  const handleMonthChange = (month: string) => {
    setCalendarDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(months.indexOf(month));
      return newDate;
    });
  };

  return (
    <div className='border-[0.1px] border-gray-300 p-4 rounded-lg w-full bg-slate-50/50'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder='Prénom du client' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de famille</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='nom de famille du client'
                      {...field}
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='birthDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className='shadow-none'>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] shadow-none border-[0.1px] border-gray-300 pl-3 text-left font-normal',
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
                    <PopoverContent
                      className='w-auto p-0 shadow-none'
                      align='start'
                    >
                      <div className='flex items-center justify-between space-x-2 p-3'>
                        <Select
                          onValueChange={handleMonthChange}
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
                          onValueChange={handleYearChange}
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
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexe</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Sexe du client' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gender.map((g) => (
                        <SelectItem key={g.id} value={g.value}>
                          {g.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid  grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input
                      type='tel'
                      placeholder='Entrez le numéro de téléphone'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Courriel du client`}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='idType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d&apos;identifiant fourni</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`Type d'identifiant fourni par le client`}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {identificationCardOtions.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
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
              name='idNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro d&apos;identification</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Numéro d'identification du client`}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button size={'lg'} type='submit' className='w-full h-11 font-normal'>
            soumettre les informations client
          </Button>
        </form>
      </Form>
    </div>
  );
}
