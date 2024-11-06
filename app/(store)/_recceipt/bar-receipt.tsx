'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { Printer } from 'lucide-react';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import TotalSection from './total-section';
import TransactionInfo from './transaction-info';
import { SaleItem } from './receipt-items-type';
import Header from './header';
import ContactInfo from './contact-info';
import ItemsList from './items-list';
import PaymentInfo from './payment-info';
import PaymentMethod from './payment-method';
import ThankYouMessage from './thank-you-message';
import BarCode from './barcode';

interface ReceiptProps {
  transactionId: string;
  cashier: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
  amountReceived: number;
  change: number;
  paymentMethod: string;
  onAfterPrint: () => void;
}

type ReceiptSize = '80mm' | '58mm';

const ReceiptContent = React.forwardRef<
  HTMLDivElement,
  { receiptSize: ReceiptSize; receiptData: ReceiptProps }
>((props, ref) => (
  <div
    ref={ref}
    className={`mx-auto bg-white ${
      props.receiptSize === '80mm' ? 'w-80' : 'w-56'
    } print:mt-8 shadow-lg rounded-lg overflow-hidden`}
  >
    <Card className='p-6 space-y-4'>
      <Header />
      <ContactInfo />
      <div className='border-t border-gray-200 my-4'></div>
      <TransactionInfo
        transactionId={props.receiptData.transactionId}
        cashier={props.receiptData.cashier}
      />
      <div className='border-t border-gray-200 my-4'></div>
      <ItemsList data={props.receiptData.items} />
      <div className='border-t border-gray-200 my-4'></div>
      <TotalSection
        subTotal={props.receiptData.subtotal}
        discount={props.receiptData.discount}
        tax={0}
        total={props.receiptData.total}
      />
      <PaymentInfo
        amountReceived={props.receiptData.amountReceived}
        change={props.receiptData.change}
      />
      <PaymentMethod method={props.receiptData.paymentMethod} />
      <div className='border-t border-gray-200 my-4'></div>
      <ThankYouMessage />
      <BarCode transactionId={props.receiptData.transactionId} />
    </Card>
  </div>
));

ReceiptContent.displayName = 'ReceiptContent';

export default function BarReceipt(props: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `PauseInnBar_Reçu_${props.transactionId}`,
    removeAfterPrint: true,
    onAfterPrint: props.onAfterPrint,
  });

  return (
    <div>
      <div>
        <ReceiptContent
          ref={receiptRef}
          receiptSize='80mm'
          receiptData={props}
        />
      </div>

      <Button
        onClick={handlePrint}
        className='w-full rounded-full py-6 text-base  text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-linear font-normal'
      >
        <Printer strokeWidth={1} className='mr-2 h-5 w-5' /> Imprimer le reçu
      </Button>
    </div>
  );
}
