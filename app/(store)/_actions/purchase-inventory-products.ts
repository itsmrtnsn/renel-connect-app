'use server';

import prisma from '@/prisma/client';
interface InventoryProductsOptions {
  search?: string;
  page?: number;
  pageSize?: number;
}
export type PurchaseInventoryProductsResponse = {
  statusCode: number;
  body: {
    message: string;
  };
  products?: {
    id: string;
    name: string;
  }[];
};

const purchaseInventoryProducts = async (
  options: InventoryProductsOptions = {}
): Promise<PurchaseInventoryProductsResponse> => {
  const { search = '', page = 1, pageSize = 10 } = options;

  try {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const inventoryProducts = await prisma.product.findMany({
      where: {
        type: 'INVENTORY',
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
      },
      skip,
      take,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Inventory products purchased successfully',
      },
      products: inventoryProducts,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        message: `Failed to purchase inventory products due to an error - ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
    };
  }
};

export default purchaseInventoryProducts;
