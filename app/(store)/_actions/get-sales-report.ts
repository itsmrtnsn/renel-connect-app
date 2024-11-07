// Start of Selection
'use server';

import prisma from '@/prisma/client';
import { SaleCategory } from '@prisma/client';

const getSalesReport = async (
  searchQuery = '',
  page = 1,
  itemsPerPage = 10,
  category?: SaleCategory,
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
    const skip = (page - 1) * itemsPerPage;
    const sales = await prisma.sale.findMany({
      where: {
        AND: [
          {
            OR: [
              { reference: { startsWith: searchQuery } },
              { cashier_id: { contains: searchQuery, mode: 'insensitive' } },
            ],
          },
          category ? { category: category } : {}, // Apply category filter if provided
          {
            created_at: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
      select: {
        id: true,
        reference: true,
        total: true,
        created_at: true,
        cashier_id: true,
        category: true,
      },
      skip,
      take: itemsPerPage,
    });

    const totalSalesCount = await prisma.sale.count({
      where: {
        AND: [
          {
            OR: [
              { reference: { contains: searchQuery } },
              { cashier_id: { contains: searchQuery } },
            ],
          },
          category ? { category: category } : {},
          {
            created_at: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
    });

    const totalPage = Math.ceil(totalSalesCount / itemsPerPage);
    const totalRevenue = sales.reduce((total, sale) => total + sale.total, 0);

    return { sales, totalSalesCount, totalPage, totalRevenue };
  } catch (error) {
    console.error(error);
    return { sales: [], totalSalesCount: 0, totalPage: 0, totalRevenue: 0 };
  }
};

export default getSalesReport;
