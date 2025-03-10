import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaudiArabiaPlateComponent } from './saudi-arabia-plate.component';

describe('SaudiArabiaPlateComponent', () => {
  let component: SaudiArabiaPlateComponent;
  let fixture: ComponentFixture<SaudiArabiaPlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaudiArabiaPlateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaudiArabiaPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
