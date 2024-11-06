import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const saleTableHeader = [
  //   'Product Id',
  'Product Name',
  'Items Bought',
  'AVG Unit Price',
  'Total Revenue',
  'Total Sales Count',
];

type Sale = {
  productName: string;
  totalItemsBought: number;
  totalSalesCount: number;
  averageUnitPrice: number;
  totalRevenue: number;
  firstSaleDate: Date;
  lastSaleDate: Date;
};
interface Props {
  sales: Sale[];
  totalRevenue: number;
}
const SalesItemsReportTable = ({ sales, totalRevenue }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {saleTableHeader.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale, index) => (
          <TableRow
            className={cn(
              'cursor-pointer h-12 border-none text-gray-700',
              index % 2 === 0 ? '' : 'bg-gray-100'
            )}
            key={sale.productName}
          >
            <TableCell>{sale.productName}</TableCell>
            <TableCell>{sale.totalItemsBought}</TableCell>
            <TableCell>{sale.averageUnitPrice}</TableCell>
            <TableCell>{sale.totalRevenue}</TableCell>
            <TableCell>{sale.totalSalesCount}</TableCell>
            {/* <TableCell>
              {
                SalesCategories.find(
                  (category) => category.value === sale.category
                )?.name
              }
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow className='bg-gray-500 hover:bg-gray-600 transition-colors duration-300 ease-linear cursor-pointer'>
          <TableCell></TableCell>
          <TableCell colSpan={2} className='font-semibold text-base text-white'>
            Total
          </TableCell>
          <TableCell className='font-semibold text-base text-white'>
            HTG {totalRevenue.toFixed(0)}
          </TableCell>
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default SalesItemsReportTable;
