import { z } from 'zod';

export const createProductCategorySchema = z.object({
  name: z
    .string({ required_error: 'Le nom de la catégorie est obligatoire' })
    .min(3, { message: 'Fournir un nom de catégorie valide' })
    .max(50, { message: 'Nom de catégorie non valide' }),
});

export type CreateProductCategoryFormData = z.infer<
  typeof createProductCategorySchema
>;
