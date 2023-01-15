import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPlat } from '../plat.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../plat.test-samples';

import { PlatService } from './plat.service';

const requireRestSample: IPlat = {
  ...sampleWithRequiredData,
};

describe('Plat Service', () => {
  let service: PlatService;
  let httpMock: HttpTestingController;
  let expectedResult: IPlat | IPlat[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PlatService);
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

    it('should create a Plat', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const plat = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(plat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Plat', () => {
      const plat = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(plat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Plat', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Plat', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Plat', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPlatToCollectionIfMissing', () => {
      it('should add a Plat to an empty array', () => {
        const plat: IPlat = sampleWithRequiredData;
        expectedResult = service.addPlatToCollectionIfMissing([], plat);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(plat);
      });

      it('should not add a Plat to an array that contains it', () => {
        const plat: IPlat = sampleWithRequiredData;
        const platCollection: IPlat[] = [
          {
            ...plat,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPlatToCollectionIfMissing(platCollection, plat);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Plat to an array that doesn't contain it", () => {
        const plat: IPlat = sampleWithRequiredData;
        const platCollection: IPlat[] = [sampleWithPartialData];
        expectedResult = service.addPlatToCollectionIfMissing(platCollection, plat);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(plat);
      });

      it('should add only unique Plat to an array', () => {
        const platArray: IPlat[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const platCollection: IPlat[] = [sampleWithRequiredData];
        expectedResult = service.addPlatToCollectionIfMissing(platCollection, ...platArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const plat: IPlat = sampleWithRequiredData;
        const plat2: IPlat = sampleWithPartialData;
        expectedResult = service.addPlatToCollectionIfMissing([], plat, plat2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(plat);
        expect(expectedResult).toContain(plat2);
      });

      it('should accept null and undefined values', () => {
        const plat: IPlat = sampleWithRequiredData;
        expectedResult = service.addPlatToCollectionIfMissing([], null, plat, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(plat);
      });

      it('should return initial array if no Plat is added', () => {
        const platCollection: IPlat[] = [sampleWithRequiredData];
        expectedResult = service.addPlatToCollectionIfMissing(platCollection, undefined, null);
        expect(expectedResult).toEqual(platCollection);
      });
    });

    describe('comparePlat', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePlat(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePlat(entity1, entity2);
        const compareResult2 = service.comparePlat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePlat(entity1, entity2);
        const compareResult2 = service.comparePlat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePlat(entity1, entity2);
        const compareResult2 = service.comparePlat(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
