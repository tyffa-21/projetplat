import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypePlat } from '../type-plat.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../type-plat.test-samples';

import { TypePlatService } from './type-plat.service';

const requireRestSample: ITypePlat = {
  ...sampleWithRequiredData,
};

describe('TypePlat Service', () => {
  let service: TypePlatService;
  let httpMock: HttpTestingController;
  let expectedResult: ITypePlat | ITypePlat[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TypePlatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a TypePlat', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const typePlat = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(typePlat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TypePlat', () => {
      const typePlat = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(typePlat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TypePlat', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TypePlat', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TypePlat', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTypePlatToCollectionIfMissing', () => {
      it('should add a TypePlat to an empty array', () => {
        const typePlat: ITypePlat = sampleWithRequiredData;
        expectedResult = service.addTypePlatToCollectionIfMissing([], typePlat);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typePlat);
      });

      it('should not add a TypePlat to an array that contains it', () => {
        const typePlat: ITypePlat = sampleWithRequiredData;
        const typePlatCollection: ITypePlat[] = [
          {
            ...typePlat,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTypePlatToCollectionIfMissing(typePlatCollection, typePlat);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TypePlat to an array that doesn't contain it", () => {
        const typePlat: ITypePlat = sampleWithRequiredData;
        const typePlatCollection: ITypePlat[] = [sampleWithPartialData];
        expectedResult = service.addTypePlatToCollectionIfMissing(typePlatCollection, typePlat);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typePlat);
      });

      it('should add only unique TypePlat to an array', () => {
        const typePlatArray: ITypePlat[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const typePlatCollection: ITypePlat[] = [sampleWithRequiredData];
        expectedResult = service.addTypePlatToCollectionIfMissing(typePlatCollection, ...typePlatArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const typePlat: ITypePlat = sampleWithRequiredData;
        const typePlat2: ITypePlat = sampleWithPartialData;
        expectedResult = service.addTypePlatToCollectionIfMissing([], typePlat, typePlat2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typePlat);
        expect(expectedResult).toContain(typePlat2);
      });

      it('should accept null and undefined values', () => {
        const typePlat: ITypePlat = sampleWithRequiredData;
        expectedResult = service.addTypePlatToCollectionIfMissing([], null, typePlat, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typePlat);
      });

      it('should return initial array if no TypePlat is added', () => {
        const typePlatCollection: ITypePlat[] = [sampleWithRequiredData];
        expectedResult = service.addTypePlatToCollectionIfMissing(typePlatCollection, undefined, null);
        expect(expectedResult).toEqual(typePlatCollection);
      });
    });

    describe('compareTypePlat', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTypePlat(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTypePlat(entity1, entity2);
        const compareResult2 = service.compareTypePlat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTypePlat(entity1, entity2);
        const compareResult2 = service.compareTypePlat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTypePlat(entity1, entity2);
        const compareResult2 = service.compareTypePlat(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
