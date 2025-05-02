import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { OpenConfirmationDialogGenericComponent } from '../open-confirmation-dialog-generic/open-confirmation-dialog-generic.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-form',
  imports: [OpenConfirmationDialogGenericComponent, CommonModule],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.scss'
})
export class GenericFormComponent {

  @Input() title :any = null;
  @Output() closeModal = new EventEmitter<void>();
  @Input() showBackButton : boolean | undefined ;
  @Output() clickBackButton = new EventEmitter<void>();
  showConfirm = false;
  lastAction: 'close' | 'back' | null = null;


  close() {
    this.lastAction = 'close';
    this.showConfirm = true;
  }
  
  back() {
    this.lastAction = 'back';
    this.showConfirm = true;
  }
  
  onCancel() {
    this.lastAction = null;
    this.showConfirm = false;
  }
  
  onConfirm() {
    if (this.lastAction === 'close') {
      this.closeModal.emit(); 
    } 
    else if (this.lastAction === 'back') {
      this.clickBackButton.emit();
    }
  
    this.lastAction = null;
    this.showConfirm = false;
  }
}