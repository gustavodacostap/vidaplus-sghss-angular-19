import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface TableActions<T> {
  view?: (row: T) => void;
  edit?: (row: T) => void;
  delete?: (row: T) => void;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent<T> implements AfterViewInit {
  @Input({ required: true }) dataSource!: MatTableDataSource<T>;
  @Input({ required: true }) displayedColumns!: string[];
  @Input() columnLabels: Record<string, string> = {};

  /** formatador opcional por coluna */
  @Input() formatters?: Partial<Record<string, (value: any, row: T) => string>>;

  /** inclui coluna actions automaticamente */
  @Input() actions?: TableActions<T>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get showActions(): boolean {
    return !!(this.actions?.view || this.actions?.edit || this.actions?.delete);
  }

  get allColumns(): string[] {
    return this.showActions
      ? [...this.displayedColumns, 'actions']
      : this.displayedColumns;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  formatCell(column: string, row: T): string {
    const value = (row as any)[column];
    const formatter = this.formatters?.[column];
    return formatter ? formatter(value, row) : String(value ?? '');
  }
}
