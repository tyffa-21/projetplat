import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITypePlat, NewTypePlat } from '../type-plat.model';

export type PartialUpdateTypePlat = Partial<ITypePlat> & Pick<ITypePlat, 'id'>;

export type EntityResponseType = HttpResponse<ITypePlat>;
export type EntityArrayResponseType = HttpResponse<ITypePlat[]>;

@Injectable({ providedIn: 'root' })
export class TypePlatService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/type-plats');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(typePlat: NewTypePlat): Observable<EntityResponseType> {
    return this.http.post<ITypePlat>(this.resourceUrl, typePlat, { observe: 'response' });
  }

  update(typePlat: ITypePlat): Observable<EntityResponseType> {
    return this.http.put<ITypePlat>(`${this.resourceUrl}/${this.getTypePlatIdentifier(typePlat)}`, typePlat, { observe: 'response' });
  }

  partialUpdate(typePlat: PartialUpdateTypePlat): Observable<EntityResponseType> {
    return this.http.patch<ITypePlat>(`${this.resourceUrl}/${this.getTypePlatIdentifier(typePlat)}`, typePlat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypePlat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypePlat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTypePlatIdentifier(typePlat: Pick<ITypePlat, 'id'>): number {
    return typePlat.id;
  }

  compareTypePlat(o1: Pick<ITypePlat, 'id'> | null, o2: Pick<ITypePlat, 'id'> | null): boolean {
    return o1 && o2 ? this.getTypePlatIdentifier(o1) === this.getTypePlatIdentifier(o2) : o1 === o2;
  }

  addTypePlatToCollectionIfMissing<Type extends Pick<ITypePlat, 'id'>>(
    typePlatCollection: Type[],
    ...typePlatsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const typePlats: Type[] = typePlatsToCheck.filter(isPresent);
    if (typePlats.length > 0) {
      const typePlatCollectionIdentifiers = typePlatCollection.map(typePlatItem => this.getTypePlatIdentifier(typePlatItem)!);
      const typePlatsToAdd = typePlats.filter(typePlatItem => {
        const typePlatIdentifier = this.getTypePlatIdentifier(typePlatItem);
        if (typePlatCollectionIdentifiers.includes(typePlatIdentifier)) {
          return false;
        }
        typePlatCollectionIdentifiers.push(typePlatIdentifier);
        return true;
      });
      return [...typePlatsToAdd, ...typePlatCollection];
    }
    return typePlatCollection;
  }
}
