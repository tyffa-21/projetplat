import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TypePlatDetailComponent } from './type-plat-detail.component';

describe('TypePlat Management Detail Component', () => {
  let comp: TypePlatDetailComponent;
  let fixture: ComponentFixture<TypePlatDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypePlatDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ typePlat: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TypePlatDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TypePlatDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load typePlat on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.typePlat).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
