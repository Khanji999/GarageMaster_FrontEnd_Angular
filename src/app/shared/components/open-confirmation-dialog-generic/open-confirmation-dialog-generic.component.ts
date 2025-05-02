import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-open-confirmation-dialog-generic',
  imports: [],
  templateUrl: './open-confirmation-dialog-generic.component.html',
  styleUrl: './open-confirmation-dialog-generic.component.scss'
})
export class OpenConfirmationDialogGenericComponent {
  @Input() title: string = 'Are you sure?';
  @Output() submit = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onSubmit() {
    this.submit.emit();
  }

  onClose() {
    this.close.emit();
  }
}
