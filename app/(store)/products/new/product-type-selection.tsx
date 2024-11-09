'use client';

import useQueryParameter from '@/app/hooks/use-queryparameter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProductTypeSelection = () => {
  const { handleQuery, query } = useQueryParameter('product_type');

  const formatPlaceholder = (value: string) =>
    value
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  return (
    <Select onValueChange={handleQuery}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue
          defaultValue={query ? formatPlaceholder(query!) : ''}
          placeholder={query ? formatPlaceholder(query) : 'Inventory'}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='INVENTORY'>Inventory</SelectItem>
        <SelectItem value='NON_INVENTORY'>Non Inventory</SelectItem>
        <SelectItem value='SERVICES'>Services</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ProductTypeSelection;
