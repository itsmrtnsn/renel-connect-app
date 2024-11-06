import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';

interface Props {
  title: string;
  value: number;
  Icon: IconType;
  iconColor: string;
}

const ProductSummaryCard = ({ Icon, iconColor, value, title }: Props) => {
  return (
    <Card className='bg-gray-100  border-none rounded-lg shadow-none '>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium text-nowrap text-muted-foreground'>
          {title}
        </CardTitle>
        <Icon className={cn('h-4 w-4 shrink-0', iconColor)} />
      </CardHeader>
      <CardContent>
        <div className='text-xl font-bold'>{value}</div>
      </CardContent>
    </Card>
  );
};

export default ProductSummaryCard;
