import { z } from 'zod';

const productStatus = ['ACTIVE', 'INACTIVE', 'DRAFT', 'ARCHIVED'] as const;

export const InventorySchema = z.object({
  name: z
    .string({ required_error: 'Le nom du produit est requis' })
    .min(3, {
      message: 'Le nom du produit doit comporter au moins 3 caractères',
    })
    .max(50, {
      message: 'Le nom du produit ne peut pas comporter plus de 50 caractères',
    }),
  sku: z
    .string()
    .min(8, { message: 'Le SKU est requis' })
    .max(20, { message: 'Le SKU ne peut pas comporter plus de 10 caractères' })
    .optional(),
  category_id: z
    .string({ required_error: 'La catégorie du produit est requise' })
    .min(8, { message: 'La catégorie doit comporter au moins 8 caractères' }),
  selling_price: z
    .number({ required_error: 'Le prix de vente est requis' })
    .positive('Le prix de vente doit être supérieur à 0'),
  product_type: z.literal('INVENTORY', {
    message: 'Le type de produit doit être Inventaire',
  }),
  status: z.enum(productStatus, {
    errorMap: () => ({
      message: `Le statut du produit doit être une des valeurs suivantes : ${productStatus.join(
        ', '
      )}`,
    }),
  }),
  // cost_price: z
  //   .number({ required_error: 'Le prix de revient est requis' })
  //   .positive('Le prix de revient doit être supérieur à 0'),
  // quantity_in_stock: z
  //   .number({ required_error: 'La quantité en stock est requise' })
  //   .positive('La quantité doit être une valeur positive'),
  // expiry_date: z.date().optional(),
  threshold: z
    .number({ required_error: 'Le seuil est requis' })
    .positive('Le seuil doit être une valeur positive'),
  // storage_location: z.string().optional(),
  // supplier_id: z
  //   .string({ required_error: 'Sélectionnez un fournisseur valides' })
  //   .min(8, {
  //     message: 'Sélectionnez un fournisseur valide',
  //   }),
});

export const ServiceSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Le nom du produit doit comporter au moins 3 caractères',
    })
    .max(50, {
      message: 'Le nom du produit ne peut pas comporter plus de 50 caractères',
    }),
  sku: z
    .string()
    .min(8, { message: 'Le SKU est requis' })
    .max(20, { message: 'Le SKU ne peut pas comporter plus de 10 caractères' })
    .optional(),
  category_id: z.string({
    required_error: 'La catégorie du produit est requise',
  }),
  selling_price: z
    .number()
    .positive('Le prix de vente doit être supérieur à 0'),
  product_type: z.literal('SERVICES', {
    message: 'Le type de produit doit être Services',
  }),
  status: z.enum(productStatus, {
    errorMap: () => ({
      message: `Le statut du produit doit être une des valeurs suivantes : ${productStatus.join(
        ', '
      )}`,
    }),
  }),
  service_duration: z
    .number()
    .positive('La durée du service doit être supérieure à 0'),
  service_location: z.string({
    required_error: 'Le lieu du service est requis',
  }),
});

export const NonInventorySchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Le nom du produit doit comporter au moins 3 caractères',
    })
    .max(50, {
      message: 'Le nom du produit ne peut pas comporter plus de 50 caractères',
    }),
  sku: z
    .string()
    .min(8, { message: 'Le SKU est requis' })
    .max(20, { message: 'Le SKU ne peut pas comporter plus de 10 caractères' })
    .optional(),
  category_id: z.string({
    required_error: 'La catégorie du produit est requise',
  }),
  selling_price: z
    .number()
    .positive('Le prix de vente doit être supérieur à 0'),
  product_type: z.literal('NON_INVENTORY', {
    message: 'Le type de produit doit être Non-Inventaire',
  }),
  status: z.enum(productStatus, {
    errorMap: () => ({
      message: `Le statut du produit doit être une des valeurs suivantes : ${productStatus.join(
        ', '
      )}`,
    }),
  }),
});

export type NonInventoryFormData = z.infer<typeof NonInventorySchema>;
export type ServiceFormData = z.infer<typeof ServiceSchema>;
export type InventoryFormData = z.infer<typeof InventorySchema>;
