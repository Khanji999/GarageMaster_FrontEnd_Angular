import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAfterLoginComponent } from './layout-after-login.component';

describe('LayoutAfterLoginComponent', () => {
  let component: LayoutAfterLoginComponent;
  let fixture: ComponentFixture<LayoutAfterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAfterLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAfterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
