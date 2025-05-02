import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthAddServicesComponent } from './fifth-add-services.component';

describe('FifthAddServicesComponent', () => {
  let component: FifthAddServicesComponent;
  let fixture: ComponentFixture<FifthAddServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FifthAddServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifthAddServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
