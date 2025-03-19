import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBeforeLoginComponent } from './layout-before-login.component';

describe('LayoutBeforeLoginComponent', () => {
  let component: LayoutBeforeLoginComponent;
  let fixture: ComponentFixture<LayoutBeforeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBeforeLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutBeforeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
