'use server';

import prisma from '@/prisma/client';

export type Items = {
  id: string;
  name: string;
  selling_Price: number;
  category: string;
  quantityInStock: number;
};

const getItems = async ({
  search = '',
  page = 1,
  pageSize = 10,
}: {
  search?: string;
  page?: number;
  pageSize?: number;
} = {}): Promise<Items[]> => {
  try {
    const skip = (page - 1) * pageSize;

    const productsRaw = await prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        OR: search
          ? [
              { name: { contains: search, mode: 'insensitive' } },
              { sku: { contains: search } },
            ]
          : undefined,
      },
      select: {
        id: true,
        name: true,
        selling_price: true,
        type: true,
        category: {
          select: {
            name: true,
          },
        },
        purchases: {
          select: {
            quantity: true,
          },
        },
      },
      skip,
      take: pageSize,
    });

    const products = productsRaw.map((product) => ({
      id: product.id,
      name: product.name,
      selling_Price: product.selling_price,
      category: product.category.name,
      quantityInStock:
        product.type !== 'INVENTORY'
          ? 999999
          : product.purchases.reduce(
              (total, purchase) => total + purchase.quantity,
              0
            ),
    }));

    return products;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw new Error('Failed to retrieve items. Please try again later.');
  }
};

export default getItems;
