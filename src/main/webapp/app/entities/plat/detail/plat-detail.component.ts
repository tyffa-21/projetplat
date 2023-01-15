import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlat } from '../plat.model';

@Component({
  selector: 'jhi-plat-detail',
  templateUrl: './plat-detail.component.html',
})
export class PlatDetailComponent implements OnInit {
  plat: IPlat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plat }) => {
      this.plat = plat;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
