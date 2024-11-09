'use server';

import prisma from '@/prisma/client';
import {
  PurchaseFormData,
  purchaseSchema,
} from '../purchases/components/create-purchase-schema';
import { revalidatePath } from 'next/cache';

const createPurchase = async (data: PurchaseFormData) => {
  // Validate input data against schema
  const validation = purchaseSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      message: 'Invalid purchase data',
      errors: validation.error.format(), // Provide detailed validation errors
    };
  }

  try {
    const {
      product_id,
      purchase_date,
      cost_price,
      quantity_bought,
      supplier_id,
      expiry_date,
    } = data;

    const purchase = await prisma.purchase.create({
      data: {
        product_id,
        purchase_date,
        unit_cost: cost_price,
        quantity: quantity_bought,
        supplier_id,
        total_cost: cost_price * quantity_bought,
        expiry_date: expiry_date ?? new Date('9999-12-31'),
      },
    });

    revalidatePath('/products'); // Revalidate the purchases page
    return {
      success: true,
      data: purchase,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create purchase. Please try again later. ${String(
        error
      )}`,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export default createPurchase;
