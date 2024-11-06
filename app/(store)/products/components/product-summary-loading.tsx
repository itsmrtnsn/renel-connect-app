import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProductSummaryLoading = () => {
  const cards = [1, 2, 3, 4];
  return (
    <div>
      {cards.map((card) => (
        <Card
          key={card}
          className='bg-slate-50/50 border-slate-200 rounded-lg shadow-none border-[0.1px]'
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-nowrap text-muted-foreground'>
              <Skeleton />
            </CardTitle>
            {/* <Icon className={cn('h-4 w-4 shrink-0', iconColor)} /> */}
            <Skeleton />
          </CardHeader>
          <CardContent>
            {/* <div className='text-xl font-bold'>{value}</div> */}
            <Skeleton />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductSummaryLoading;
