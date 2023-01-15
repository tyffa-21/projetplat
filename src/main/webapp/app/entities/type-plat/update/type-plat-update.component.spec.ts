import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TypePlatFormService } from './type-plat-form.service';
import { TypePlatService } from '../service/type-plat.service';
import { ITypePlat } from '../type-plat.model';

import { TypePlatUpdateComponent } from './type-plat-update.component';

describe('TypePlat Management Update Component', () => {
  let comp: TypePlatUpdateComponent;
  let fixture: ComponentFixture<TypePlatUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let typePlatFormService: TypePlatFormService;
  let typePlatService: TypePlatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TypePlatUpdateComponent],
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
      .overrideTemplate(TypePlatUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypePlatUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    typePlatFormService = TestBed.inject(TypePlatFormService);
    typePlatService = TestBed.inject(TypePlatService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const typePlat: ITypePlat = { id: 456 };

      activatedRoute.data = of({ typePlat });
      comp.ngOnInit();

      expect(comp.typePlat).toEqual(typePlat);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypePlat>>();
      const typePlat = { id: 123 };
      jest.spyOn(typePlatFormService, 'getTypePlat').mockReturnValue(typePlat);
      jest.spyOn(typePlatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typePlat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typePlat }));
      saveSubject.complete();

      // THEN
      expect(typePlatFormService.getTypePlat).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(typePlatService.update).toHaveBeenCalledWith(expect.objectContaining(typePlat));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypePlat>>();
      const typePlat = { id: 123 };
      jest.spyOn(typePlatFormService, 'getTypePlat').mockReturnValue({ id: null });
      jest.spyOn(typePlatService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typePlat: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typePlat }));
      saveSubject.complete();

      // THEN
      expect(typePlatFormService.getTypePlat).toHaveBeenCalled();
      expect(typePlatService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypePlat>>();
      const typePlat = { id: 123 };
      jest.spyOn(typePlatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typePlat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(typePlatService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
