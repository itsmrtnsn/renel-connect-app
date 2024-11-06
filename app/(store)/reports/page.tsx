import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ReportSummaryCard from './report-summary-cards';
import Search from '@/components/search';
import SalesReportTable from './sales-report-table';
import Pagination from '@/components/pagination';
import getSalesReport from '../_actions/get-sales-report';
import CurrentPath from '@/components/current-path';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DateRangePicker } from '@/components/data-range-picker';
import SalesCategoryDistribution from './sales-category-distribution';
import getReportSummary from '../_actions/get-report-summary';

interface Props {
  searchParams: { searchQuery: string; page: string };
}

const page = async ({ searchParams: { page, searchQuery } }: Props) => {
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 10;

  const { sales, totalPage, totalRevenue } = await getSalesReport(
    searchQuery,
    currentPage,
    itemsPerPage
  );

  const {
    data: { salesByCategory },
  } = await getReportSummary();

  const foodSales =
    salesByCategory?.find((category) => category.name === 'FOOD')?.value || 0;
  const drinkSales =
    salesByCategory?.find((category) => category.name === 'DRINK')?.value || 0;
  const roomSales =
    salesByCategory?.find((category) => category.name === 'ROOM')?.value || 0;
  const otherSales =
    salesByCategory?.find((category) => category.name === 'OTHER')?.value || 0;

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <CurrentPath />
        <DateRangePicker />
      </div>
      <ScrollArea className='h-[80vh] scroll-smooth'>
        <div className='space-y-8'>
          <ReportSummaryCard />
          <SalesCategoryDistribution
            food={foodSales}
            drink={drinkSales}
            room={roomSales}
            other={otherSales}
          />
          <Card className='col-span-1  shadow-none'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <Search />
                {/* <Button>Filter By Category</Button> */}
                {/* <SalesCategoryFilter /> */}
              </div>
            </CardHeader>
            <CardContent>
              <SalesReportTable
                sales={sales}
                totalRevenue={parseInt(totalRevenue.toFixed(0))}
              />
              <Pagination
                totalPages={totalPage}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default page;
