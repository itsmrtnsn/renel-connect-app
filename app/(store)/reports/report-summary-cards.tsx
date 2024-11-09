import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import getReportSummary from '../_actions/get-report-summary';

interface Props {
  startDate?: Date;
  endDate?: Date;
}

const ReportSummaryCard = async ({ startDate, endDate }: Props) => {
  const { success, data } = await getReportSummary(startDate, endDate);
  if (!success) {
    // return null;
    // console.log(message);
  }

  const reportData = [
    {
      id: 1,
      title: 'Ventes totales',
      value: data.totalRevenue,
      icon: DollarSign,
    },
    {
      id: 2,
      title: 'Ventes moyennes',
      value: data.averageOrderValue,
      icon: TrendingUp,
    },
    {
      id: 3,
      title: 'transactions',
      value: data.totalSales,
      icon: ShoppingCart,
    },
    { id: 4, title: 'Nouveaux clients', value: data.newCustomers, icon: Users },
  ];
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {reportData.map((data) => (
        <Card
          key={data.id}
          className='bg-gray-100/50 shadow-none border-2 text-black'
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-base font-medium text-muted-foreground'>
              {data.title}
            </CardTitle>
            <data.icon className='h-4 w-4 text-blue-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{data.value}</div>
            {/* <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReportSummaryCard;
