import { ITypePlat } from 'app/entities/type-plat/type-plat.model';

export interface IPlat {
  id: number;
  nom?: string | null;
  prix?: number | null;
  description?: string | null;
  typePlat?: Pick<ITypePlat, 'id'> | null;
}

export type NewPlat = Omit<IPlat, 'id'> & { id: null };
