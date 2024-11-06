'use server';

import prisma from '@/prisma/client';

const salesItemsReport = async () => {
  try {
    const salesItems = await prisma.saleItem.groupBy({
      by: ['product_id'],
      _sum: {
        quantity: true, // Total quantity sold
        selling_price: true, // Total revenue (sum of sale prices)
        // discount: true, // Sum of all discounts applied, if applicable
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

    const productIds = salesItems.map((item) => item.product_id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true },
    });

    const productsMap = new Map(products.map((p) => [p.id, p.name]));

    const report = salesItems.map((item) => {
      const totalRevenue = item._sum?.selling_price;
      const productName = productsMap.get(item.product_id) || 'Unknown';

      return {
        productName,
        totalItemsBought: item._sum.quantity,
        totalSalesCount: item._count._all,
        averageUnitPrice: item._avg.selling_price?.toFixed(0),
        totalRevenue,
        // totalDiscount: item._sum.discount || 0,
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