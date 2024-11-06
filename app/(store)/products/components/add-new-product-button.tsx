import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IoMdAddCircle } from 'react-icons/io';

const AddNewProductButton = () => {
  return (
    <Link href='/products/new'>
      <Button className='font-normal'>
        <IoMdAddCircle />
        New Product
      </Button>
    </Link>
  );
};

export default AddNewProductButton;
