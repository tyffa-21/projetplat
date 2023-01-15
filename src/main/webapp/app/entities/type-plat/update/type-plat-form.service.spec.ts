import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../type-plat.test-samples';

import { TypePlatFormService } from './type-plat-form.service';

describe('TypePlat Form Service', () => {
  let service: TypePlatFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePlatFormService);
  });

  describe('Service methods', () => {
    describe('createTypePlatFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTypePlatFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            libelle: expect.any(Object),
          })
        );
      });

      it('passing ITypePlat should create a new form with FormGroup', () => {
        const formGroup = service.createTypePlatFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            libelle: expect.any(Object),
          })
        );
      });
    });

    describe('getTypePlat', () => {
      it('should return NewTypePlat for default TypePlat initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTypePlatFormGroup(sampleWithNewData);

        const typePlat = service.getTypePlat(formGroup) as any;

        expect(typePlat).toMatchObject(sampleWithNewData);
      });

      it('should return NewTypePlat for empty TypePlat initial value', () => {
        const formGroup = service.createTypePlatFormGroup();

        const typePlat = service.getTypePlat(formGroup) as any;

        expect(typePlat).toMatchObject({});
      });

      it('should return ITypePlat', () => {
        const formGroup = service.createTypePlatFormGroup(sampleWithRequiredData);

        const typePlat = service.getTypePlat(formGroup) as any;

        expect(typePlat).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITypePlat should not enable id FormControl', () => {
        const formGroup = service.createTypePlatFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTypePlat should disable id FormControl', () => {
        const formGroup = service.createTypePlatFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
