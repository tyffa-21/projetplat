import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypePlat } from '../type-plat.model';

@Component({
  selector: 'jhi-type-plat-detail',
  templateUrl: './type-plat-detail.component.html',
})
export class TypePlatDetailComponent implements OnInit {
  typePlat: ITypePlat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typePlat }) => {
      this.typePlat = typePlat;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
