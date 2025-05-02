import { Component, EventEmitter, Output } from '@angular/core';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";

@Component({
  selector: 'app-add-user-form',
  imports: [GenericFormComponent],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.scss'
})
export class AddUserFormComponent {

  @Output() closeForm = new EventEmitter<void>(); 


  closeMenu() {
    this.closeForm.emit(); 
  }

}
