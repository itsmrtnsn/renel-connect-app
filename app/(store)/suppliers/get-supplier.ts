'use server';

import prisma from '@/prisma/client';

interface GetSupplierOptions {
  search?: string;
  page?: number;
  pageSize?: number;
}

const getSupplier = async ({
  search = '',
  page = 1,
  pageSize = 10,
}: GetSupplierOptions = {}) => {
  try {
    // Calculate pagination offset
    const skip = (page - 1) * pageSize;

    // Query suppliers with optional search filter and pagination
    const suppliers = await prisma.supplier.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search } },

              { email: { contains: search } },
            ],
          }
        : undefined,
      skip,
      take: pageSize,
    });

    // Get total count for pagination purposes
    const totalItems = await prisma.supplier.count({
      where: search
        ? {
            OR: [
              { name: { contains: search } },

              { email: { contains: search } },
            ],
          }
        : undefined,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      success: true,
      data: suppliers,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems,
        totalPages,
      },
    };
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return {
      success: false,
      message: 'Failed to retrieve suppliers. Please try again later.',
    };
  }
};

export default getSupplier;
