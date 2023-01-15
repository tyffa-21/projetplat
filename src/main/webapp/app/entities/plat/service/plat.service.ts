import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPlat, NewPlat } from '../plat.model';

export type PartialUpdatePlat = Partial<IPlat> & Pick<IPlat, 'id'>;

export type EntityResponseType = HttpResponse<IPlat>;
export type EntityArrayResponseType = HttpResponse<IPlat[]>;

@Injectable({ providedIn: 'root' })
export class PlatService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/plats');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(plat: NewPlat): Observable<EntityResponseType> {
    return this.http.post<IPlat>(this.resourceUrl, plat, { observe: 'response' });
  }

  update(plat: IPlat): Observable<EntityResponseType> {
    return this.http.put<IPlat>(`${this.resourceUrl}/${this.getPlatIdentifier(plat)}`, plat, { observe: 'response' });
  }

  partialUpdate(plat: PartialUpdatePlat): Observable<EntityResponseType> {
    return this.http.patch<IPlat>(`${this.resourceUrl}/${this.getPlatIdentifier(plat)}`, plat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPlatIdentifier(plat: Pick<IPlat, 'id'>): number {
    return plat.id;
  }

  comparePlat(o1: Pick<IPlat, 'id'> | null, o2: Pick<IPlat, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlatIdentifier(o1) === this.getPlatIdentifier(o2) : o1 === o2;
  }

  addPlatToCollectionIfMissing<Type extends Pick<IPlat, 'id'>>(
    platCollection: Type[],
    ...platsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const plats: Type[] = platsToCheck.filter(isPresent);
    if (plats.length > 0) {
      const platCollectionIdentifiers = platCollection.map(platItem => this.getPlatIdentifier(platItem)!);
      const platsToAdd = plats.filter(platItem => {
        const platIdentifier = this.getPlatIdentifier(platItem);
        if (platCollectionIdentifiers.includes(platIdentifier)) {
          return false;
        }
        platCollectionIdentifiers.push(platIdentifier);
        return true;
      });
      return [...platsToAdd, ...platCollection];
    }
    return platCollection;
  }
}
