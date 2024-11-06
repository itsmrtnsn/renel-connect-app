import { IdOption } from '@prisma/client';

const identificationCardOtions: {
  id: string;
  label: string;
  value: IdOption;
}[] = [
  { id: 'P', label: 'Passeport', value: 'passport' },
  { id: 'dv', label: 'Permis de conduire', value: 'drivers_license' },
  { id: 'si', label: `Carte d'étudiant`, value: 'student_id' },
  {
    id: 'gi',
    label: `Carte D'identification Nationale`,
    value: `goverment_issued_id`,
  },
];
export default identificationCardOtions;
