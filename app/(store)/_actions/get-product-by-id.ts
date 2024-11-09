'use server';

import prisma from '@/prisma/client';
import { InventoryProduct, Product, ServicesProduct } from '@prisma/client';

// Start of Selection
type Response = {
  success: boolean;
  message: string;
  data?: Product & {
    inventory_products: InventoryProduct[];
    services_products: ServicesProduct[];
  };
};

const getProductById = async (id: string): Promise<Response> => {
  // Validate input
  if (!id || typeof id !== 'string') {
    return {
      success: false,
      message: 'Invalid product ID',
    };
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        inventory_products: true,
        services_products: true,
      },
    });

    if (!product) {
      return {
        success: false,
        message: 'Product not found',
      };
    }

    return {
      success: true,
      message: 'Product found',
      data: product,
    };
  } catch (error) {
    console.error('Error fetching product:', error); // Logs error for debugging
    return {
      success: false,
      message: 'An unexpected error occurred while fetching the product',
    };
  }
};

export default getProductById;
