import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PlatFormService, PlatFormGroup } from './plat-form.service';
import { IPlat } from '../plat.model';
import { PlatService } from '../service/plat.service';
import { ITypePlat } from 'app/entities/type-plat/type-plat.model';
import { TypePlatService } from 'app/entities/type-plat/service/type-plat.service';

@Component({
  selector: 'jhi-plat-update',
  templateUrl: './plat-update.component.html',
})
export class PlatUpdateComponent implements OnInit {
  isSaving = false;
  plat: IPlat | null = null;

  typePlatsSharedCollection: ITypePlat[] = [];

  editForm: PlatFormGroup = this.platFormService.createPlatFormGroup();

  constructor(
    protected platService: PlatService,
    protected platFormService: PlatFormService,
    protected typePlatService: TypePlatService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTypePlat = (o1: ITypePlat | null, o2: ITypePlat | null): boolean => this.typePlatService.compareTypePlat(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plat }) => {
      this.plat = plat;
      if (plat) {
        this.updateForm(plat);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const plat = this.platFormService.getPlat(this.editForm);
    if (plat.id !== null) {
      this.subscribeToSaveResponse(this.platService.update(plat));
    } else {
      this.subscribeToSaveResponse(this.platService.create(plat));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlat>>): void {
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

  protected updateForm(plat: IPlat): void {
    this.plat = plat;
    this.platFormService.resetForm(this.editForm, plat);

    this.typePlatsSharedCollection = this.typePlatService.addTypePlatToCollectionIfMissing<ITypePlat>(
      this.typePlatsSharedCollection,
      plat.typePlat
    );
  }

  protected loadRelationshipsOptions(): void {
    this.typePlatService
      .query()
      .pipe(map((res: HttpResponse<ITypePlat[]>) => res.body ?? []))
      .pipe(
        map((typePlats: ITypePlat[]) => this.typePlatService.addTypePlatToCollectionIfMissing<ITypePlat>(typePlats, this.plat?.typePlat))
      )
      .subscribe((typePlats: ITypePlat[]) => (this.typePlatsSharedCollection = typePlats));
  }
}
