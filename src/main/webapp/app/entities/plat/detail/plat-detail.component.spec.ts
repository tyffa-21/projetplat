import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlatDetailComponent } from './plat-detail.component';

describe('Plat Management Detail Component', () => {
  let comp: PlatDetailComponent;
  let fixture: ComponentFixture<PlatDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ plat: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PlatDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PlatDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load plat on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.plat).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
