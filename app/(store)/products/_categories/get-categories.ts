'use server';

import prisma from '@/prisma/client';
export type Category = {
  id: string;
  name: string;
  slug: string;
};

interface GetCategoryOptions {
  search?: string;
  page?: number;
  pageSize?: number;
}

const getCategories = async ({
  search = '',
  page = 1,
  pageSize = 10,
}: GetCategoryOptions = {}) => {
  const skip = (page - 1) * pageSize;

  try {
    const categories: Category[] = await prisma.category.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { slug: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      skip,
      take: pageSize,
    });

    return { success: true, data: categories };
  } catch (error: unknown) {
    return {
      success: false,
      message: `Unable to fetch categories - ${String(error)}`,
    };
  }
};

export default getCategories;
