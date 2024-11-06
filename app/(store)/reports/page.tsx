import CurrentPath from '@/components/current-path';
import { DateRangePicker } from '@/components/data-range-picker';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import getReportSummary from '../_actions/get-report-summary';
import getSalesReport from '../_actions/get-sales-report';
import { CategorySalesBarCharts } from './category-sales-bar-charts';
import ReportSummaryCard from './report-summary-cards';
import SalesCategoryDistribution from './sales-category-distribution';
import salesItemsReport from './sales-items-report';
import SalesItemsReportTable from './sales-items-report-table';
import SalesReportTable from './sales-report-table';

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

  const items = await salesItemsReport();

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
        <div className='space-y-8 pb-4'>
          <ReportSummaryCard />

          <div className='grid grid-cols-2 gap-6'>
            <CategorySalesBarCharts
              food={foodSales}
              drink={drinkSales}
              room={roomSales}
              other={otherSales}
            />
            <SalesCategoryDistribution
              food={foodSales}
              drink={drinkSales}
              room={roomSales}
              other={otherSales}
            />
          </div>

          <Tabs defaultValue='sales_report'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='sales_report'>Sales</TabsTrigger>
              <TabsTrigger value='sales_items_report'>Items</TabsTrigger>
            </TabsList>
            <TabsContent value='sales_items_report'>
              <Card className=' shadow-none'>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <Search />
                    {/* <Button>Filter By Category</Button> */}
                    {/* <SalesCategoryFilter /> */}
                  </div>
                </CardHeader>
                <CardContent>
                  <SalesItemsReportTable
                    sales={items}
                    totalRevenue={parseInt(totalRevenue.toFixed(0))}
                  />
                  <Pagination
                    totalPages={totalPage}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='sales_report'>
              <Card className='shadow-none'>
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
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

export default page;
