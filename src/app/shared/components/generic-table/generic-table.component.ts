import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../../../core/models/table-column.model';

@Component({
  selector: 'app-generic-table',
  imports: [CommonModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent {
  @Input() columns: TableColumn[] = []; 
  @Input() data: any[] = []; 
  @Input() showActions: boolean = false; 
  @Input() canUpdate: boolean = false;
  @Input() canDelete: boolean = false;

  @Output() updateClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() rowSelected = new EventEmitter<any>(); 

  selectedRow: any = null;

  update(row: any) {
    this.updateClicked.emit(row);
  }

  delete(row: any) {
    this.deleteClicked.emit(row);
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((value, key) => (value && value[key] !== undefined) ? value[key] : null, obj);
  }

  selectRow(row: any) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
    this.rowSelected.emit(this.selectedRow);
  }
}
