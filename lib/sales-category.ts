import { SaleCategory } from '@prisma/client';

export const SalesCategories: {
  name: string;
  value: SaleCategory;
  id: number;
}[] = [
  { id: 1, name: 'Nourriture', value: 'FOOD' },
  { id: 2, name: 'Boisson', value: 'DRINK' },
  { id: 3, name: 'Chambre', value: 'ROOM' },
  { id: 4, name: 'Autre', value: 'OTHER' },
];
