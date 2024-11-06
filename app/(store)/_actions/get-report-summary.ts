'use server';

import prisma from '@/prisma/client';

const getReportSummary = async (startDate?: Date, endDate?: Date) => {
  const currentDate = new Date();
  startDate = startDate || new Date(currentDate.setHours(0, 0, 0, 0));
  endDate = endDate || new Date(currentDate.setHours(23, 59, 59, 999));

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
      sucess: true,
      data: {
        totalSales,
        totalRevenue: revenue._sum.total || 0,
        averageOrderValue: revenue._avg.total?.toFixed(0) || 0,
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
