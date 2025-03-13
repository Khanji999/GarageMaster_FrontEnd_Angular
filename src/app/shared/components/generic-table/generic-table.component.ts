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
  @Input() columns: TableColumn[] = []; // Input for column definitions
  @Input() data: any[] = []; // Input for table data
  @Output() rowSelected = new EventEmitter<any>(); // Output event to send selected row

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((value, key) => (value && value[key] !== undefined) ? value[key] : null, obj);
  }
  selectedRow: any = null;

  selectRow(row: any) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
    this.rowSelected.emit(this.selectedRow);
  }
}
