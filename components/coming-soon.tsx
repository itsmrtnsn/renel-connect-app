import { AlertCircle } from 'lucide-react';

const CommingSoonCard = () => {
  return (
    <div className=' h-[85vh] flex items-center justify-center bg-gray-100 rounded-lg'>
      <div className='bg-white p-8 rounded-lg border max-w-md w-full text-center'>
        <AlertCircle className='mx-auto mb-4 text-yellow-500' size={48} />
        <h1 className='text-3xl font-bold mb-4 text-gray-800'>Coming Soon</h1>
        <p className='text-xl mb-6 text-gray-600'>
          Nous mettons à jour notre système de point de vente pour mieux vous
          servir.
        </p>
        <p className='text-lg text-gray-700'>
          Date d&apos;achèvement prévue: <br />
          <span className='font-semibold'>8 Novembre 2024</span>
        </p>
        <p className='mt-6 text-sm text-gray-500'>
          Pour obtenir de l&apos;aide, veuillez contacter le responsable.
        </p>
      </div>
    </div>
  );
};

export default CommingSoonCard;
