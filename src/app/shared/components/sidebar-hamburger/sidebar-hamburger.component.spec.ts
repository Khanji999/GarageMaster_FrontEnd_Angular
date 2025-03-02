import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHamburgerComponent } from './sidebar-hamburger.component';

describe('SidebarHamburgerComponent', () => {
  let component: SidebarHamburgerComponent;
  let fixture: ComponentFixture<SidebarHamburgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarHamburgerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarHamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
