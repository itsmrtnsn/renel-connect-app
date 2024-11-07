// Start of Selection
'use server';

import prisma from '@/prisma/client';

const getReportSummary = async (startDate?: Date, endDate?: Date) => {
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
    const totalSales = await prisma.sale.count({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const revenue = await prisma.sale.aggregate({
      _sum: {
        total: true,
      },
      _avg: {
        total: true,
      },
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const newCustomers = await prisma.customer.count({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const salesByCategory = await prisma.sale.groupBy({
      by: ['category'], // Grouping directly by the 'category' field
      _sum: {
        total: true,
      },
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const salesByCategoryFormatted = salesByCategory.map((sale) => ({
      name: sale.category,
      value: sale._sum.total || 0,
    }));

    return {
      success: true,
      data: {
        totalSales,
        totalRevenue: revenue._sum.total || 0,
        averageOrderValue: revenue._avg.total?.toFixed(0) || '0',
        newCustomers,
        salesByCategory: salesByCategoryFormatted,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Unable to fetch reports',
      data: {},
    };
  }
};

export default getReportSummary;
