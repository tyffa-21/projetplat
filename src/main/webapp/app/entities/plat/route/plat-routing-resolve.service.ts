import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPlat } from '../plat.model';
import { PlatService } from '../service/plat.service';

@Injectable({ providedIn: 'root' })
export class PlatRoutingResolveService implements Resolve<IPlat | null> {
  constructor(protected service: PlatService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlat | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((plat: HttpResponse<IPlat>) => {
          if (plat.body) {
            return of(plat.body);
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
