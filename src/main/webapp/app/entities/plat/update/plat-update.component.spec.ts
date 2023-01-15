import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PlatFormService } from './plat-form.service';
import { PlatService } from '../service/plat.service';
import { IPlat } from '../plat.model';
import { ITypePlat } from 'app/entities/type-plat/type-plat.model';
import { TypePlatService } from 'app/entities/type-plat/service/type-plat.service';

import { PlatUpdateComponent } from './plat-update.component';

describe('Plat Management Update Component', () => {
  let comp: PlatUpdateComponent;
  let fixture: ComponentFixture<PlatUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let platFormService: PlatFormService;
  let platService: PlatService;
  let typePlatService: TypePlatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PlatUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PlatUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlatUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    platFormService = TestBed.inject(PlatFormService);
    platService = TestBed.inject(PlatService);
    typePlatService = TestBed.inject(TypePlatService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TypePlat query and add missing value', () => {
      const plat: IPlat = { id: 456 };
      const typePlat: ITypePlat = { id: 57950 };
      plat.typePlat = typePlat;

      const typePlatCollection: ITypePlat[] = [{ id: 98224 }];
      jest.spyOn(typePlatService, 'query').mockReturnValue(of(new HttpResponse({ body: typePlatCollection })));
      const additionalTypePlats = [typePlat];
      const expectedCollection: ITypePlat[] = [...additionalTypePlats, ...typePlatCollection];
      jest.spyOn(typePlatService, 'addTypePlatToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ plat });
      comp.ngOnInit();

      expect(typePlatService.query).toHaveBeenCalled();
      expect(typePlatService.addTypePlatToCollectionIfMissing).toHaveBeenCalledWith(
        typePlatCollection,
        ...additionalTypePlats.map(expect.objectContaining)
      );
      expect(comp.typePlatsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const plat: IPlat = { id: 456 };
      const typePlat: ITypePlat = { id: 59712 };
      plat.typePlat = typePlat;

      activatedRoute.data = of({ plat });
      comp.ngOnInit();

      expect(comp.typePlatsSharedCollection).toContain(typePlat);
      expect(comp.plat).toEqual(plat);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlat>>();
      const plat = { id: 123 };
      jest.spyOn(platFormService, 'getPlat').mockReturnValue(plat);
      jest.spyOn(platService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: plat }));
      saveSubject.complete();

      // THEN
      expect(platFormService.getPlat).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(platService.update).toHaveBeenCalledWith(expect.objectContaining(plat));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlat>>();
      const plat = { id: 123 };
      jest.spyOn(platFormService, 'getPlat').mockReturnValue({ id: null });
      jest.spyOn(platService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plat: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: plat }));
      saveSubject.complete();

      // THEN
      expect(platFormService.getPlat).toHaveBeenCalled();
      expect(platService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlat>>();
      const plat = { id: 123 };
      jest.spyOn(platService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(platService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTypePlat', () => {
      it('Should forward to typePlatService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(typePlatService, 'compareTypePlat');
        comp.compareTypePlat(entity, entity2);
        expect(typePlatService.compareTypePlat).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
