import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourZeroThreeComponent } from './four-zero-three.component';

describe('FourZeroThreeComponent', () => {
  let component: FourZeroThreeComponent;
  let fixture: ComponentFixture<FourZeroThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourZeroThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourZeroThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
