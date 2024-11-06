import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { InventoryProduct } from './inventory-products';
import ProductStatusBadge from './product-status-badge';
import ProductTableAction from './product-table-action';

interface Props {
  products: InventoryProduct[];
}

const tableHeads = [
  'Article',
  'Prix ​ moyen',
  'Categorie',
  'Prix ​​de vente',
  'Statut',
  'Niveau de stock',
  'Action',
];

export default function InventoryProductsTable({ products }: Props) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className=' h-12'>
            <TableHead>
              <Checkbox className='border-[0.1px] rounded-md shadow-none'></Checkbox>
            </TableHead>
            {tableHeads.map((head) => (
              <TableHead
                key={head}
                className={cn('text-sm   font-normal', {
                  'text-center': head === 'Statut',
                  // head === 'Prix ​ moyen',
                })}
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={product.sku}
              className={cn(
                'cursor-pointer h-12 border-none text-gray-700',
                index % 2 === 0 ? '' : 'bg-blue-50/50'
              )}
            >
              <TableCell>
                <Checkbox className='border-[0.1px] rounded-md shadow-none' />
              </TableCell>

              <TableCell className='text-gray-800'>{product.name}</TableCell>
              <TableCell className='text-'>
                {product.averageCostPrice.toFixed(1)}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className='text-gray-800 text-'>
                {product.sellingPrice}
              </TableCell>
              <TableCell className='text-center'>
                <ProductStatusBadge status={product.status} />
              </TableCell>
              <TableCell className='text-gray-900 text-center'>
                {product.stockLevel}
              </TableCell>
              <TableCell aria-disabled={true}>
                <ProductTableAction productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
