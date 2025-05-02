import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondSelectACarComponent } from './second-select-acar.component';

describe('SecondSelectACarComponent', () => {
  let component: SecondSelectACarComponent;
  let fixture: ComponentFixture<SecondSelectACarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondSelectACarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondSelectACarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
