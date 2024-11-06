'use server';

import prisma from '@/prisma/client';

interface GetCustomersOptions {
  search?: string;
  page?: number;
  pageSize?: number;
}

const getCustomers = async ({
  search = '',
  page = 1,
  pageSize = 10,
}: GetCustomersOptions = {}) => {
  try {
    // Calculate pagination offset
    const skip = (page - 1) * pageSize;

    // Query customers with optional search filter and pagination
    const customers = await prisma.customer.findMany({
      where: search
        ? {
            OR: [
              { first_name: { contains: search } },
              { last_name: { contains: search } },
              { email: { contains: search } },
              { phone_number: { contains: search } },
            ],
          }
        : undefined,
      skip,
      take: pageSize,
    });

    // Get total count for pagination purposes
    const totalItems = await prisma.customer.count({
      where: search
        ? {
            OR: [
              { first_name: { contains: search } },
              { last_name: { contains: search } },
              { email: { contains: search } },
              { phone_number: { contains: search } },
            ],
          }
        : undefined,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      success: true,
      data: customers,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems,
        totalPages,
      },
    };
  } catch (error) {
    console.error('Error fetching customers:', error);
    return {
      success: false,
      message: 'Failed to retrieve customers. Please try again later.',
    };
  }
};

export default getCustomers;
