import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBeforeLoginComponent } from './navbar-before-login.component';

describe('NavbarBeforeLoginComponent', () => {
  let component: NavbarBeforeLoginComponent;
  let fixture: ComponentFixture<NavbarBeforeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarBeforeLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarBeforeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
