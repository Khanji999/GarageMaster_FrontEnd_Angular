import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingMainteanceP2Component } from './adding-mainteance-p2.component';

describe('AddingMainteanceP2Component', () => {
  let component: AddingMainteanceP2Component;
  let fixture: ComponentFixture<AddingMainteanceP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingMainteanceP2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingMainteanceP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
