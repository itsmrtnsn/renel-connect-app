'use server';

import { ProductType } from '@prisma/client';
import {
  InventoryFormData,
  InventorySchema,
  NonInventoryFormData,
  NonInventorySchema,
  ServiceFormData,
  ServiceSchema,
} from './product-schema';
import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';

const createProduct = async (data: unknown, productType: ProductType) => {
  let result;

  if (productType === 'INVENTORY') {
    result = InventorySchema.safeParse(data);
  } else if (productType === 'NON_INVENTORY') {
    result = NonInventorySchema.safeParse(data);
  } else if (productType === 'SERVICES') {
    result = ServiceSchema.safeParse(data);
  }

  if (!result?.success) {
    return {
      success: false,
      errors: true,
      message: result?.error.errors.map((err) => err.message).join(', '),
    };
  }

  try {
    // create inventory products
    if (productType === 'INVENTORY') {
      const inventoryData = result.data as InventoryFormData;
      const inventoryProduct = await prisma.product.create({
        data: {
          sku: inventoryData.sku,
          category_id: inventoryData.category_id,
          name: inventoryData.name,
          selling_price: inventoryData.selling_price,
          status: inventoryData.status,
          type: productType,
          slug: inventoryData.name.toLowerCase().replace(/ /g, '-'),
        },
      });

      await prisma.inventoryProduct.create({
        data: {
          product_id: inventoryProduct.id,
          reorder_level: inventoryData.threshold,
        },
      });

      return {
        success: true,
        data: inventoryProduct,
        message: 'Product created succesfully',
      };
    }

    // create non-inventory products

    if (productType === 'NON_INVENTORY') {
      const nonInventoryData = result.data as NonInventoryFormData;
      const nonInventoryProduct = await prisma.product.create({
        data: {
          sku: nonInventoryData.sku,
          category_id: nonInventoryData.category_id,
          name: nonInventoryData.name,
          selling_price: nonInventoryData.selling_price,
          status: nonInventoryData.status,
          type: productType,
          slug: nonInventoryData.name.toLowerCase().replace(/ /g, '-'),
        },
      });

      return {
        success: true,
        data: nonInventoryProduct,
        message: 'Product created succesfully',
      };
    }

    // create services products
    if (productType === 'SERVICES') {
      const serviceData = result.data as ServiceFormData;
      const servicesProduct = await prisma.product.create({
        data: {
          sku: serviceData.sku,
          category_id: serviceData.category_id,
          name: serviceData.name,
          selling_price: serviceData.selling_price,
          status: serviceData.status,
          type: productType,
          slug: serviceData.name.toLowerCase().replace(/ /g, '-'),
        },
      });

      await prisma.servicesProduct.create({
        data: {
          product_id: servicesProduct.id,
          service_duration: serviceData.service_duration,
          service_location: serviceData.service_location,
        },
      });

      return {
        success: true,
        data: servicesProduct,
        message: 'created',
      };
    }
    revalidatePath('/products');
  } catch (error) {
    return { success: false, message: `${String(error)}` };
  }
};

export default createProduct;
