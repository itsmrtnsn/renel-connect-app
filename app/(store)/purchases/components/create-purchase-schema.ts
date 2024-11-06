import { z } from 'zod';

export const purchaseSchema = z.object({
  product_id: z.string({ required_error: 'Le produit est requis' }).min(8, {
    message: 'Sélectionnez un produit valide',
  }),
  cost_price: z
    .number({ required_error: 'Le prix de revient est requis' })
    .positive('Le prix de revient doit être supérieur à 0'),

  quantity_bought: z
    .number({ required_error: 'La quantité en stock est requise' })
    .positive('La quantité doit être une valeur positive'),
  expiry_date: z.date().optional(),
  purchase_date: z.date({ required_error: "La date d'achat est requise" }),
  supplier_id: z
    .string({ required_error: 'Sélectionnez un fournisseur valides' })
    .min(8, {
      message: 'Sélectionnez un fournisseur valide',
    }),
});

export type PurchaseFormData = z.infer<typeof purchaseSchema>;
