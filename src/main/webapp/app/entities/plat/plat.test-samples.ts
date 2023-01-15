import { IPlat, NewPlat } from './plat.model';

export const sampleWithRequiredData: IPlat = {
  id: 26319,
};

export const sampleWithPartialData: IPlat = {
  id: 57524,
  nom: 'deposit',
  description: 'Chair override',
};

export const sampleWithFullData: IPlat = {
  id: 3567,
  nom: 'connect',
  prix: 29256,
  description: 'invoice Sharable',
};

export const sampleWithNewData: NewPlat = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
