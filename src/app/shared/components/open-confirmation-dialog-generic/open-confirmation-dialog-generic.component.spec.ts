import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenConfirmationDialogGenericComponent } from './open-confirmation-dialog-generic.component';

describe('OpenConfirmationDialogGenericComponent', () => {
  let component: OpenConfirmationDialogGenericComponent;
  let fixture: ComponentFixture<OpenConfirmationDialogGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenConfirmationDialogGenericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenConfirmationDialogGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
