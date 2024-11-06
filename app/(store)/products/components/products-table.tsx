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
import { EllipsisIcon } from 'lucide-react';
import { ProductStatus } from '@prisma/client';
import ProductStatusBadge from './product-status-badge';

type ProductTable = {
  id: string;
  name: string;
  averageCostPrice: number;
  sellingPrice: number;
  category: string;
  status: ProductStatus;
  quantityInStock: number;
};

interface Props {
  products: ProductTable[];
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

export default function ProductsTable({ products }: Props) {
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
                  'text-center':
                    head === 'Statut' ||
                    head === 'Prix ​​de vente' ||
                    head === 'Prix ​ moyen',
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
              key={product.id}
              className={cn(
                'cursor-pointer h-12 border-none text-gray-700',
                index % 2 === 0 ? '' : 'bg-gray-100'
              )}
            >
              <TableCell>
                <Checkbox className='border-[0.1px] rounded-md shadow-none' />
              </TableCell>
              <TableCell className='text-gray-800'>{product.name}</TableCell>
              <TableCell className='text-center'>
                {product.averageCostPrice}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className='text-gray-800 text-center'>
                {product.sellingPrice}
              </TableCell>
              <TableCell className='text-center'>
                <ProductStatusBadge status={product.status} />
              </TableCell>
              <TableCell className='text-gray-900 text-center'>
                {product.quantityInStock}
              </TableCell>
              <TableCell>
                {/* <TableAction productId={product.id} /> */}
                <EllipsisIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
