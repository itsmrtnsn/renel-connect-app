'use client';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import useQueryParameter from '@/app/hooks/use-queryparameter';

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(today, -15),
    to: today,
  });

  const { handleQuery, query } = useQueryParameter('date_range');

  const myDate = query && query.split('x');
  const startDate = myDate ? new Date(myDate[0]) : new Date();
  const endDate = myDate ? new Date(myDate[1]) : new Date();

  const handleDate = () => {
    if (date?.from && date?.to) {
      handleQuery(
        format(date.from, 'yyyy-MM-dd') + 'x' + format(date.to, 'yyyy-MM-dd')
      );
    }
  };

  return (
    <div className={cn('flex gap-2 items-center', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[250px] justify-start text-left font-normal shadow-none border-[0.1px]',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {startDate ? (
              endDate ? (
                <>
                  {format(startDate, 'LLL dd, y')} -{' '}
                  {format(endDate, 'LLL dd, y')}
                </>
              ) : (
                format(startDate, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0 border-[0.1px] border-gray-300 shadow-none'
          align='start'
        >
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={startDate}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button
        size='sm'
        type='submit'
        className='font-normal'
        onClick={() => {
          handleDate();
        }}
      >
        Submit
      </Button>
    </div>
  );
}
