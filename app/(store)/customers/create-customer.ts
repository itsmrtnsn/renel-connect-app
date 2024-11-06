'use server';

import prisma from '@/prisma/client';
import createCustomerSchema, {
  createCustomerFormData,
} from './create-customer-schema';
import { IdOption } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const createCustomer = async (data: createCustomerFormData) => {
  // Validate input data against the schema
  const validationResult = createCustomerSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      success: false,
      message: 'Invalid data',
      errors: validationResult.error,
    };
  }

  try {
    // Check for existing customer with the same email, phone, or ID number
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        OR: [
          { email: data.email },
          { phone_number: data.phoneNumber },
          { id_number: data.idNumber },
        ],
      },
    });

    if (existingCustomer) {
      // Determine which field is causing the conflict for better feedback
      const conflictMessage =
        existingCustomer.email === data.email
          ? 'Email already exists'
          : existingCustomer.phone_number === data.phoneNumber
          ? 'Phone number already exists'
          : 'ID number already exists';

      return { success: false, message: conflictMessage };
    }

    // Create the new customer
    const customer = await prisma.customer.create({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_number: data.phoneNumber,
        birth_date: data.birthDate,
        gender: data.gender,
        idType: data.idType as IdOption,
        id_number: data.idNumber,
      },
    });

    revalidatePath('/customers');
    revalidatePath('/customers/pos');

    return {
      success: true,
      data: customer,
      message: 'Customer created successfully',
    };
  } catch (error) {
    console.error('Error creating customer:', error);
    return {
      success: false,
      message: 'An error occurred while creating the customer',
    };
  }
};

export default createCustomer;
