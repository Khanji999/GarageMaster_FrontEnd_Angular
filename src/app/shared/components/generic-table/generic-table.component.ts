import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
}
