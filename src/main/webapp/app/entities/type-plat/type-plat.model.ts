export interface ITypePlat {
  id: number;
  libelle?: string | null;
}

export type NewTypePlat = Omit<ITypePlat, 'id'> & { id: null };
