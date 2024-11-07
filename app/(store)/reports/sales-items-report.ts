// Start of Selection
'use server';

import prisma from '@/prisma/client';

const salesItemsReport = async (
  productName?: string,
  startDate?: Date,
  endDate?: Date
) => {
  const currentDate = new Date();

  // Ensure startDate is set to 00:00:00.000 of the provided date or current date
  if (startDate) {
    startDate.setHours(0, 0, 0, 0);
  } else {
    startDate = new Date(currentDate.setHours(0, 0, 0, 0));
  }

  // Ensure endDate is set to 23:59:59.999 of the provided date or current date
  if (endDate) {
    endDate.setHours(23, 59, 59, 999);
  } else {
    endDate = new Date(currentDate.setHours(23, 59, 59, 999));
  }

  try {
    // Find product IDs matching the product name, if provided
    let productFilter = {};
    if (productName) {
      const matchedProducts = await prisma.product.findMany({
        where: {
          name: {
            contains: productName,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
        },
      });
      const matchedProductIds = matchedProducts.map((p) => p.id);
      if (matchedProductIds.length === 0) {
        // No products match the search, return empty report
        return [];
      }
      productFilter = { product_id: { in: matchedProductIds } };
    }

    // Build date range filter
    const dateFilter = {
      created_at: {
        gte: startDate,
        lte: endDate,
      },
    };

    // Combine filters
    const combinedFilter = {
      ...productFilter,
      ...dateFilter,
    };

    const salesItems = await prisma.saleItem.groupBy({
      by: ['product_id'],
      where:
        Object.keys(combinedFilter).length > 0 ? combinedFilter : undefined,
      _sum: {
        quantity: true, // Total quantity sold
      },
      _avg: {
        selling_price: true, // Average unit price
      },
      _count: {
        _all: true, // Total sales count
      },
      _min: {
        created_at: true, // First sale date
      },
      _max: {
        created_at: true, // Last sale date
      },
    });

    if (salesItems.length === 0) {
      // No sales items match the filters
      return [];
    }

    const productIds = salesItems.map((item) => item.product_id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true },
    });

    const productsMap = new Map(products.map((p) => [p.id, p.name]));

    const report = salesItems.map((item) => {
      const totalItemsBought = item._sum.quantity;
      const averageUnitPrice = item._avg.selling_price;
      const totalRevenue = totalItemsBought! * (averageUnitPrice || 0);
      const productName = productsMap.get(item.product_id) || 'Unknown';

      return {
        productName,
        totalItemsBought,
        totalSalesCount: item._count._all,
        averageUnitPrice,
        totalRevenue,
        firstSaleDate: item._min.created_at,
        lastSaleDate: item._max.created_at,
      };
    });

    return report;
  } catch (error) {
    console.error('Error generating sales items report:', error);
    throw error;
  }
};

export default salesItemsReport;
