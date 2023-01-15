import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITypePlat } from '../type-plat.model';
import { TypePlatService } from '../service/type-plat.service';

@Injectable({ providedIn: 'root' })
export class TypePlatRoutingResolveService implements Resolve<ITypePlat | null> {
  constructor(protected service: TypePlatService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypePlat | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((typePlat: HttpResponse<ITypePlat>) => {
          if (typePlat.body) {
            return of(typePlat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
