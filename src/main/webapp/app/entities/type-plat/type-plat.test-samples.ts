import { ITypePlat, NewTypePlat } from './type-plat.model';

export const sampleWithRequiredData: ITypePlat = {
  id: 9409,
};

export const sampleWithPartialData: ITypePlat = {
  id: 99051,
  libelle: 'Fantastic Shoes',
};

export const sampleWithFullData: ITypePlat = {
  id: 53321,
  libelle: 'Chips maximize EXE',
};

export const sampleWithNewData: NewTypePlat = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
