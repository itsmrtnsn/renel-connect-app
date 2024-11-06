'use server';

import prisma from '@/prisma/client';
export type Category = {
  id: string;
  name: string;
  slug: string;
};

const getCategories = async () => {
  try {
    const categories: Category[] = await prisma.category.findMany({
      select: { id: true, name: true, slug: true },
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
