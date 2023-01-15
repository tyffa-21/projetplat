import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../plat.test-samples';

import { PlatFormService } from './plat-form.service';

describe('Plat Form Service', () => {
  let service: PlatFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatFormService);
  });

  describe('Service methods', () => {
    describe('createPlatFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPlatFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            prix: expect.any(Object),
            description: expect.any(Object),
            typePlat: expect.any(Object),
          })
        );
      });

      it('passing IPlat should create a new form with FormGroup', () => {
        const formGroup = service.createPlatFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nom: expect.any(Object),
            prix: expect.any(Object),
            description: expect.any(Object),
            typePlat: expect.any(Object),
          })
        );
      });
    });

    describe('getPlat', () => {
      it('should return NewPlat for default Plat initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPlatFormGroup(sampleWithNewData);

        const plat = service.getPlat(formGroup) as any;

        expect(plat).toMatchObject(sampleWithNewData);
      });

      it('should return NewPlat for empty Plat initial value', () => {
        const formGroup = service.createPlatFormGroup();

        const plat = service.getPlat(formGroup) as any;

        expect(plat).toMatchObject({});
      });

      it('should return IPlat', () => {
        const formGroup = service.createPlatFormGroup(sampleWithRequiredData);

        const plat = service.getPlat(formGroup) as any;

        expect(plat).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPlat should not enable id FormControl', () => {
        const formGroup = service.createPlatFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPlat should disable id FormControl', () => {
        const formGroup = service.createPlatFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
