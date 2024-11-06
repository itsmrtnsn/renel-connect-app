import prisma from '@/prisma/client';
import { Prisma, ProductStatus } from '@prisma/client';

export interface InventoryProduct {
  id: string;
  name: string;
  category: string;
  sellingPrice: number;
  status: ProductStatus;
  sku: string;
  averageCostPrice: number;
  stockLevel: number;
}

interface InventoryProductsOptions {
  search?: string;
  page?: number;
  pageSize?: number;
}

const inventoryProducts = async (options: InventoryProductsOptions = {}) => {
  const { search, page = 1, pageSize = 10 } = options;

  // Validate pagination parameters
  if (page < 1 || pageSize < 1 || pageSize > 100) {
    throw new Error('Invalid pagination parameters.');
  }

  try {
    // Calculate pagination offsets
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build search filter for name or SKU
    const searchFilter = search
      ? {
          OR: [{ name: { contains: search } }, { sku: { contains: search } }],
        }
      : {};

    // Define the start and end of the current year in UTC
    const currentYear = new Date().getUTCFullYear();
    const startOfYear = new Date(Date.UTC(currentYear, 0, 1));
    const endOfYear = new Date(Date.UTC(currentYear + 1, 0, 1));

    // Fetch products with filtering, searching, and pagination
    const products = await prisma.product.findMany({
      where: {
        type: 'INVENTORY',
        ...searchFilter,
      },
      select: {
        id: true,
        name: true,
        selling_price: true,
        status: true,
        sku: true,
        category: { select: { name: true } },
        purchases: {
          select: {
            quantity: true,
            unit_cost: true,
            purchase_date: true,
          },
          where: {
            created_at: {
              gte: startOfYear,
              lt: endOfYear,
            },
          },
        },
      },
      skip,
      take,
    });

    // Calculate average cost price and total stock level for each product
    const productData: InventoryProduct[] = products.map((product) => {
      const totalCost = product.purchases.reduce(
        (sum, purchase) => sum + purchase.unit_cost * purchase.quantity,
        0
      );
      const totalQuantity = product.purchases.reduce(
        (sum, purchase) => sum + purchase.quantity,
        0
      );

      const averageCostPrice =
        totalQuantity > 0 ? totalCost / totalQuantity : 0;

      return {
        id: product.id,
        name: product.name,
        category: product.category?.name ?? 'Uncategorized',
        sellingPrice: product.selling_price,
        status: product.status,
        sku: product.sku,
        averageCostPrice,
        stockLevel: totalQuantity,
      };
    });

    // Get total count for pagination metadata
    const totalProducts = await prisma.product.count({
      where: {
        type: 'INVENTORY',
        ...searchFilter,
      },
    });

    const totalPages = Math.ceil(totalProducts / pageSize);

    return {
      data: productData || [],
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        pageSize,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error fetching inventory products:', error);
    } else {
      console.error('Unexpected error fetching inventory products:', error);
    }
    throw new Error(
      'An error occurred while fetching inventory products. Please try again later.'
    );
  }
};

export default inventoryProducts;
