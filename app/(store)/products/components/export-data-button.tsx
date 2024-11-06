import { Button } from '@/components/ui/button';

const ExportProductButton = () => {
  return (
    <Button
      className='font-normal border-gray-300 shadow-none border-[0.1px]'
      variant={'outline'}
      disabled
    >
      Exporter
    </Button>
  );
};

export default ExportProductButton;
