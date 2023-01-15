import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TypePlatService } from '../service/type-plat.service';

import { TypePlatComponent } from './type-plat.component';

describe('TypePlat Management Component', () => {
  let comp: TypePlatComponent;
  let fixture: ComponentFixture<TypePlatComponent>;
  let service: TypePlatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'type-plat', component: TypePlatComponent }]), HttpClientTestingModule],
      declarations: [TypePlatComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(TypePlatComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypePlatComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TypePlatService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.typePlats?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to typePlatService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTypePlatIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTypePlatIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
