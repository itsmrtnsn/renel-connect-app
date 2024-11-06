import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import Link from 'next/link';

const ProductTableAction = ({ productId }: { productId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='shadow-none'>
        <Button
          size='icon'
          variant='ghost'
          className='bordr-[0.1px] shadow-none'
        >
          <Ellipsis className='cursor-pointer text-muted-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='border-[0.1px] shadow-none'>
        <DropdownMenuLabel>Passez à l&apos;action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=''>
          <Link href={`/products/${productId}`}>Aperçu</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/products/${productId}/edit`}>Modifier</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductTableAction;
