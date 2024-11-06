import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SalesCategories } from '@/lib/sales-category';
import { cn } from '@/lib/utils';
import { SaleCategory } from '@prisma/client';

const saleTableHeader = [
  'ID de transaction',
  'Caissier',
  'Date',
  'Montant',
  'Catégorie',
];

type Sale = {
  id: string;
  reference: string;
  cashier_id: string;
  created_at: Date;
  total: number;
  category: SaleCategory;
};
interface Props {
  sales: Sale[];
  totalRevenue: number;
}
const SalesReportTable = ({ sales, totalRevenue }: Props) => {
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
            key={sale.id}
          >
            <TableCell>{sale.reference}</TableCell>
            <TableCell>{sale.cashier_id}</TableCell>
            <TableCell>{sale.created_at.toLocaleDateString()}</TableCell>
            <TableCell>{sale.total}</TableCell>
            <TableCell>
              {
                SalesCategories.find(
                  (category) => category.value === sale.category
                )?.name
              }
            </TableCell>
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
            ${totalRevenue.toFixed(0)}
          </TableCell>
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default SalesReportTable;
