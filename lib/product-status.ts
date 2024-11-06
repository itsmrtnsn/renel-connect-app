import { ProductStatus } from '@prisma/client';

export const productStatus: {
  id: number;
  key: string;
  value: ProductStatus;
}[] = [
  { id: 1, key: 'Actif', value: 'ACTIVE' },
  { id: 2, key: 'Inactif', value: 'INACTIVE' },
  { id: 3, key: 'Brouillon', value: 'DRAFT' },
  { id: 4, key: 'Archivé', value: 'ARCHIVED' },
];
