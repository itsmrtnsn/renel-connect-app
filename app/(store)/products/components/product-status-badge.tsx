import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ProductStatus } from '@prisma/client';

interface Props {
  status: ProductStatus;
}

const ProductStatusBadge = ({ status }: Props) => {
  const statusText: Record<typeof status, string> = {
    ACTIVE: 'Actif',
    INACTIVE: 'Inactif',
    DRAFT: 'Brouillon',
    ARCHIVED: 'Archivé',
  };
  return (
    <Badge
      variant='outline'
      className={cn('rounded-sm border-[0.1px]  px-3', {
        'bg-green-50 text-green-500 border-green-200': status === 'ACTIVE',
        'bg-yellow-50 text-yellow-500 border-yellow-200': status === 'DRAFT',
        'bg-red-50 text-red-500 border-red-300': status === 'INACTIVE',
        'bg-gray-50 text-gray-700 border-gray-300': status === 'ARCHIVED',
      })}
    >
      {statusText[status]}
    </Badge>
  );
};

export default ProductStatusBadge;
