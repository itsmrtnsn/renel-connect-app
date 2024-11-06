import AddNewProductButton from './add-new-product-button';

const EmptyProducttable = () => {
  return (
    <div className='border-dashed border h-[20rem] flex flex-col gap-6 items-center justify-center rounded-lg'>
      <h2 className='font-bold text-lg text-destructive'>
        No Products Found !
      </h2>
      <AddNewProductButton />
    </div>
  );
};

export default EmptyProducttable;
