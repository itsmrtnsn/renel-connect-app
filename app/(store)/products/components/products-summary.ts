// Start of Selection
'use server';

import prisma from '@/prisma/client';

const productSummary = async () => {
  try {
    const totalProducts = await prisma.product.count();
    const inventoryProducts = await prisma.product.count({
      where: { type: 'INVENTORY' },
    });
    const nonInventoryProducts = await prisma.product.count({
      where: { type: 'NON_INVENTORY' },
    });
    const servicesProducts = await prisma.product.count({
      where: { type: 'SERVICES' },
    });

    return {
      success: true,
      totalProducts,
      inventoryProducts,
      nonInventoryProducts,
      servicesProducts,
      message: 'Product summary calculated successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Error calculating product summary: ${String(error)}`,
    };
  }
};

export default productSummary;
