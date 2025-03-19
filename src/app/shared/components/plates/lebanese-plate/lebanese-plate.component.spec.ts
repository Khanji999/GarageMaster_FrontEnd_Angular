import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LebanesePlateComponent } from './lebanese-plate.component';

describe('LebanesePlateComponent', () => {
  let component: LebanesePlateComponent;
  let fixture: ComponentFixture<LebanesePlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LebanesePlateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LebanesePlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
