import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TypePlatFormService, TypePlatFormGroup } from './type-plat-form.service';
import { ITypePlat } from '../type-plat.model';
import { TypePlatService } from '../service/type-plat.service';

@Component({
  selector: 'jhi-type-plat-update',
  templateUrl: './type-plat-update.component.html',
})
export class TypePlatUpdateComponent implements OnInit {
  isSaving = false;
  typePlat: ITypePlat | null = null;

  editForm: TypePlatFormGroup = this.typePlatFormService.createTypePlatFormGroup();

  constructor(
    protected typePlatService: TypePlatService,
    protected typePlatFormService: TypePlatFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typePlat }) => {
      this.typePlat = typePlat;
      if (typePlat) {
        this.updateForm(typePlat);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typePlat = this.typePlatFormService.getTypePlat(this.editForm);
    if (typePlat.id !== null) {
      this.subscribeToSaveResponse(this.typePlatService.update(typePlat));
    } else {
      this.subscribeToSaveResponse(this.typePlatService.create(typePlat));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypePlat>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(typePlat: ITypePlat): void {
    this.typePlat = typePlat;
    this.typePlatFormService.resetForm(this.editForm, typePlat);
  }
}
