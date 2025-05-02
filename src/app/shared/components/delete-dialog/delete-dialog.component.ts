import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  imports: [],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
    @Output() submit = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();
  
    onSubmit() {
      this.submit.emit();
    }
  
    onClose() {
      this.close.emit();
    }
}
