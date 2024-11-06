'use server';

import prisma from '@/prisma/client';
import {
  CreateProductCategoryFormData,
  createProductCategorySchema,
} from './create-category-schema';
import { revalidatePath } from 'next/cache';

const createCategory = async (data: CreateProductCategoryFormData) => {
  const result = createProductCategorySchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: true,
      message: result.error.errors.map((err) => err.message).join(', '),
    };
  }

  try {
    const uniqueCategory = await prisma.category.findFirst({
      where: { slug: data.name.toLowerCase().replace(/ /g, '-') },
    });

    if (uniqueCategory) {
      return {
        success: false,
        message: 'Category already exists',
      };
    }

    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.name.toLowerCase().replace(/ /g, '-'),
      },
    });

    revalidatePath('/products/new');
    return {
      success: true,
      message: `${newCategory.name} successfully added as a Category`,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: `Unable to create category - ${String(error)}`,
    };
  }
};

export default createCategory;
