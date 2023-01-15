import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITypePlat, NewTypePlat } from '../type-plat.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITypePlat for edit and NewTypePlatFormGroupInput for create.
 */
type TypePlatFormGroupInput = ITypePlat | PartialWithRequiredKeyOf<NewTypePlat>;

type TypePlatFormDefaults = Pick<NewTypePlat, 'id'>;

type TypePlatFormGroupContent = {
  id: FormControl<ITypePlat['id'] | NewTypePlat['id']>;
  libelle: FormControl<ITypePlat['libelle']>;
};

export type TypePlatFormGroup = FormGroup<TypePlatFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TypePlatFormService {
  createTypePlatFormGroup(typePlat: TypePlatFormGroupInput = { id: null }): TypePlatFormGroup {
    const typePlatRawValue = {
      ...this.getFormDefaults(),
      ...typePlat,
    };
    return new FormGroup<TypePlatFormGroupContent>({
      id: new FormControl(
        { value: typePlatRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      libelle: new FormControl(typePlatRawValue.libelle),
    });
  }

  getTypePlat(form: TypePlatFormGroup): ITypePlat | NewTypePlat {
    return form.getRawValue() as ITypePlat | NewTypePlat;
  }

  resetForm(form: TypePlatFormGroup, typePlat: TypePlatFormGroupInput): void {
    const typePlatRawValue = { ...this.getFormDefaults(), ...typePlat };
    form.reset(
      {
        ...typePlatRawValue,
        id: { value: typePlatRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TypePlatFormDefaults {
    return {
      id: null,
    };
  }
}
